require('dotenv').config();
const app = require('./src/config/server');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 3000;

// Connect to database and start server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection failed:', error);
        process.exit(1);
    });