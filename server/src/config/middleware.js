const express = require('express');
const cookieParser = require("cookie-parser");

const configureMiddleware = (app) => {
    app.use(express.json());
    app.use(cookieParser());
}

module.exports = configureMiddleware;