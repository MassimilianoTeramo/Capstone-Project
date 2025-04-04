import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const authorization = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Token non fornito' });
    }
    const parts = req.headers.authorization.split(' ');
    if (parts.length != 2) {
        return res.status(401).json({ message: 'Formato token non valido' });
    }
    if (parts[0] != 'Bearer') {
        return res.status(401).json({ message: 'NON inizia per Bearer' });
    }
    const jwtToken = parts[1];

    try {
        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const user = await User.findById(payload._id);
        
        if (!user) {
            return res.status(401).json({ message: 'Utente non trovato' });
        }
        
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token non valido o scaduto' });
    }
};