import express, {Router} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

//Routes
import productRoutes from './Routes/product.js';
import userRoutes from './Routes/users.js';
import authRoutes from './Routes/auth.js';

const server = express();
const router = express.Router();
server.use(express.json());
server.use(router);
server.use(cors());


// Middleware
server.use(cors());

//Routes
server.use('/products', productRoutes);
server.use('/users', userRoutes);
server.use('/auth', authRoutes);

//MONGODB
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

if (process.env.PORT){
    server.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
} else {
    console.log('ERROR: PORT not defined');
}


