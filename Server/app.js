import express from "express";
import { connectDb } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
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

dotenv.config(); // { path: "./.env" }

const app = express();
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 6000;
export const adminSecretKey =
  process.env.ADMIN_SECRET_KEY || "3866coder.m.hasan";
  
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

app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`server listening on Port ${port} `);
});
