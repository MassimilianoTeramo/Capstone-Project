import {Router} from 'express';
import Product from '../models/productModel.js';
import { upload } from "../utilities/cloudinary.js";
import { authorization } from '../middlewares/authorization.js';
import { loggedUser } from '../middlewares/loggedUser.js';

const router = Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const skip = (page - 1) * limit;

        //conta il numero di prodotti
        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit);

        //product pagination
        const products = await Product.find()
            .populate('author', 'firstName lastName')
            .skip(skip)
            .limit(limit)
            .sort({createdAt: -1});

        res.json({
            products, 
            currentPage: page, 
            totalPages, 
            totalProducts
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new product
router.post("/", authorization, upload.single('image'), async (req, res) => {
    try {
        const { title, description, price, category, author, condition, size, brand, gender } = req.body;
        console.log('Received data:', req.body);
        console.log('Received file:', req.file);

        // Validate required fields
        if (!title || !description || !price || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newProduct = new Product({ 
            title, 
            description,
            image: req.file.path, 
            price, 
            category, 
            author,
            condition,
            size,
            brand,
            gender,

        });

        const savedProduct = await newProduct.save();
        // Populate the author field with user details
        const populatedProduct = await Product.findById(savedProduct._id).populate('author');

        res.status(201).json({
            message: "Product created successfully",
            product: populatedProduct
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Errore durante il salvataggio del prodotto",
            error: error.message 
        });
    }
});


// Update a product
router.put('/:id', authorization,  upload.single('image'), async (req, res) => {
    try {
        const { title, description, price, category, condition, brand, size, gender } = req.body;
        const updateData = {};

        // campi che forniti nella richiesta
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (price) updateData.price = price;
        if (category) updateData.category = category;
        if (req.file) updateData.image = req.file.path;
        if (condition) updateData.condition = condition;
        if (brand) updateData.brand = brand;
        if (size) updateData.size = size;
        if (gender) updateData.gender = gender;

        const product = await Product.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Prodotto non trovato" });
        }

        const updatedProduct = await Product.findById(req.params.id);
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ 
            message: "Errore durante l'aggiornamento del prodotto",
            error: err.message 
        });
    }
});


// Product by Author
router.get("/myproducts", authorization, async (req, res) => {
    try {
        const products = await Product.find({ author: req.user._id }).populate('author');
        if (!products) {
            return res.status(200).json([]);
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get liked product
router.get("/wishlist", authorization, async (req, res) => {
    try {
        const wishlistProducts = await Product.find({ liked: true });
        if (!wishlistProducts) {
            return res.status(200).json([]);
        }
        res.status(200).json(wishlistProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('author');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Delete a product
router.delete('/:id', authorization, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all products by category
router.get('/category/:category', loggedUser, async (req, res) => {
    try {
        const { category } = req.params;
       

        const products = await Product.find({ category: category, author:{$ne: req.user?._id} });
       
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get products by condition
router.get('/condition/:condition', loggedUser, async (req, res) => {
    try {
        const { condition } = req.params;

        const products = await Product.find({ condition: condition, author:{$ne: req.user?._id} });
       
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get products by brand
router.get('/brand/:brand', loggedUser, async (req, res) => {
    try {
        const { brand } = req.params;

        const products = await Product.find({ brand: brand, author:{$ne: req.user?._id} });
       
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;