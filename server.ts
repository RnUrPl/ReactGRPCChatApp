import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import {ProtoGrpcType} from './proto/index'
import { ChatServiceHandlers } from './proto/indexPackage/ChatService'
import {listUsers, addUser, updateUser} from './data'
import { User } from './proto/indexPackage/User'
import { Status } from './proto/indexPackage/Status'

const PORT = 8082
const PROTO_FILE = './proto/index.proto'

const packageDefinition = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE))
const gRPCObj = (grpc.loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType
const indexPackage  = gRPCObj.indexPackage

function main(){
    const server = getServer()

    server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(),
    (err,port) => {
        if(err){
            console.error(err)
            return
        }
        console.log(`Your server as started on port ${PORT}`)
        server.start()
    }
    )
}
// const callObjByUserName = new Map<string, grpc.ServerDuplexStream<ChatRequest, ChatResponse>>()


function getServer(){
    const server = new grpc.Server()
    server.addService(indexPackage.ChatService.service, {
        ChatInitiate: (call, callback) => {
            const sessionName = call.request.name || ''
            const sessionAvatar = call.request.avataUrl || ''
            if(!sessionName || !sessionAvatar) return callback(new Error("Name and avatar requiered!"))

            listUsers((err,users) => {
                if(err) return callback(err)
                const dbUser = users.find(u => u.name?.toLocaleLowerCase() === sessionName)
                if(dbUser === undefined){
                    const user :User = {
                        id: Math.floor(Math.random() * 10000),
                        status: Status.ONLINE,
                        name: sessionName,
                        avatarUrt: sessionAvatar

                    }
                    addUser(user, (err) => {
                        if(err) return callback(err)
                        return callback(null, {id: user.id})
                    })
                    return
                }else{
                    if(dbUser.status === Status.ONLINE){
                        return callback(new Error('YSer Oonline'))
                    }
    
                    dbUser.status = Status.ONLINE
                    updateUser(dbUser, (err) => {
                        if(err) return callback(err)
    
                        return callback(null, {id: dbUser?.id})
                    })
                }

                
            })
            
            //reach into datavbase
            //chack if the user with name already exist and is online 
            //uf so then return error
            //if no then het them online and send the user numer back

            callback(null,{id: Math.floor(Math.random() * 10000)})
        }
    }  as ChatServiceHandlers)

    return server
}

main()
