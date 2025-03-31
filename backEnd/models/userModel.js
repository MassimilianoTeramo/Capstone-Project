import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["customer", "seller", "admin"],
    required: true, 
    default: "customer",
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  }
}, {timestamps: true});

export default model("User", userSchema);