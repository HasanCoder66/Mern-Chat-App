import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { cookieOptions, sendToken } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";

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
    const { name } = req.query;
    return res.status(200).json({
      success: true,
      message: name,
    });
  } catch (error) {
    next(error);
  }
};

export { createNewUser, login, getMyProfile, logout, searchUser };
