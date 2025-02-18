import express from "express";
import { connectDb } from "./utils/features.js";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";

dotenv.config({ path: "./.env" });

const app = express();
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

connectDb(mongoURI);

// Middlewares ===>

app.use(express.json());
app.use(express.urlencoded());
app.use("/user", userRoute);

app.get("/", (req, res) => {
  console.log("Hello World");
});

app.listen(port, () => {
  console.log(`server listening on Port ${port} `);
});
