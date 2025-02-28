const User = require('../models/user.model');
const { hashPassword, comparePassword } = require('../utils/bcrypt');

exports.registerUser = async (username, email, password) => {
    // Check if user is exist
    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existingUser) {
        return {
            ok: false,
            message: existingUser.email === email
                ? 'Email already used'
                : 'Username already used'
        }
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    return {
        ok: true,
        message: 'User registered successfully',
        _id: user._id,
        username: user.username,
        email: user.email
    };
}

exports.loginUser = async (username, password) => {
    // Check if user is not exist
    const user = await User.findOne({ username });

    if (!user || !(await comparePassword(password, user.password)))
        return {
            ok: false,
            message: user
                ? "Wrong password"
                : "User doesn't found"
        }

    return {
        ok: true,
        message: 'Login successful and auth_token cookie set!',
        user
    }
}