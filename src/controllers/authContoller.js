import User from "../models/userSchema.js";
import JWT from "jsonwebtoken";
import config from "../config/config.js";

export const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

export const signup = async (req, res) => {
  try {
    // get info from the frontendc
    const { name, email, password, phone, address,role } = req.body;

    // validation and response
    if (!name || !email || !password || !phone || !address || !role) {
      res.status(400).json({
        success: false,
        message: "Pls fill all the fields",
      });
    }
    // check if the user already exist in the database
    const existingUser = await User.findOne({ email });
    // if the user exists send response
    if (existingUser) {
      res.status(200).json({
        success: false,
        message: "User already exists. Pls login",
      });
    }
    // if the user doesn't exist, create new user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      address,
      role,
    });
    // token
    let token = JWT.sign(
      { _id: user._id, role: user.role },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRY },
    );

    // password safety
    user.password = undefined;

    // set up cookies
    res.cookie("token", token, cookieOptions);

    // if ok, send success response to the frontend
    res.status(201).json({
      success: true,
      message: "Succussfully Signed up",
      user,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in signing up",
      error,
    });
  }
};
