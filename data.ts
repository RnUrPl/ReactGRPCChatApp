import redis from "redis"
import { User } from './proto/indexPackage/User'

const client = redis.createClient()

client.on('error', console.error)
client.on('connect', console.error)


const REDIS_KEYS = {
    broadcastRoom : 'room:0:messages',
    users : "users"
}



type errCB = (err: Error | null) => void;
type ErrCB<T> = (err: Error | null, data: T) => void ;

export const addUser = (user: User, fn: errCB) => {
    client.rpush(REDIS_KEYS.users, JSON.stringify(user),fn)
};

export const listUsers = (fn: ErrCB<User[]>) => {
    client.lrange(REDIS_KEYS.users, 0, -1, (err,rows) => { 
        if(err) return fn(err, [])
        const users : Array<User> = []
        for (const row of rows){
            const user = JSON.parse(row) as User
            users.push(user)
        }
        fn(err, users)
    })
}

export const updateUser = (user: User, fn: errCB) => {
    listUsers((err, users) => {
        if(err) return fn(err)
        const i = users.findIndex(u => u.id === user.id)
        if(i == -1) return new Error("User was not found")
        client.lset(REDIS_KEYS.users, i, JSON.stringify(user), fn)
    })
}

export const findUser = (username: string) => {
    
}