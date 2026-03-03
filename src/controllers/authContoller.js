import User from "../models/userSchema.js";
import JWT from "jsonwebtoken";
import config from "../config/config.js";


export const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

// signUP

export const signup = async (req, res) => {
  try {
    // get info from the frontendc
    const { name, email, password, phone, address, role } = req.body;

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
      token,
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

// Login
export const login = async (req, res) => {
  try {
    // get info from the frontend
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    // check if user exist in the database
    const user = await User.findOne({ email }).select("+password");
    // if user doesn't exist send response
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found, please sign up",
      });
    }
    // if user exist compare the password
    const isPasswordMatched = await user.comparePassword(password);
    //const isPasswordMatched = await password.compare(password, user.password)


    // if password doesnt match send response
    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
    // if password matched, generate token
    const token = JWT.sign(
      { _id: user._id, role: user.role },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRY },
    );
    // flush out password
    user.password = undefined;
    // set up cookie
    res.cookie("token", token, cookieOptions);
    // send success msg
    res.status(200).json({
      success: true,
      message: "User successfully logged in",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// logout
export const logout = async(req, res) => {
  try{
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly:true
    })
    res.status(200).json({
      success:true,
      message:"Logged out successfully"
    })

  }catch(error){
    console.log(error)
    res.status(500).json({
      success:false,
      message:"Error in logout",
      error
    })
  }
}



