import React, { useEffect, useState } from 'react';
import './App.css';
import { InitiateRequest, MessageRequest, Status, StreamMessage, StreamRequset, User, UserStreamResponse }from './proto/index_pb'
import { ChatServiceClient} from './proto/IndexServiceClientPb'
import Greeting from './components/Greeting';
import Chat from './components/Chat';

const client = new ChatServiceClient ("http://localhost:8080")


function App() {

  const [msgs, setMsgs] = useState<Array<StreamMessage.AsObject>>([])

  const [users, setUsers] = useState<Array<User.AsObject>>([])
  const [user, setUser] = useState<User.AsObject>()
  useEffect(() => {
    if(!user) return 
    const req = new StreamRequset()
    req.setId(user.id)
    //initiate 2 streaming connections, throught 2 EEFI calls
    //for chat stream
    ;(() => {
      const stream = client.chatStream(req, {})
      stream.on("data", (chunk) => {
        const msg = (chunk as StreamMessage).toObject()
        console.log(msg)
        setMsgs(prev => [...prev, msg])
      })
    })();
    //for client stream
    ;(() => {
      const stream = client.userStream(req, {})
      stream.on("data", (chunk) => {
        const users = (chunk as UserStreamResponse).toObject().userList
        setUsers(users)
      })
    })();
  },[user])


  const handleUserSunnit = (name: string, avatar: string) => {
    console.log(name, avatar)
      if(!name|| !avatar) return 
      const req = new InitiateRequest ()
      req.setName(name)
      req.setAvataUrl(avatar)
       client.chatInitiate(req,{}, (err, resp) => {
        if(err) return console.log(err)
        console.log(err)
        const responseObj = resp.toObject()
        setUser({id: responseObj.id, name: name, avatarUrt: avatar, status: Status.ONLINE})
    
      })
  }

  const handleMessageSubbmit = (msg: string, onSuccess: () => void) => {
    if(!user || !msg.trim()) return 
    const msgReq = new MessageRequest()
    msgReq.setId(user.id) 
    msgReq.setMessage(msg)
    console.log("here we go");
    client.sendMessage(msgReq, {}, (err, resp) => {
      if(err) console.error(err)
      onSuccess()
    })
  }


  return (
    <div className="App">
        {!user ? <Greeting onUsernameEnter ={handleUserSunnit} /> : <Chat user={user} userList={users} messages={msgs} onMessageSubmit={handleMessageSubbmit} />}
    </div>
  );
}

export default App;
