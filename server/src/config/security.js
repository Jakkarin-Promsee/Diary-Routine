const cors = require('cors');
const helmet = require('helmet');

const configureSecurity = (app) => {
    app.use(cors());
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