import express from "express";
import { connectDb } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";
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
import { NEW_MESSAGE } from "./constants/event.js";

dotenv.config(); // { path: "./.env" }

const app = express();
const server = createServer(app);
const io = new Server(server, {});

// ENV KEYS!
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 6000;
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "3866coder.m.hasan";
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";

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

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on(NEW_MESSAGE, (data) => {
    console.log("NEW MESSAGE", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnect");
  });
});

app.use(errorMiddleware);
server.listen(port, () => {
  console.log(`server listening on Port ${port} in ${envMode} Mode`);
});

export { envMode, adminSecretKey };
