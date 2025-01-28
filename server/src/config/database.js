const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully');

        // Define a schema and model
        const userSchema = new mongoose.Schema({
            name: String,
            email: { type: String, required: true }
        });
        const User = mongoose.model('gg', userSchema);

        // Example: Create a new user
        const newUser = new User({ name: "Alice/test", email: "alice@example.com" });
        await newUser.save();
        console.log("User saved:", newUser);


    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

module.exports = connectDB;