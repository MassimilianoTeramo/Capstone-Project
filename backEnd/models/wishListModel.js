import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const wishListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});
wishListSchema.index({ user: 1, product: 1 }, { unique: true });

export default model("Wishlist", wishListSchema);
