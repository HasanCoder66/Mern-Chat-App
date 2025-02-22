import { ALERT, REFETCH_CHATS } from "../constants/event.js";
import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";
import { emitEvent } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import { getOtherMembers } from "../lib/helper.js";

const newGroupChat = async (req, res, next) => {
  try {
    const { members, name } = req.body;
    console.log(members);

    if (members.length < 2)
      return next(new ErrorHandler("Group chat  must have at least 3 members"));

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

    if (!members || members.length < 1)
      return next(new ErrorHandler("Please provide members", 400));
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

    const [chat, userThatWillBeRemoved] = Promise.all([
      Chat.findById(chatId),
      User.findById(userId, "name"),
    ]);

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
      message: "Member Removed Successfully",
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
};
