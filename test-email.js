// Teste simples de envio de e-mail
const nodemailer = require('nodemailer');
const config = require('./config');

async function testEmail() {
    console.log('🧪 Testando configuração de e-mail...');
    console.log('📧 E-mail:', config.email.user);
    console.log('🔧 Serviço:', config.email.service);

    try {
        // Criar transporte
        const transporter = nodemailer.createTransport({
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

        console.log('🔗 Verificando conexão...');

        // Verificar conexão
        await transporter.verify();
        console.log('✅ Conexão estabelecida com sucesso!');

        // Enviar e-mail de teste
        console.log('📤 Enviando e-mail de teste...');

        const mailOptions = {
            from: config.email.user,
            to: config.email.user,
            subject: 'Teste de Configuração - Valeria Penha Advocacia',
            html: `
                <h2>✅ Teste de E-mail Bem-Sucedido!</h2>
                <p>O formulário de contato está funcionando corretamente.</p>
                <p><strong>Data do teste:</strong> ${new Date().toLocaleString('pt-BR')}</p>
                <p><strong>Servidor:</strong> ${config.email.service}</p>
            `,
            text: `Teste de e-mail bem-sucedido! Data: ${new Date().toLocaleString('pt-BR')}`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ E-mail enviado com sucesso!');
        console.log('📧 Message ID:', info.messageId);
        console.log('🎉 Configuração funcionando perfeitamente!');

    } catch (error) {
        console.error('❌ Erro na configuração:', error.message);

        if (error.code === 'EAUTH') {
            console.error('🔐 Problema de autenticação - verifique a senha de aplicativo');
        } else if (error.code === 'ECONNREFUSED') {
            console.error('🌐 Problema de conexão - verifique as configurações de rede');
        } else {
            console.error('⚠️ Erro desconhecido:', error.code);
        }

        console.log('\n🔧 Sugestões:');
        console.log('1. Verifique se a senha de aplicativo está correta');
        console.log('2. Confirme se a verificação em duas etapas está ativa');
        console.log('3. Tente gerar uma nova senha de aplicativo');
        console.log('4. Verifique se a conta Gmail não está bloqueada');
    }
}

// Executar teste
testEmail();
