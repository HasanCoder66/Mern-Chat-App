import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { newGroupChat } from "../controller/chat.js";

const app = express.Router();

app.use(isAuthenticated);
app.use("/new", newGroupChat)

export default app;
