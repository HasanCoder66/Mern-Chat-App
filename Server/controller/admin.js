import { User } from "../models/user.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";

const allUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    const transformedUsers = await Promise.all(
      users.map(async ({ _id, username, name, avatar }) => {
        const [groups, friends] = await Promise.all([
          Chat.countDocuments({ groupChat: true, members: _id }),
          Chat.countDocuments({ groupChat: false, members: _id }),
        ]);

        return {
          name,
          username,
          _id,
          avatar: avatar.url,
          groups,
          friends,
        };
      })
    );
    return res.status(200).json({
      success: true,
      users: transformedUsers,
    });
  } catch (error) {
    next(error);
  }
};

const allChats = async (req, res, next) => {
  try {
    const chats = await Chat.find({})
      .populate("members", "name avatar")
      .populate("creator", "name avatar");

    const transformedChats = await Promise.all(
      chats.map(async ({ members, _id, name, creator, groupChat }) => {
        const totalMessages = await Message.countDocuments({ chat: _id });
        return {
          members,
          _id,
          groupChat,
          name,
          avatar: members.slice(0, 3).map((member) => member.avatar.url),
          members: members.map(({ _id, name, avatar }) => ({
            _id,
            name,
            avatar: avatar.url,
          })),
          creator: {
            name: creator?.name || "None",
            avatar: creator?.avatar.url || "",
          },
          totalMembers: members.length,
          totalMessages,
        };
      })
    );

    return res.status(200).json({
      success: true,
      chats: transformedChats,
    });
  } catch (error) {
    next(error);
  }
};



const allMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({})
      .populate("sender", "name avatar")
      .populate("chat", "groupChat");

    const transformedMessages = messages.map(
      ({ _id, content, sender, attachments, createdAt, chat }) =>
        // console.log(chat)
        ({
          _id,
          content,
          attachments,
          createdAt,
        //   chat: chat._id,
        //   groupChat: chat.groupChat,
          sender: {
            _id: sender._id,
            name: sender._name,
            avatar: sender.avatar.url,
          },
        })
    );

    return res.status(200).json({
      success: true,
      messages: transformedMessages,
    });
  } catch (error) {
    next(error);
  }
};

const klm = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const nop = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export { allUsers, allChats, allMessages };
