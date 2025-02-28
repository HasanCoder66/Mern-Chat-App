import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { adminSecretKey } from "../app.js";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies["token"];
  // console.log("cookies:",token)

  if (!token)
    return next(new ErrorHandler("Please Login to Access this Route", 401));
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  //   console.log(decodedData);

  req.user = decodedData._id;

  next();
};

const adminOnly = (req, res, next) => {
  const token = req.cookies["admin-token"];

  if (!token)
    return next(new ErrorHandler("Only Admin Can Access this Route", 401));

  const secretKey = jwt.verify(token, process.env.JWT_SECRET);
  const isMatched = secretKey === adminSecretKey;

  if (!isMatched)
    return next(new ErrorHandler("Only Admin Can Access this Route", 401));

  next();
};

export { isAuthenticated, adminOnly };
