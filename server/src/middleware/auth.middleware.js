const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const auth_token = req.cookies.auth_token;

    if (!auth_token) return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(auth_token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};

// For head authentication, Like local storage
// const authenticate = (req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

//     try {
//         const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(400).json({ message: 'Invalid token.' });
//     }
// };

module.exports = authenticate;