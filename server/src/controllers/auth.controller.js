const { generateToken } = require('../utils/jwt');
const { registerUser, loginUser, changePasswordUser, forgetPassword } = require('../services/auth.service');

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
        res.cookie('auth_token', token, { maxAge: process.env.HTTP_EXPRIES, httpOnly: true });

        res.status(201).json({
            message: result.message
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.getProfile = async (req, res) => {
    res.status(200).json({
        message: 'User profile',
        user: req.user
    });
};

exports.logout = async (req, res) => {
    res.clearCookie('auth_token');

    res.status(200).json({
        message: 'Logout successfully',
    });
}

exports.changePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body;

        const result = await changePasswordUser(req.user, password, newPassword);

        if (!result.ok)
            return res.status(400).json({
                message: result.message
            })

        res.status(201).json({
            message: result.message
        })
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ message: error.message });
    }
}

exports.forgetPassword = async (req, res) => {
    try {
        const { username, email, newPassword } = req.body;

        const result = await forgetPassword(username, email, newPassword);

        if (!result.ok)
            return res.status(400).json({
                message: result.message
            })

        res.status(201).json({
            message: result.message
        })
    } catch (error) {
        console.error('Forget password error:', error);
        res.status(500).json({ message: error.message });
    }
}