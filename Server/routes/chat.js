import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  getMyChats,
  newGroupChat,
  getMyGroups,
  addMembers,
  removeMember,
  leaveGroup,
  sendAttachments,
  getChatDetails,
  renameGroup,
  deleteChat,
  getMessages
} from "../controller/chat.js";
import { attachmentsMulter } from "../middlewares/multer.js";

const app = express.Router();

app.use(isAuthenticated);

app.post("/new", newGroupChat);
app.get("/my", getMyChats);
app.get("/my/groups", getMyGroups);
app.put("/addmembers", addMembers);
app.delete("/removemember", removeMember);
app.delete("/leave/:id", leaveGroup);
// Send Attachments
app.post("/message", attachmentsMulter, sendAttachments);

// Get Messages

app.get("/message/:id", getMessages);
// Get Chat Details , rename, delete
app.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);

export default app;
