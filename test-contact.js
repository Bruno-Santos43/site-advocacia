#!/usr/bin/env node

/**
 * Script de teste para o formulário de contato
 * Testa a funcionalidade do endpoint /contato
 */

const http = require('http');

const testData = {
    name: "João Silva Teste",
    email: "teste@exemplo.com",
    phone: "(11) 99999-9999",
    subject: "Teste de formulário",
    message: "Esta é uma mensagem de teste para verificar se o formulário de contato está funcionando corretamente."
};

const postData = JSON.stringify(testData);

const options = {
    hostname: '127.0.0.1',
    port: 3000,
    path: '/contato',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

console.log('🧪 Iniciando teste do formulário de contato...');
console.log('📤 Enviando dados de teste:', testData);

const req = http.request(options, (res) => {
    console.log(`📊 Status: ${res.statusCode}`);
    console.log(`📋 Headers:`, res.headers);

    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const response = JSON.parse(data);
            console.log('📨 Resposta do servidor:', response);

            if (response.success) {
                console.log('✅ Teste PASSED: Formulário funcionando corretamente!');
                console.log(`📧 E-mail enviado com ID: ${response.messageId}`);
            } else {
                console.log('❌ Teste FAILED: Erro no servidor');
                console.log('📝 Detalhes do erro:', response.details || response.error);
            }
        } catch (error) {
            console.log('❌ Teste FAILED: Resposta inválida do servidor');
            console.log('📄 Resposta bruta:', data);
        }
    });
});

req.on('error', (error) => {
    console.log('❌ Teste FAILED: Erro de conexão');
    console.log('🔍 Detalhes:', error.message);
    console.log('💡 Verifique se o servidor está rodando: npm start');
});

req.write(postData);
req.end();

console.log('⏳ Aguardando resposta do servidor...');
