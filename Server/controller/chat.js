import { ALERT, REFETCH_CHATS } from "../constants/event.js";
import { Chat } from "../models/chat.js";
import { emitEvent } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";

const newGroupChat = async (req, res, next) => {
  try {
    const { members, name } = req.body;

    if (members.length < 2)
      return next(new ErrorHandler("Group chat  must have at least 3 members"));

    const allMembers = [...members, req.user];
    const chat = await Chat.create({
      name,
      groupChat: true,
      creator: req.user,
      allMembers,
    });

    emitEvent(req,ALERT, allMembers, `Welcome to ${name} Group`)
    emitEvent(req,REFETCH_CHATS, members, )


    return res.status(201).json({
        success : true,
        message:"Group Created"
    })
  } catch (error) {
    next(error);
  }
};

export { newGroupChat };
