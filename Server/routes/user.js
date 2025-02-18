import express from "express";
import { createNewUser, login } from "../controller/user.js";
import { singleAvatar } from "../middlewares/multer.js";



const app = express.Router();

app.post("/new",singleAvatar ,createNewUser);

export default app;
