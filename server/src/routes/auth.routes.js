const express = require('express');
const rateLimit = require("express-rate-limit");
const { register, login, getProfile, logout } = require('../controllers/auth.controller');
const validateUser = require('../validation/auth.validation');
const authenticate = require('../middleware/auth.middleware');

// Create a log in rate limiter (security)
const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10,
    message: {
        success: false,
        message: "Too many requests, please try again later."
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Create a log in auth limiter (prevent spam)
const authLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 20,
    message: {
        success: false,
        message: "Too many requests, please try again later."
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const router = express.Router();

router.post('/register', authLimiter, validateUser("register"), register);
router.post('/login', loginLimiter, validateUser("login"), login);
router.get('/profile', authLimiter, authenticate, getProfile);
router.get('/logout', logout);

module.exports = router;
