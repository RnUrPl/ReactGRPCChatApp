import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { InitiateRequest } from './proto/index_pb'
import { ChatServiceClient} from './proto/IndexServiceClientPb'
import { error } from 'console';

function App() {

  useEffect(() => {
    // (async () => {
    //   const client = new ChatServiceClient ("http://localhost:8080")
    //   const req = new InitiateRequest ()
    //   req.setName("plrn4pf")
    //   req.setAvataUrl("dada")
    //    client.chatInitiate(req,{}, (err, resp) => {
    //     console.log(err)
    //     console.log(resp.toObject())
    //   })
    // })()
  },[])


  return (
    <div className="App">
      <div className="App-container">
        hello
      </div>
    </div>
  );
}

export default App;
