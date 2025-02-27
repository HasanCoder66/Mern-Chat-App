import express from "express";
import {
  acceptFriendRequest,
  createNewUser,
  getMyFriends,
  getMyNotifications,
  getMyProfile,
  login,
  logout,
  searchUser,
  sendFriendRequest,
} from "../controller/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  acceptRequestValidator,
  loginValidator,
  registerValidator,
  sendRequestValidator,
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
app.put(
  "/sendrequest",
  sendRequestValidator(),
  validateHandler,
  sendFriendRequest
);
app.put(
  "/acceptrequest",
  acceptRequestValidator(),
  validateHandler,
  acceptFriendRequest
);
app.get("/notifications", getMyNotifications);
app.get("/friends", getMyFriends);

export default app;
