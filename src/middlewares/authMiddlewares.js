import JWT from "jsonwebtoken";
import config from "../config/config.js";
import User from "../models/userSchema.js";
import AuthRoles from "../utils/AuthRoles.js";


// isLoggedIn
export const isLoggedIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("AUTH HEADER:", authHeader); // debug

    const { token } = req.cookies;
    // if no token send msg
    if (!token) {
      res.status(404).json({
        success: false,
        message: "Un-authorized user",
      });
    }
    // if token found
    const decoded = JWT.verify(token, config.JWT_SECRET);

    req.user = decoded;
    next();

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in middleware",
      error,
    });
  }
};

// isAdmin
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role.toLowerCase() !== AuthRoles.ADMIN.toLowerCase()) {
      res.status(400).json({
        success: false,
        message: "You are not authorized to access this page",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in admin middleware",
      error,
    });
  }
};



// isLoggedIn
// export const isLoggedIn = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       return res.status(401).json({
//         success: false,
//         message: "No token provided",
//       });
//     }

//     const token = authHeader.split(" ")[1]; // 👈 VERY IMPORTANT

//     const decoded = JWT.verify(token, config.JWT_SECRET);

//     req.user = decoded;
//     next();

//   } catch (error) {
//     console.log(error);
//     return res.status(401).json({
//       success: false,
//       message: "Invalid token",
//     });
//   }
// };
