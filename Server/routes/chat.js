import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getMyChats, newGroupChat, getMyGroups, addMembers, removeMember , leaveGroup} from "../controller/chat.js";

const app = express.Router();


app.use(isAuthenticated);

app.post("/new", newGroupChat);
app.get("/my", getMyChats);
app.get("/my/groups", getMyGroups);
app.put("/addmembers", addMembers);
app.put("/removemember", removeMember);
app.delete("/leave/:id", leaveGroup);


// Send Attachments 
// Get Messages 
// Get Chat Details , rename, delete 
export default app;
