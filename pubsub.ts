import { nrp } from './data'
import { StreamMessage } from './proto/indexPackage/StreamMessage'
import { User } from './proto/indexPackage/User'

const REDIS_CHANNELS = {
    mainRoom: "MAIN_ROOM", 
    userChange: "USER_CHANGE"
}


export type listenFnCb<T> = (data: T, message: string) => void

export const emitMainRoomChatUpdate = (msg: StreamMessage) => {
    nrp.emit(REDIS_CHANNELS.mainRoom, JSON.stringify(msg))
}
export const listenMainCahtRoomUpdate = (fn: listenFnCb<StreamMessage>) => {
    nrp.on(REDIS_CHANNELS.mainRoom, (data, channel) => {
        const msg = JSON.parse(data) as StreamMessage
        fn(msg, channel)
    })
}

export const emmitUserUpdate = (user: User) => {
    nrp.emit(REDIS_CHANNELS.userChange, JSON.stringify(user))
}
export const listenUserUpdate = (fn: listenFnCb<User>) => {
    nrp.on(REDIS_CHANNELS.userChange, (data, channel) => {
        const msg = JSON.parse(data) as User
        fn(msg, channel)
    })
}