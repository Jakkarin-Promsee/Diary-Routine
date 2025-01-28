const express = require('express');
const cors = require('cors');
const errorMiddleware = require('../middlewares/error.middleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Placeholder route
app.get('/', (req, res) => {
    console.log("here");
    res.json({ message: 'API is running' });
});

app.get('/test', (req, res) => {
    throw new Error('Test error middle ware');
})

// Error handling middleware
app.use(errorMiddleware);



module.exports = app;