import { User } from "../models/user.js";

// Create a New User and Save it to the Database and Save in cookie
import jwt from "jsonwebtoken";
// Make sure you have imported your User model and any necessary middlewares

const createNewUser = async (req, res, next) => {
  try {
    // Destructure required fields from the request body
    const { name, bio, username, password } = req.body;
    console.log(name);
    console.log(bio);
    console.log(username);
    console.log(password);
    // Create an avatar object (this is just an example)
    const avatar = {
      public_id: "132465",
      url: "https://example.com/avatar.png",
    };

    // Create and save the new user in the database
    const user = await User.create({
      name,
      bio,
      username,
      password, // Consider hashing the password before storing it!
      avatar,
    });

    // Generate a JWT token.
    // Ensure you have a JWT_SECRET and JWT_EXPIRES_IN defined in your .env file.
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d", // Default to 1 day if not provided
    });

    // Save the token in a cookie
    res.cookie("token", token, {
      httpOnly: true, // Makes the cookie inaccessible to client-side scripts
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Cookie expires in 1 day
    });

    // Send a successful response back to the client
    res.status(201).json({
      success: true,
      data: user,
      token,
      message: "User created successfully and token stored in cookie",
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: `Internal error: ${error.message}`,
    });
  }
};

export default createNewUser;

// const createNewUser = async (req, res, next) => {
//     const { name, bio, username, password , } = req.body;
//     console.log(name,bio, username, password, avatar)
//     const avatar = {
//       public_id: "132465",
//       url: "https://kalsdjfalsdjfoej.cm",
//     };

//     // const user =
//      await User.create({
//       name,
//       bio,
//       username,
//       password,
//       avatar,
//     });

//     // user.save()

//     res.status(201).json({
//     //   data: user,
//       message: " User Created Successfullu",
//     });
// //   } catch (error) {
//     // console.log(error);
//     // res.status(400).json({
//     //   status: 400,
//     //   message: `Internol error: ${error}`,
//     // });
//   }
// };

const login = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export { createNewUser, login };
