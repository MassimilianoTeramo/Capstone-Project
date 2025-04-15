import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ["shirts", "shoes", "shorts", "socks", "balls"],
    required: true
  },
  size: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  condition: {
    type: String,
    enum: ["new", "used"],
    required: true
  },
  brand: {
    type: String,
    enum: ["Nike", "Adidas", "Puma", "Errea", "Mizuno", "Kappa", "Joma", "Diadora", "Umbro"],
    required: true
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Kids", "Unisex"],
    required: true
  }
}, {timestamps: true});

export default model("Product", productSchema);