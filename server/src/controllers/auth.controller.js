const User = require('../models/user.model');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
    try {

        return res.status(401).json({ message: 'have not provide the body' })

        const { username, email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await comparePassword(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user);
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProfile = async (req, res) => {
    res.json({ message: 'User profile', user: req.user });
};