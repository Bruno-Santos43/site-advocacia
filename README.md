# Valeria Penha Advocacia - Website Institucional

Website profissional para escritório de advocacia com sistema de contato funcional.

## 🚀 Funcionalidades

- **Website Responsivo**: Design moderno e adaptável para todos os dispositivos
- **Formulário de Contato**: Sistema completo de envio de e-mails
- **Validação de Dados**: Validação client-side e server-side
- **Notificações Toast**: Feedback visual para o usuário
- **API REST**: Backend Node.js com Express
- **Envio de E-mails**: Integração com Outlook via Nodemailer

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM ou Yarn
- Conta de e-mail Outlook configurada

## 🛠️ Instalação

1. **Clone o repositório** (se aplicável)
2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   Edite o arquivo `.env` com suas credenciais:
   ```env
   EMAIL_USER=seu-email@outlook.com.br
   EMAIL_PASS=sua-senha-app
   EMAIL_SERVICE=Outlook
   PORT=3000
   NODE_ENV=development
   ```

## ⚙️ Configuração do E-mail

### Para Outlook/Hotmail:

1. Acesse sua conta Outlook
2. Vá em **Configurações > Conta > Segurança**
3. Ative a **Autenticação de dois fatores**
4. Crie uma **Senha de aplicativo**:
   - Vá em **Configurações > Conta > Segurança > Senhas de aplicativo**
   - Gere uma nova senha
   - Use essa senha no campo `EMAIL_PASS` do arquivo `.env`

## 🚀 Como Executar

### Desenvolvimento:

```bash
# Iniciar o servidor backend
npm start
# ou
node server.js

# O servidor estará rodando em: http://localhost:3000
```

### Produção:

```bash
# Configurar NODE_ENV=production no .env
NODE_ENV=production node server.js
```

## 📡 Endpoints da API

### POST `/contato`

Envio de formulário de contato.

**Corpo da requisição:**

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 99999-9999",
  "subject": "Consulta jurídica",
  "message": "Mensagem detalhada..."
}
```

**Resposta de sucesso:**

```json
{
  "success": true,
  "message": "Mensagem enviada com sucesso!",
  "messageId": "abc123..."
}
```

### GET `/health`

Verificação de saúde do servidor.

**Resposta:**

```json
{
  "status": "OK",
  "timestamp": "2025-01-01T12:00:00.000Z",
  "uptime": 123.45,
  "environment": "development"
}
```

## 🧪 Testando o Formulário

### Via cURL:

```bash
curl -X POST http://localhost:3000/contato \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@teste.com",
    "phone": "(11) 99999-9999",
    "subject": "Consulta jurídica",
    "message": "Olá, gostaria de agendar uma consulta sobre direito trabalhista."
  }'
```

### Via Navegador:

1. Abra `http://localhost:3000` no navegador
2. Role até a seção "Contato"
3. Preencha o formulário
4. Clique em "Enviar Mensagem"
5. Aguarde a confirmação

## 📁 Estrutura do Projeto

```
SITE-ADVOCACIA/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript do frontend
├── server.js           # Servidor backend
├── package.json        # Dependências
├── .env               # Variáveis de ambiente
└── favicon.ico        # Ícone do site
```

## 🔧 Tecnologias Utilizadas

### Frontend:

- **HTML5**: Estrutura semântica
- **CSS3**: Design responsivo com variáveis CSS
- **JavaScript (ES6+)**: Interatividade e validação
- **Lucide Icons**: Biblioteca de ícones

### Backend:

- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web
- **Nodemailer**: Envio de e-mails
- **CORS**: Controle de acesso
- **Dotenv**: Gerenciamento de variáveis de ambiente

## 🛡️ Segurança

- **Validação de entrada**: Tanto no frontend quanto no backend
- **Sanitização de dados**: Limpeza de entradas do usuário
- **Rate limiting**: Controle de frequência de requisições
- **CORS configurado**: Controle de origens permitidas
- **Variáveis de ambiente**: Credenciais protegidas

## 📱 Responsividade

O website é totalmente responsivo e otimizado para:

- 📱 **Mobile**: Até 640px
- 📟 **Tablet**: 641px - 1024px
- 💻 **Desktop**: Acima de 1024px

## 🎨 Personalização

### Cores:

As cores podem ser personalizadas no arquivo `styles.css` através das variáveis CSS:

```css
:root {
  --primary: #1e293b;
  --accent: #3b82f6;
  --success: #22c55e;
  /* ... */
}
```

### Conteúdo:

- Edite `index.html` para alterar textos e imagens
- Atualize informações de contato no servidor
- Personalize o template de e-mail no `server.js`

## 🐛 Troubleshooting

### Problemas Comuns:

1. **Erro de autenticação de e-mail**:

   - Verifique se a senha de aplicativo está correta
   - Confirme se a autenticação de dois fatores está ativada

2. **CORS errors**:

   - Verifique se o frontend está rodando na porta correta
   - Atualize `ALLOWED_ORIGINS` no `.env`

3. **Formulário não envia**:

   - Verifique se o servidor está rodando
   - Confirme se todas as validações estão passando
   - Verifique o console do navegador para erros

4. **E-mails não chegam**:
   - Verifique a pasta de spam
   - Confirme as credenciais de e-mail
   - Teste com outro provedor de e-mail

## 📞 Suporte

Para suporte técnico ou dúvidas:

- **E-mail**: contato@advocaciasilva.com.br
- **Telefone**: (35) 99894-3460
- **WhatsApp**: [Link direto](https://wa.me/5535998943460)

## 📄 Licença

Este projeto é propriedade da Valeria Penha Advocacia.

---

**Desenvolvido com ❤️ para Valeria Penha Advocacia**
