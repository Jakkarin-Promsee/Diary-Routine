const validateUser = (req, res, next) => {
    const { username, email, password } = req.body;
    const missingFields = [];

    // Check for missing fields
    if (!username) missingFields.push("username");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");

    // Return missing fields message
    if (missingFields.length > 0) {
        return res.status(400).json({
            success: false,
            message: `${missingFields.join(", ")} ${missingFields.length > 1 ? 'are' : 'is'} required`
        });
    }

    // Password length validation
    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: 'Password must be at least 6 characters'
        });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email format'
        });
    }

    next();
};

module.exports = validateUser;