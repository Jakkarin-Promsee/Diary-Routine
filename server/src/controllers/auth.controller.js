const User = require('../models/user.model');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user is exist
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(409).json({
                message: existingUser.email === email
                    ? 'Email already used'
                    : 'Username already used'
            });
        }

        // Create new users
        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user is not exist
        const user = await User.findOne({ username });
        if (!user || !(await comparePassword(password, user.password))) {
            return res.status(400).json({
                message: user
                    ? "Wrong password"
                    : "User doesn't found"
            });
        }

        // Send token to user
        const token = generateToken(user);

        // Set a cookie named 'sessionId' with value '123456'
        res.cookie('auth_token', token, { maxAge: 900000, httpOnly: true });

        res.status(201).json({
            message: 'Login successful and auth_token cookie set!'
        });
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: error.message });
    }
};

exports.getProfile = async (req, res) => {
    res.json({ message: 'User profile', user: req.user });
};