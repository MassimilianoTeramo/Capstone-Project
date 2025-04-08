import express, {Router} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import GoogleStrategy from 'passport-google-oauth20';
import googleStrategy from './middlewares/passport.config.js';
import passport from 'passport';
dotenv.config();

//Routes
import productRoutes from './Routes/product.js';
import userRoutes from './Routes/users.js';
import authRoutes from './Routes/auth.js';
import reviewRoutes from './Routes/reviews.js';

const server = express();


// Middleware
server.use(cors());
passport.use(googleStrategy);

server.use(express.json());


//Routes
server.use('/products', productRoutes);
server.use('/users', userRoutes);
server.use('/auth', authRoutes);
server.use('/reviews', reviewRoutes);

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


