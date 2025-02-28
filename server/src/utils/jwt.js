const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ _id: user._id, name: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };