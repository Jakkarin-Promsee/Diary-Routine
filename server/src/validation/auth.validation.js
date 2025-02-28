const setValidate = (method) => {
    const check = { username: false, email: false, password: false, newPassword: false };

    if (method === "register") {
        check.username = true;
        check.email = true;
        check.password = true;
    } else if (method === "login") {
        check.username = true;
        check.password = true;
    } else if (method == "change-password") {
        check.password = true;
        check.newPassword = true;
    }
    else if (method === "forget-password") {
        check.email = true;
        check.newPassword = true;
    }

    return check;
}

const validateUser = (method) => {
    return (req, res, next) => {
        const { username, email, password, newPassword } = req.body;
        const missingFields = [];
        const check = setValidate(method);

        // Check for missing fields
        if (check.username && !username) missingFields.push("username");
        if (check.email && !email) missingFields.push("email");
        if (check.password && !password) missingFields.push("password");
        if (check.newPassword && !newPassword) missingFields.push("new password");

        // Return missing fields message
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `${missingFields.join(", ")} ${missingFields.length > 1 ? 'are' : 'is'} required`
            });
        }

        // Password length validation
        if (check.password && password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters'
            });
        }

        // New Password length validation
        if (check.newPassword && newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'New Password must be at least 6 characters'
            });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (check.email && !emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        next();
    };
};

module.exports = validateUser;