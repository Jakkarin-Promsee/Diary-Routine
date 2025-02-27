const { generateToken } = require('../utils/jwt');
const { registerUser, loginUser } = require('../services/auth.service');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const result = await registerUser(username, email, password);

        if (!result.ok)
            return res.status(409).json({
                message: result.message
            });

        res.status(201).json({
            message: result.message,
            user: {
                _id: result._id,
                username: result.username,
                email: result.email
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const result = await loginUser(username, password);

        if (!result.ok)
            return res.status(400).json({
                message: result.message
            });

        // Send token to user
        const token = generateToken(result.user);

        // Send HTTP cookies
        res.cookie('auth_token', token, { maxAge: 900000, httpOnly: true });

        res.status(201).json({
            message: result.message
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProfile = async (req, res) => {
    res.json({
        message: 'User profile',
        user: req.user
    });
};