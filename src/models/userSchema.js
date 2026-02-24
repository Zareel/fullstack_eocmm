import mongoose from "mongoose";
import AuthRoles from "../utils/AuthRoles.js";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requred: [true, "Name is required"],
      trim: true,
      maxLength: [30, "Name should not exceed 30 chars"],
    },
    email: {
      type: String,
      reqired: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      reqired: true,
      minLength: [8, "Password should contain atleast 8 chars"],
      select: false,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      maxLength: [100, "Address should not exceed 100 chars"],
    },
    role: {
      type: String,
      enum: Object.values.AuthRoles,
      default: AuthRoles.USER,
    },
  },
  { timestamps: true },
);

// encrypt password before saving | you can use mongoose hooks
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


export default mongoose.model("User", userSchema);
