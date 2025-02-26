import express from "express";
import {
  createNewUser,
  getMyProfile,
  login,
  logout,
  searchUser,
} from "../controller/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  loginValidator,
  registerValidator,
  validateHandler,
} from "../lib/validator.js";

const app = express.Router();

app.post(
  "/new",
  singleAvatar,
  registerValidator(),
  validateHandler,
  createNewUser
);
app.post("/login", loginValidator(), validateHandler, login);

app.use(isAuthenticated);
app.get("/me", getMyProfile);
app.post("/logout", logout);
app.get("/search", searchUser);

export default app;
