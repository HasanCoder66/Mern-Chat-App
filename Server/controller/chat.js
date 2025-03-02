import {
  ALERT,
  NEW_ATTACHMENT,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../constants/event.js";
import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";
import { Message } from "../models/message.js";
import { deleteFilesFromCloudinary, emitEvent } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import { getOtherMembers } from "../lib/helper.js";

const newGroupChat = async (req, res, next) => {
  try {
    const { members, name } = req.body;
    // console.log(members);

    const allMembers = [...members, req.user];
    const chat = await Chat.create({
      name,
      groupChat: true,
      creator: req.user,
      members: allMembers,
    });

    emitEvent(req, ALERT, allMembers, `Welcome to ${name} Group`);
    emitEvent(req, REFETCH_CHATS, members);

    return res.status(201).json({
      success: true,
      message: "Group Created",
      data: chat,
    });
  } catch (error) {
    next(error);
  }
};

const getMyChats = async (req, res, next) => {
  try {
    const chats = await Chat.find({ members: req.user }).populate(
      "members",
      "name avatar"
    );

    const transformedChats = chats.map(({ _id, groupChat, name, members }) => {
      // console.log(chats);

      const otherMember = getOtherMembers(members, req.user);
      return {
        _id,
        groupChat,
        avatar: groupChat
          ? members.slice(0, 3).map(({ avatar }) => avatar.url)
          : [otherMember.avatar.url],
        name: groupChat ? name : otherMember.name,
        members: members.reduce((prev, curr) => {
          if (curr._id.toString() !== req.user.toString()) {
            prev.push(curr._id);
          }
          return prev;
        }, []),
      };
    });
    return res.status(200).json({
      success: true,
      message: "My Chats",
      chats: transformedChats,
    });
  } catch (error) {
    next(error);
  }
};

const getMyGroups = async (req, res, next) => {
  try {
    const chats = await Chat.find({
      members: req.user,
      groupChat: true,
      creator: req.user,
    }).populate("members", "name avatar");

    const groups = chats.map(({ _id, members, name, groupChat }) => ({
      _id,
      name,
      groupChat,
      avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
    }));

    return res.status(200).json({
      success: true,
      message: "My Groups",
      groups,
    });
  } catch (error) {
    next(error);
  }
};

const addMembers = async (req, res, next) => {
  try {
    const { members, chatId } = req.body;
    const chat = await Chat.findById(chatId);

    if (!chat) return next(new ErrorHandler("Chat not Found", 404));

    if (!chat.groupChat)
      return next(new ErrorHandler("This is not a Group Chat", 400));

    if (chat.creator.toString() !== req.user.toString())
      return next(
        new ErrorHandler("You are not allowed to add members in the group", 403)
      );

    const allNewMembersPromise = members.map((m) => User.findById(m, "name"));

    const allNewMembers = await Promise.all(allNewMembersPromise);
    const uniqueMembers = allNewMembers
      .filter((i) => !chat.members.includes(i._id.toString()))
      .map((i) => i._id);
    chat.members.push(...uniqueMembers);
    // chat.members.push(...allNewMembers.map((i) => i._id));

    if (chat.members.length > 100)
      return next(new ErrorHandler("Group members limit reached", 400));

    await chat.save();

    const allUsersName = allNewMembers.map((i) => i.name).join(",");

    emitEvent(
      req,
      ALERT,
      chat.members,
      `${allUsersName} has been added in the Group`
    );
    emitEvent(req, REFETCH_CHATS, chat.members);
    return res.status(200).json({
      success: true,
      message: "Members Added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

const removeMember = async (req, res, next) => {
  try {
    const { chatId, userId } = req.body;
    // console.log(chatId);
    // console.log(userId);
    const [chat, userThatWillBeRemoved] = await Promise.all([
      Chat.findById(chatId),
      User.findById(userId, "name"),
    ]);
    // console.log("Chat:", chat);
    // console.log("Chat Creator:", chat.creator);
    // console.log("Req User:", req.user);
    // console.log("User to be removed:", userThatWillBeRemoved);
    // console.log("Chat Members:", chat.members);

    if (!chat) return next(new ErrorHandler("Chat not Found", 404));

    if (!chat.groupChat)
      return next(new ErrorHandler("This is not a Group Chat", 400));

    if (chat.creator.toString() !== req.user.toString())
      return next(
        new ErrorHandler("You are not allowed to add members in the group", 403)
      );
    if (chat.members.length <= 3)
      return next(new ErrorHandler("Group must have at least 3 members", 400));

    chat.members = chat.members.filter(
      (member) => member.toString() !== userId.toString()
    );

    await chat.save();

    emitEvent(
      req,
      ALERT,
      chat.members,
      `${userThatWillBeRemoved.name} has been remove from the group`
    );
    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
      success: true,
      message: "Member Removed Successfully",
    });
  } catch (error) {
    next(error);
  }
};

const leaveGroup = async (req, res, next) => {
  try {
    const chatId = req.params.id;

    const chat = await Chat.findById(chatId);

    if (!chat) return next(new ErrorHandler("Chat not Found", 404));

    if (!chat.groupChat)
      return next(new ErrorHandler("This is not a Group Chat", 400));

    const remainingMembers = chat.members.filter(
      (member) => member.toString() !== req.user.toString()
    );

    if (remainingMembers.length < 3)
      return next(new ErrorHandler("Group Must have at least 3 members", 400));

    if (chat.creator.toString() === req.user.toString()) {
      const randomElement = Math.floor(Math.random() * remainingMembers.length);
      const newCreator = remainingMembers[randomElement];

      chat.creator = newCreator;
    }

    chat.members = remainingMembers;
    const [user] = await Promise.all([
      User.findById(req.user, "name"),
      chat.save(),
    ]);

    emitEvent(
      req,
      ALERT,
      chat.members,
      `User ${user.name} has been left the Group`
    );

    return res.status(200).json({
      success: true,
      message: "Leave Group Successfully",
    });
  } catch (error) {
    next(error);
  }
};

const sendAttachments = async (req, res, next) => {
  try {
    const { chatId } = req.body;
    const files = req.files || [];

    if (files.length < 1)
      return next(new ErrorHandler("Please Upload Attachments", 400));
    if (files.length > 5)
      return next(new ErrorHandler("Files Can't be more than 5", 400));

    const [chat, me] = await Promise.all([
      Chat.findById(chatId),
      User.findById(req.user, "name"),
    ]);
    if (!chat) return next(new ErrorHandler("chat not found", 404));

    if (files.length < 1)
      return next(new ErrorHandler("Please provide attachment", 400));

    const attachments = [];

    const messageForDB = {
      content: "",
      attachments,
      sender: me._id,
      chat: chatId,
    };

    const messageForRealTime = {
      ...messageForDB,
      sender: {
        _id: me._id,
        name: me.name,
      },
    };
    const message = await Message.create(messageForDB);

    emitEvent(req, NEW_ATTACHMENT, chat.members, {
      message: messageForRealTime,
      chat: chatId,
    });
    emitEvent(req, NEW_MESSAGE_ALERT, chat.members, {
      chat: chatId,
    });
    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    next(error);
  }
};

const getChatDetails = async (req, res, next) => {
  try {
    if (req.query.populate === "true") {
      // console.log("Populate")
      const chat = await Chat.findById(req.params.id)
        .populate("members", "name avatar")
        .lean();

      if (!chat) return next(new ErrorHandler("Chat not found", 404));

      chat.members = chat.members.map(({ _id, name, avatar }) => ({
        _id,
        name,
        avatar: avatar.url,
      }));

      return res.status(200).json({
        success: true,
        chat,
      });
    } else {
      // console.log("Not Populate")
      const chat = await Chat.findById(req.params.id);
      if (!chat) return next(new ErrorHandler("chat not found", 404));

      return res.status(200).json({
        success: true,
        chat,
      });
    }
  } catch (error) {
    next(error);
  }
};

const renameGroup = async (req, res, next) => {
  try {
    const chatId = req.params.id;
    const { name } = req.body;

    // console.log(name, "name ===>")

    const chat = await Chat.findById(chatId);
    if (!chat) return next(new ErrorHandler("chat not found", 404));
    if (!chat.groupChat)
      return next(new ErrorHandler("This is not a group chat", 400));
    if (chat.creator.toString() !== req.user.toString())
      return next(
        new ErrorHandler("you are not allowed to rename the group", 403)
      );

    chat.name = name;

    await chat.save();

    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
      success: true,
      message: "Group rename successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deleteChat = async (req, res, next) => {
  try {
    const chatId = req.params.id;

    const chat = await Chat.findById(chatId);
    if (!chat) return next(new ErrorHandler("chat not found", 404));

    const members = chat.members;

    if (chat.groupChat && chat.creator.toString() !== req.user.toString())
      return next(
        new ErrorHandler("you are not allowed to delete the group", 403)
      );

    if (!chat.groupChat && !chat.members.includes(req.user.toString()))
      return next(
        new ErrorHandler("you are not allowed to delete the chat", 403)
      );

    const messageWithAttachments = await Message.find({
      chat: chatId,
      attachments: { $exists: true, $ne: [] },
    });

    const public_ids = [];
    messageWithAttachments.forEach(({ attachments }) => {
      attachments.forEach(({ public_id }) => {
        public_ids.push(public_id);
      });
    });

    console.log("public_ids ===>", public_ids);

    await Promise.all([
      // Delete files from Cloudinary
      deleteFilesFromCloudinary(public_ids),
      chat.deleteOne(),
      Message.deleteMany({ chat: chatId }),
    ]);

    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
      success: true,
      message: "Chat Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const chatId = req.params.id;
    const { page = 1 } = req.query;

    const resultPerPage = 20;
    const skip = (page - 1) * resultPerPage;

    const [messages, totalMessagesCount] = await Promise.all([
      Message.find({
        chat: chatId,
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(resultPerPage)
        .populate("sender", "name")
        .lean(),
      Message.countDocuments({ chat: chatId }),
    ]);

    const totalPages = Math.ceil(totalMessagesCount / resultPerPage) || 0;

    return res.status(200).json({
      success: true,
      messages: messages.reverse(),
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};

export {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addMembers,
  removeMember,
  leaveGroup,
  sendAttachments,
  getChatDetails,
  renameGroup,
  deleteChat,
  getMessages,
};
