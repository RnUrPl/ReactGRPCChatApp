import React, { useState } from "react";
import {
  Divider,
  Grid,
  Paper,
  Typography,
  Avatar,
  TextField,
  Chip,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SendIcon from '@mui/icons-material/Send';
import UserList from "./UserList";
import ChatBubble from "./ChatBubble";
import { Status, StreamMessage, User } from "../proto/index_pb";

const style: { [key: string]: React.CSSProperties } = {
  container: {
    height: "80vh",
    padding: "2rem",
    width: "85vw",
  },
  paper: {
    padding: "30px",
    height:"600px",
    // height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    backgroundColor: "lightslategrey",
  },
  avatar: {
    margin: "20px",
  },
};

interface Props {
  user: User.AsObject;
  userList: Array<User.AsObject>;
  messages: Array<StreamMessage.AsObject>;
  onMessageSubmit: (msg: string, onSuccess: () => void) => void;
}

const Chat: React.FC<Props> = (props) => {
  const [msg, setMsg] = useState("");
  const { userList, messages, onMessageSubmit, user } = props;

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("called");
    e.preventDefault();
    if (!msg) return;
    console.log("here ", msg);
    onMessageSubmit(msg, () => setMsg(""));
  };

  return (
    <form onSubmit={handleSendMessage}>
      <Grid container style={style.container} spacing={3}>
        <Grid item xs={3}>
          <Paper style={style.paper}>
          <div style={{ height: "540px", overflowY: "auto" }}>
            <UserList
              users={userList.map((x) => ({
                id: x.id,
                isOnline: x.status === Status.ONLINE,
                avatar: x.avatarUrt,
                name: x.name
              }))}
            />
          </div>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper style={style.paper}>
            <div
              style={{
                // height: "100%",
                width: "100%",
                backgroundColor: "aliceblue",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* {name banner} */}
              <div
                style={{
                  // height: "10%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar style={style.avatar} />
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography variant="button">{user.name}</Typography>
                  <Chip
                    color="primary"
                    size="small"
                    style={{ width: "70px" }}
                    label="online"
                  />
                </Grid>
              </div>
              <Divider />
              <div style={{ height: "400px", overflowY: "auto" }}>
                {messages.map((msg, i) => (
                  <ChatBubble
                    key={i}
                    message={msg}
                    isCurrentUser={msg.userId === user.id}
                  />
                ))}
              </div>
              <Divider />
              <div
                style={{ width: "100%", alignItems: "center", padding: "10px" }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Start Typing..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                      
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
};

export default Chat;