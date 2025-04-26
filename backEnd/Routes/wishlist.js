import express from "express";
import Wishlist from "../models/wishListModel.js";
import { authorization } from "../middlewares/authorization.js";
import { Alert } from "react-bootstrap";

const router = express.Router();

// Toggle prodotto nella wishlist (aggiungi/rimuovi)
router.post("/:productId", authorization, async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    // Verifica se il prodotto è già nella wishlist
    const existingWish = await Wishlist.findOne({
      user: userId,
      product: productId,
    });

    if (existingWish) {
      // Se esiste, rimuovilo
      await Wishlist.findByIdAndDelete(existingWish._id);
      return res.status(200).json({
        message: "Prodotto rimosso dalla wishlist",
        isLiked: false,
      });
    } else {
      // Se non esiste, aggiungilo
      const newWish = new Wishlist({
        user: userId,
        product: productId,
      });
      await newWish.save();
      return res.status(200).json({
        message: "Prodotto aggiunto alla wishlist",
        isLiked: true,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ottieni tutti i prodotti nella wishlist dell'utente
router.get("/", authorization, async (req, res) => {
  try {
    const userId = req.user._id;

    const wishlistItems = await Wishlist.find({
      user: userId,
      author: { $ne: req.user?._id },
    })
      .populate("product")
      .populate("user", "firstName lastName");

    const products = wishlistItems.map((item) => item.product);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
