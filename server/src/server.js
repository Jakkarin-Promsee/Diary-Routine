require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const path = require("path");

const authRoutes = require('./routes/auth.routes.js');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use('/api/auth', authRoutes);

// 404 Middleware 
app.use((req, res, next) => {
  res.status(404).json({ message: 'Error 404 - Page Not Found' });
});

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));