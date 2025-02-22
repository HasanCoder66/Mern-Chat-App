import express from "express";
import { connectDb } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
// import { createUser } from "./seeders/seed.js";

import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";

dotenv.config(); // { path: "./.env" }

const app = express();
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 6000;

connectDb(mongoURI);
// createUser(10)

// Middlewares ===>
app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded());
app.use("/user", userRoute);
app.use("/chat", chatRoute);

app.get("/", (req, res) => {
  console.log("Hello World");
});

app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`server listening on Port ${port} `);
});
