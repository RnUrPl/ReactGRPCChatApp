import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from './proto/index'
import { ChatServiceHandlers } from './proto/indexPackage/ChatService'
import { listUsers, addUser, updateUser, getUser, addMessageToRoom, listMessagesInRoom } from './data'
import { User } from './proto/indexPackage/User'
import { Status } from './proto/indexPackage/Status'
import { StreamMessage } from './proto/indexPackage/StreamMessage'
import { StreamRequset, StreamRequset__Output } from './proto/indexPackage/StreamRequset'
import { UserStreamResponse } from './proto/indexPackage/UserStreamResponse'
import { emitMainRoomChatUpdate, listenMainCahtRoomUpdate, listenUserUpdate } from './pubsub'


const PORT = 8082
const PROTO_FILE = './proto/index.proto'

const packageDefinition = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE))
const gRPCObj = (grpc.loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType
const indexPackage = gRPCObj.indexPackage

function main() {
    const server = getServer()

    server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            if (err) {
                console.error(err)
                return
            }
            console.log(`Your server as started on port ${PORT}`)
            server.start()
            setupPubSub()
        }
    )
}
const callObjByUserName = new Map<number, grpc.ServerWritableStream<StreamRequset__Output, StreamMessage>>()

const userStreamById = new Map<number, grpc.ServerWritableStream<StreamRequset__Output, UserStreamResponse>>()






function getServer() {
    const server = new grpc.Server()
    server.addService(indexPackage.ChatService.service, {
        ChatInitiate: (call, callback) => {
            const sessionName = call.request.name || ''
            const sessionAvatar = call.request.avataUrl || ''
            if (!sessionName || !sessionAvatar) return callback(new Error("Name and avatar requiered!"))

            listUsers((err, users) => {
                if (err) return callback(err)
                const dbUser = users.find(u => u.name?.toLocaleLowerCase() === sessionName)
                if (dbUser === undefined) {
                    const user: User = {
                        id: Math.floor(Math.random() * 10000),
                        status: Status.ONLINE,
                        name: sessionName,
                        avatarUrt: sessionAvatar

                    }
                    addUser(user, (err) => {
                        if (err) return callback(err)
                        return callback(null, { id: user.id })
                    })
                    return
                } else {
                    if (dbUser.status === Status.ONLINE) {
                        return callback(new Error('YSer Oonline'))
                    }

                    dbUser.status = Status.ONLINE
                    updateUser(dbUser, (err) => {
                        if (err) return callback(err)

                        return callback(null, { id: dbUser?.id })
                    })
                }


            })

        },
        SendMessage: (call, callback) => {
            const { id = -1, message = '' } = call.request
            if (!id || !message) return callback(new Error('I dont know you'))

            getUser(id, (err, user) => {
                if (err) return callback(err)
                const msg: StreamMessage = {
                    userId: user.id,
                    message: message,
                    userAvatar: user.avatarUrt
                }

                addMessageToRoom(msg, (err) => {
                    if (err) return callback(err)
                    emitMainRoomChatUpdate(msg)
                    callback(null)
                })
            })
        },
        ChatStream: (call) => {
            const { id = -1 } = call.request
            if (!id) return call.end()
            getUser(id, (err, user) => {
                if (err) return call.end()
                listMessagesInRoom((err, msgs) => {
                    if (err) call.end()
                    for (const msg of msgs) {
                        call.write(msg)
                    }

                    callObjByUserName.set(id, call)

                })
                call.on("cancelled", () => {
                    user.status = Status.OFFLINE
                    updateUser(user, (err) => {
                        if (err) console.error(err)
                        callObjByUserName.delete(id)
                    })

                })
            })


        },
        UserStream: (call) => {
            const { id = -1 } = call.request
            if (!id) return call.end()
            getUser(id, (err, user) => {
                if (err) return call.end()
                listUsers((err, users) => {
                    if (err) call.end()
                    call.write({ user: users })
                    userStreamById.set(id, call)
                })


                call.on("cancelled", () => callObjByUserName.delete(id))
            })
        }
    } as ChatServiceHandlers)

    return server
}

const setupPubSub = () => {
    listenUserUpdate(() => {
        listUsers((err, users) => {
            if (err) return console.log(err)
            for (const [userId, userCall] of userStreamById) {
                userCall.write({ user: users })
            }
        })
    })
    listenMainCahtRoomUpdate((msg, channel) => {
        console.log(channel)
        for (const [userId, userCall] of callObjByUserName) {

        }
    })
}

main()
