import Router from "express";   
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';



const router = Router();

//generate token
const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// Register a new user
router.post('/register', async (request, response) => {
    try {
        const { firstName, lastName, email, password, role } = request.body;
        const existingUser = await User.findOne({email}); // cerca nel db se la mail esiste gia
        if (existingUser) {
            return response.status(400).json({message: ' User already registered'}); 
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
        };

        const token = generateToken(newUser);
        response.status(201).json({user:userToSend, token});

       
    } catch (err) {
        response.status(500).json({ error: err.message });
    }
});

// Login user
router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({email:email})
            if (!user) {
                return res.status(401).json({ message: 'Wrong Credential' });
            }
            // Compare password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
              }
             // Generate token
            const token = generateToken(user);
            const userToSend = {
                _id: user._id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
            };
            res.json({ user: userToSend, token });
        (req, res, next);
        });

// Google Login

//endpoint for login
router.get('/me', async (request, response) => {
    try {
        // getting the tokem from the head of Authorization
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return response.status(401).json({ message: 'Token non fornito' });
        }
        
        const token = authHeader.split(' ')[1];
        
        // Verifica il token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Trova l'utente
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return response.status(404).json({ message: 'Utente non trovato' });
        }
        
        response.json({ user });
    } catch (err) {
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return response.status(401).json({ message: 'Token not valid or expired' });
        }
        response.status(500).json({ error: err.message });
    }
});
        
 export default router;



