import Router from "express";   
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import generateToken from "../helpers/token.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from 'dotenv';
dotenv.config();


const router = Router();


  // Login user
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Credenziali non valide' });
        }
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenziali non valide' });
        }
        // Generate token
        const token = await generateToken(user);
        const userToSend = {
            _id: user._id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
        };

        res.json({ user: userToSend, token });
    } catch (err) {
        console.error('Login error:', err);
        next(err);
    }
});

// Register a new user
router.post('/register', async (request, response) => {
    try {
        const { firstName, lastName, email, password, role } = request.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return response.status(400).json({message: 'Utente già registrato'}); 
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User ({
            ...request.body, 
            password: hashedPassword
        });
        await newUser.save();

        const userToSend = {
            _id: newUser._id,
            email: newUser.email,
            role: newUser.role,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            password: newUser.password
        };

        const token = await generateToken(newUser);
        response.status(201).json({
            user: userToSend, 
            token
        });
            console.log(token);
       
    } catch (err) {
        console.error('Registration error:', err);
        response.status(500).json({ error: err.message });
    }
});



// Google Login
router.get('/google', 
    passport.authenticate('google', {scope: ['profile', 'email'] }));

// Google login endpoint
router.get('/callback-google', 
    passport.authenticate('google', { session: false}),
   async (req, res, next) => {
        const token =  await generateToken(req.user);
        console.log('Token generato:', token);
        res.redirect(process.env.FRONTEND_URL + '/login?jwt=' + token);
    }
);


//endpoint for login
router.get('/me', async (request, response) => {
    try {
        // getting the token from the head of Authorization
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return response.status(401).json({ message: 'Token non fornito' });
        }
        
        const token = authHeader.split(' ')[1];
        
        // Verifica il token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Trova l'utente
        const user = await User.findById(decoded._id).select('-password');
        if (!user) {
            return response.status(404).json({ message: 'Utente non trovato' });
        }
        
        response.json({ user });
    } catch (err) {
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return response.status(401).json({ message: 'Token non valido o scaduto' });
        }
        response.status(500).json({ error: err.message });
    }
});

export default router;



