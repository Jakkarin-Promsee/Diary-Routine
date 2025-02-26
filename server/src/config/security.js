const cors = require('cors');
const helmet = require('helmet');

const configureSecurity = (app) => {
    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true
    }));

    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                connectSrc: ["'self'", "https://drt-api.vercel.app"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", "data:"],
                frameAncestors: ["'self'"]
            }
        }
    }));
}

module.exports = configureSecurity;