import jwt from 'jsonwebtoken';

export function generateToken (payload) {
    return new Promise((resolve, reject) => 
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "24h" },
            (err, token) => {
                if (err) reject(err);
                else resolve(token);
                }
        )
    )
};

export default generateToken;