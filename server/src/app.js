const express = require("express");
const path = require("path");
const configureSecurity = require("./config/security.js");
const configureMiddleware = require("./config/middleware.js");
const authRoutes = require('./routes/auth.routes.js');

const app = express();

// Load middlewares
configureMiddleware(app);
// configureSecurity(app);

// Serve static files
app.use("/static", express.static(path.join(__dirname, "public")));

// API Routes
app.use('/api/auth', authRoutes);

// 404 Middleware 
app.use((req, res, next) => {
    res.status(404).json({ message: 'Error 404 - Page Not Found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

module.exports = app;