const express = require('express');
const rateLimit = require("express-rate-limit");
const { register, login, getProfile, logout, changePassword, forgetPassword } = require('../controllers/auth.controller');
const validateUser = require('../validation/auth.validation');
const authenticate = require('../middleware/auth.middleware');

// Create a log in rate limiter (security)
const acessUserLimiter = rateLimit({
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

router.post('/register', validateUser("register"), authLimiter, register);
router.post('/login', validateUser("login"), acessUserLimiter, login);
router.get('/profile', authenticate, authLimiter, getProfile);
router.get('/logout', authLimiter, logout);
router.patch('/change-password', authenticate, validateUser("change-password"), acessUserLimiter, changePassword);
router.patch('/forget-password', validateUser("forget-password"), acessUserLimiter, forgetPassword);

module.exports = router;
