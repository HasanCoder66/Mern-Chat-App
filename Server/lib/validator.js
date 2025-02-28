import { body, param, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);

  const errorMessage = errors
    .array()
    .map((err) => err.msg)
    .join(", ");
  //   console.log(errorMessage);

  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessage, 400));
};

const registerValidator = () => [
  body("name", "Please Enter a Name").notEmpty(),
  body("password", "Please Enter a Password").notEmpty(),
  body("username", "Please Enter a Username").notEmpty(),
  body("bio", "Please Enter a Bio").notEmpty(),
];

const loginValidator = () => [
  body("password", "Please Enter a Password").notEmpty(),
  body("username", "Please Enter a Username").notEmpty(),
];

const groupChatValidator = () => [
  body("name", "Please Enter a Name").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 2, max: 100 })
    .withMessage(" Members must be 2 - 100"),
];

const addMemberValidator = () => [
  body("chatId", "Please Enter a Chat ID").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 1, max: 97 })
    .withMessage(" Members must be 1 - 97"),
];

const removeMemberValidator = () => [
  body("chatId", "Please Enter a Chat ID").notEmpty(),
  body("userId", "Please Enter a User ID").notEmpty(),
];

const sendAttachmentsValidator = () => [
  body("chatId", "Please Enter a Chat ID").notEmpty(),
];

const chatIdValidator = () => [
  param("id", "Please Enter a Chat ID").notEmpty(),
];

const renameGroupValidator = () => [
  param("id", "Please Enter a Chat ID").notEmpty(),
  body("name", "Please Enter a New Name").notEmpty(),
];

const sendRequestValidator = () => [
  body("userId", "Please Enter User ID").notEmpty(),
];

const acceptRequestValidator = () => [
  body("requestId", "Please Enter Request ID").notEmpty(),
  body("accept")
    .notEmpty()
    .withMessage("Please Enter Request ID")
    .isBoolean()
    .withMessage("Accept must be a Boolean"),
];

const adminLoginValidator = () => [
  body("secretKey", "Please Enter Secret Key").notEmpty(),
];

export {
  acceptRequestValidator, addMemberValidator, adminLoginValidator, chatIdValidator, groupChatValidator, loginValidator, registerValidator, removeMemberValidator, renameGroupValidator, sendAttachmentsValidator, sendRequestValidator, validateHandler
};

