const express = require('express');
const { register, login, getProfile } = require('../controllers/auth.controller');
const validateUser = require('../validation/auth.validation');
const authenticate = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', validateUser, register);
router.post('/login', validateUser, login);
router.get('/profile', authenticate, getProfile);

module.exports = router;
