const express = require('express');
const { register, login, getProfile } = require('../controllers/auth.controller');
const validateUser = require('../validation/user.validation');
const authenticate = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register',
    validateUser,
    register,
);
router.post('/login', login);
router.get('/profile', authenticate, getProfile);

module.exports = router;
