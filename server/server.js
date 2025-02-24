require('dotenv').config();
const app = require('./src/app.js');
const connectDB = require('./src/config/db.js');

// Connect to Database
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;