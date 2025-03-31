import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
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
    enum: ["shirts", "shoes", "shorts", "socks"],
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  rate: {
    type: Number,
    required: false,
    enum:[0, 1, 2, 3, 4, 5],
  }


}, {timestamps: true});

export default model("Product", productSchema);