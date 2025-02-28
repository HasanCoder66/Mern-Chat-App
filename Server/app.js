import express from "express";
import { connectDb } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuid } from "uuid";
// import {
//   createSingleChats,
//   createGroupChats,
//   createMessages,
//   createMessagesInAChat,
// } from "./seeders/chat.js";
// import { createUser } from "./seeders/user.js";

import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/event.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";

dotenv.config(); // { path: "./.env" }

const app = express();
const server = createServer(app);
const io = new Server(server, {});

// ENV KEYS!
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 6000;
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "3866coder.m.hasan";
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const userSocketIDs = new Map();

connectDb(mongoURI);
// createUser(20)
// createSingleChats(10)
// createGroupChats(10)
// createMessages(30)
// createMessagesInAChat("67becc97aa9d692873d3a3e5",50)

// Middlewares ===>
app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded());
app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  console.log("Hello World");
});

io.use((socket, next) => {});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const user = {
    _id: "asdfasdfasd",
    name: "hasan",
  };

  userSocketIDs.set(user._id.toString(), socket.id);

  console.log(userSocketIDs);

  socket.on(NEW_MESSAGE, async ({ members, chatId, message }) => {
    const messageForRealtime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user._name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDb = {
      content: message,
      sender: user._id,
      chat: chatId,
    };

    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealtime,
    });
    io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });

    try {
      await Message.create(messageForDb);
    } catch (error) {
      console.error(error);
    }
    console.log("NEW MESSAGE", messageForRealtime);
  });

  socket.on("disconnect", () => {
    console.log("user disconnect");
    userSocketIDs.delete(user._id.toString());
  });
});

app.use(errorMiddleware);
server.listen(port, () => {
  console.log(`server listening on Port ${port} in ${envMode} Mode`);
});

export { envMode, adminSecretKey, userSocketIDs };
