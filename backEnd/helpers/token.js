import jwt from 'jsonwebtoken';

export function generateToken(user) {
    return new Promise((resolve, reject) => {
        if (!user || !user._id) {
            reject(new Error('User object or user._id is missing'));
            return;
        }

        const payload = {
            _id: user._id,
            email: user.email,
            role: user.role
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "10h" },
            (err, token) => {
                if (err) {
                    console.error('Token generation error:', err);
                    reject(err);
                } else {
                    console.log('Token generated successfully for user:', user._id);
                    resolve(token);
                }
            }
        );
    });
}

export default generateToken;