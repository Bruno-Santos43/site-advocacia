console.log('🚀 Iniciando servidor...');

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const config = require('./config');

// Configuração do servidor
const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = process.env.ALLOWED_ORIGINS ?
            process.env.ALLOWED_ORIGINS.split(',') :
            ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5500', 'http://127.0.0.1:5500'];

        // Permitir requests sem origin (como mobile apps)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Não permitido por CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '/')));

// Middleware de logging
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`📨 [${timestamp}] ${req.method} ${req.path} - IP: ${req.ip}`);
    next();
});

// Middleware de validação de entrada
const validateContactData = (req, res, next) => {
    const { name, email, phone, subject, message } = req.body;

    const errors = [];

    // Validação do nome
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
    }

    // Validação do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('E-mail inválido');
    }

    // Validação do assunto
    if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
        errors.push('Assunto deve ter pelo menos 3 caracteres');
    }

    // Validação da mensagem
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
        errors.push('Mensagem deve ter pelo menos 10 caracteres');
    }

    // Validação do telefone (opcional)
    if (phone && phone.trim()) {
        const phoneRegex = /^\(?(\d{2})\)?\s?9?\d{4}-?\d{4}$/;
        if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
            errors.push('Telefone inválido');
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            error: 'Dados inválidos',
            details: errors
        });
    }

    // Sanitização dos dados
    req.body.name = name.trim();
    req.body.email = email.trim().toLowerCase();
    req.body.subject = subject.trim();
    req.body.message = message.trim();
    if (phone) req.body.phone = phone.trim();

    next();
};

// Configuração do transporte de e-mail
const createTransporter = () => {
    return nodemailer.createTransport({
        service: config.email.service,
        host: config.email.host,
        port: config.email.port,
        secure: config.email.secure,
        auth: {
            user: config.email.user,
            pass: config.email.pass
        },
        tls: config.email.tls
    });
};

// Endpoint de contato
app.post('/contato', validateContactData, async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    console.log(`📧 Processando contato de: ${name} <${email}>`);

    try {
        const transporter = createTransporter();

        // Verificar conexão com o servidor de e-mail
        await transporter.verify();
        console.log('✅ Conexão com servidor de e-mail estabelecida');

        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: config.email.user,
            replyTo: email,
            subject: `Contato do Site - ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1e293b; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
                        📧 Nova Mensagem do Site
                    </h2>

                    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #334155; margin-top: 0;">Informações do Contato:</h3>
                        <p><strong>Nome:</strong> ${name}</p>
                        <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
                        ${phone ? `<p><strong>Telefone:</strong> ${phone}</p>` : ''}
                        <p><strong>Assunto:</strong> ${subject}</p>
                    </div>

                    <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                        <h3 style="color: #334155; margin-top: 0;">Mensagem:</h3>
                        <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
                    </div>

                    <div style="margin-top: 30px; padding: 20px; background: #3b82f6; color: white; border-radius: 8px;">
                        <p style="margin: 0; text-align: center;">
                            💼 Valeria Penha Advocacia<br>
                            <small>Recebido em: ${new Date().toLocaleString('pt-BR')}</small>
                        </p>
                    </div>
                </div>
            `,
            text: `
Contato do Site - Valeria Penha Advocacia

Informações do Contato:
Nome: ${name}
E-mail: ${email}
${phone ? `Telefone: ${phone}` : ''}
Assunto: ${subject}

Mensagem:
${message}

---
Recebido em: ${new Date().toLocaleString('pt-BR')}
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ E-mail enviado com sucesso:', info.messageId);

        res.status(200).json({
            success: true,
            message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
            messageId: info.messageId
        });

    } catch (error) {
        console.error('❌ Erro ao enviar e-mail:', error);

        // Determinar tipo de erro para resposta adequada
        let errorMessage = 'Erro interno do servidor';
        let statusCode = 500;

        if (error.code === 'EAUTH') {
            errorMessage = 'Erro de autenticação do e-mail';
            statusCode = 500;
        } else if (error.code === 'ECONNREFUSED') {
            errorMessage = 'Erro de conexão com servidor de e-mail';
            statusCode = 503;
        } else if (error.code === 'EENVELOPE') {
            errorMessage = 'Endereço de e-mail inválido';
            statusCode = 400;
        }

        res.status(statusCode).json({
            success: false,
            error: errorMessage,
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Endpoint de saúde/status
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Middleware de tratamento de erros global
app.use((error, req, res, next) => {
    console.error('❌ Erro não tratado:', error);

    if (error.message === 'Não permitido por CORS') {
        return res.status(403).json({
            success: false,
            error: 'Acesso negado por política CORS'
        });
    }

    res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
});

// Tratamento de rotas não encontradas - servir index.html para rotas desconhecidas (SPA fallback)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`🌐 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📧 E-mail configurado para: ${config.email.user}`);
    console.log(`🔧 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

// Tratamento de erros não capturados
process.on('uncaughtException', (error) => {
    console.error('❌ Erro não capturado:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Promessa rejeitada não tratada:', reason);
    process.exit(1);
});
