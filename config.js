require('dotenv').config();

// Configurações do servidor
const config = {
    email: {
        service: process.env.EMAIL_SERVICE || 'gmail',
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASS || '',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        tls: {
            rejectUnauthorized: false
        }
    },
    server: {
        port: process.env.PORT || 3000,
        allowedOrigins: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [
            'http://localhost:3000',
            'http://127.0.0.1:3000',
            'http://localhost:5500',
            'http://127.0.0.1:5500'
        ]
    }
};

module.exports = config;
