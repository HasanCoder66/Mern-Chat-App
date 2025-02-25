import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const cookieOptions = {
  maxAge: 10 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "none",
  secure: true,
};
const connectDb = (uri) => {
  mongoose
    .connect(uri, { dbName: "ChatApp" }) //
    .then((data) => console.log(`Connect Db ${data.connection.host}`))
    .catch((err) => {
      console.log(`Database Connection Error: ${err}`);
      throw err;
    });
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(code).cookie("token", token, cookieOptions).json({
    success: true,
    message,
    // data: user,
  });
};


const deleteFilesFromCloudinary = async (public_ids) => {

  // Delete files from Cloudinary
}



const emitEvent = (req, event, user, data) => {
  console.log("emit eventing console", event)
}
export { connectDb, sendToken, cookieOptions, emitEvent , deleteFilesFromCloudinary};
