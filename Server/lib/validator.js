import { body, check, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const registerValidator = () => [
  body("name", "Please Enter a Name").notEmpty(),
  body("password", "Please Enter a Password").notEmpty(),
  body("username", "Please Enter a Username").notEmpty(),
  body("bio", "Please Enter a Bio").notEmpty(),
  check("avatar", "Please Upload avatar").notEmpty()
];

const loginValidator = () => [
  body("password", "Please Enter a Password").notEmpty(),
  body("username", "Please Enter a Username").notEmpty(),
];

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
export { registerValidator, loginValidator, validateHandler };
