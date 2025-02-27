import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { cookieOptions, emitEvent, sendToken } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.js";
import { Request } from "../models/request.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/event.js";
import { getOtherMembers } from "../lib/helper.js";

// Create a New User and Save it to the Database and Save token in cookies
const createNewUser = async (req, res, next) => {
  try {
    const { name, bio, username, password } = req.body;

    const avatar = {
      public_id: "132465",
      url: "https://kalsdjfalsdjfoej.cm",
    };

    const user = await User.create({
      name,
      username,
      password,
      avatar,
      bio,
    });

    user.save();
    // console.log("user ========>", user);

    sendToken(res, user, 201, "User Creatd Successfully..");
  } catch (error) {
    next(error);
  }
};

// Login a User and Save token in cookies

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid Username", 404));

    const isMatchedPass = await compare(password, user?.password);
    if (!isMatchedPass) return next(new ErrorHandler("Invalid Password", 404));

    sendToken(res, user, 200, `Welcome Back ${user.name}`);
  } catch (error) {
    next(error);
  }
};

const getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    if (!user) return next(new ErrorHandler("User not found", 404));
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Logout remove token in cookies
const logout = async (req, res, next) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { ...cookieOptions, maxAge: 0 })
      .json({
        success: true,
        message: "User Logout Successfully",
      });
  } catch (error) {
    next(error);
  }
};

const searchUser = async (req, res, next) => {
  try {
    const { name = "" } = req.query;

    const myChats = await Chat.find({ groupChat: false, members: req.user });
    const allUserFromMyChats = myChats.flatMap((chat) => chat.members);

    const allUsersExceptMeAndFriends = await User.find({
      _id: { $nin: allUserFromMyChats },
      name: { $regex: name, $options: "i" },
    });

    const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
      _id,
      name,
      avatar: avatar.url,
    }));
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

const sendFriendRequest = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const request = await Request.findOne({
      $or: [
        { sender: req.user, receiver: userId },
        { sender: userId, receiver: req.user },
      ],
    });

    if (request) return next(new ErrorHandler("Request Already Sent", 400));

    await Request.create({
      sender: req.user,
      receiver: userId,
    });

    emitEvent(req, NEW_REQUEST, [userId]);

    return res.status(200).json({
      success: true,
      message: "Friend Request Sent",
    });
  } catch (error) {
    next(error);
  }
};

const acceptFriendRequest = async (req, res, next) => {
  try {
    const { requestId, accept } = req.body;

    const request = await Request.findById(requestId)
      .populate("sender", "name")
      .populate("receiver", "name");

    // console.log(request);
    // console.log("request.receiver -->", request.receiver);

    if (!request) return next(new ErrorHandler("Request not found", 404));

    if (request.receiver._id.toString() !== req.user.toString())
      return next(
        new ErrorHandler("You are not authorized to accept this request", 401)
      );

    if (!accept) {
      await request.deleteOne();

      return res.status(200).json({
        success: true,
        message: "Friend Request Rejected",
      });
    }

    const members = [request.sender._id, request.receiver._id];
    console.log(members);
    await Promise.all([
      Chat.create({
        members,
        name: `${request.sender.name}-${request.receiver.name}`,
      }),
      request.deleteOne(),
    ]);

    emitEvent(req, REFETCH_CHATS, members);

    return res.status(200).json({
      success: true,
      message: "Friend Request Accepted",
      senderId: request.sender._id,
    });
  } catch (error) {
    next(error);
  }
};

const getMyNotifications = async (req, res, next) => {
  try {
    const requests = await Request.find({
      receiver: req.user,
    }).populate("sender", "name avatar");

    const allRequests = requests.map(({ _id, sender }) => ({
      _id,
      sender: {
        _id: sender._id,
        name: sender.name,
        avatar: sender.avatar.url,
      },
    }));

    return res.status(200).json({
      success: true,
      allRequests,
    });
  } catch (error) {
    next(error);
  }
};

const getMyFriends = async (req, res, next) => {
  try {
    const chatId = req.query.chatId;

    const chats = await Chat.find({
      members: req.user,
      groupChat: false,
    }).populate("members", "name avatar");

    const friends = chats.map(({ members }) => {
      const otherUser = getOtherMembers(members, req.user);
      return {
        _id: otherUser._id,
        name: otherUser.name,
        avatar: otherUser.avatar.url,
      };
    });

    if (chatId) {
      const chat = await Chat.findById(chatId);

      const availableFriends = friends.filter(
        (friend) => !chat.members.includes(friend._id)
      );
      return res.status(200).json({
        success:true,
        friends: availableFriends
      })
    } else {
      return res.status(200).json({
        success: true,
        friends,
      });
    }
  } catch (error) {
    next(error);
  }
};

export {
  createNewUser,
  login,
  getMyProfile,
  logout,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getMyNotifications,
  getMyFriends,
};
