import express from "express";
import {
  allChats,
  allMessages,
  allUsers,
  getDashboardStats,
} from "../controller/admin.js";

const app = express.Router();

app.get("/");
app.post("/verify");
app.post("/logout");
app.get("/users", allUsers);
app.get("/chats", allChats);
app.get("/messages", allMessages);
app.get("/stats", getDashboardStats);

export default app;
