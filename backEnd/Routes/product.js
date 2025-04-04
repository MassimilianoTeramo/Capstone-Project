import {Router} from 'express';
import Product from '../models/productModel.js';
import { upload } from "../utilities/cloudinary.js";
import { authorization } from '../middlewares/authorization.js';

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
        const { title, description, price, category, author } = req.body;
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
        });

        const savedProduct = await newProduct.save();
        // Populate the author field with user details
        const populatedProduct = await Product.findById(savedProduct._id).populate('author', 'firstName lastName');
        res.status(201).json(populatedProduct);
    } catch (error) {
        res.status(500).json.json({ 
            message: "Errore durante il salvataggio del prodotto",
            error: error.message 
        });
    }
});

// Product by Author
router.get("/myproducts", authorization, async (req, res) => {
    try {
        const products = await Product.find({ author: req.user._id }).populate('author', 'firstName lastName');
        if (!products) {
            return res.status(200).json([]);
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get all products by category
// router.get('/category/:category', async (req, res) => {
//     try {
//         const products = await Product.find({ category: req.params.category }).populate('author', 'firstName lastName');
//         if (products.length === 0) {
//             return res.status(404).json({ message: 'No products found in this category' });
//         }
//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// Get all products by author
// router.get('/author/:authorId', async (req, res) => {
//     try {
//         const products = await Product.find({ author: req.params.authorId }).populate('author', 'firstName lastName');
//         if (products.length === 0) {
//             return res.status(404).json({ message: 'No products found for this author' });
//         }
//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });




// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('author', 'firstName lastName');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Update a product
router.put('/:id', authorization,  upload.single('image'), async (req, res) => {
    try {
        const { title, description, price, category, author } = req.body;
        const updateData = {};

        // campi che forniti nella richiesta
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (price) updateData.price = price;
        if (category) updateData.category = category;
        if (author) updateData.author = author;
        if (req.file) updateData.image = req.file.path;

        const product = await Product.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Prodotto non trovato" });
        }

        const updatedProduct = await Product.findById(req.params.id).populate('author', 'firstName lastName');
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ 
            message: "Errore durante l'aggiornamento del prodotto",
            error: err.message 
        });
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




export default router;