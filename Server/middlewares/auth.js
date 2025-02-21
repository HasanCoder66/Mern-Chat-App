import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";

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

export { isAuthenticated };
