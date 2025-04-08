import express from "express";
import Review from "../models/reviewsModel.js";
import { authorization } from "../middlewares/authorization.js";
import mongoose from 'mongoose';

const router = express.Router();

//GET
router.get('/product/:productId', async(req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId })
            .populate("author", "firstName lastName")
            .sort({ createdAt: -1});
        res.json(reviews);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

//POST
router.post('/', async (req, res) => {
    try {
        const { content, author, product } = req.body;
        const newReview = new Review({ content, author, product });
        const savedReview = await newReview.save();
        const populatedReview = await Review.findById(savedReview._id)
            .populate("author", "firstName lastName");
        res.status(201).json(populatedReview);
    } catch (err) {
        console.error('Errore creazione review:', err);
        res.status(500).json({ message: err.message });
    }
});

//DELETE
router.delete('/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Review non trovata" });
        }
        res.json({ message: "Review eliminato" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;