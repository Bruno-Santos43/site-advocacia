# 📧 Configuração de E-mail - Valeria Penha Advocacia

## ⚠️ IMPORTANTE: Configuração do Gmail

Para que o formulário de contato funcione corretamente, você precisa configurar uma **Senha de Aplicativo** no Gmail.

### Passos para configurar:

1. **Acesse sua conta Google:**

   - Vá para: https://myaccount.google.com/
   - Faça login com: `advocaciavirtual.vp@gmail.com`

2. **Ative a verificação em duas etapas:**

   - Vá em "Segurança" no menu lateral
   - Procure por "Verificação em duas etapas"
   - Ative se ainda não estiver ativada

3. **Crie uma senha de aplicativo:**

   - Ainda em "Segurança", procure por "Senhas de app"
   - Clique em "Senhas de app"
   - Selecione "Mail" e "Outro (nome personalizado)"
   - Digite um nome como "Site Advocacia"
   - Copie a senha gerada (16 caracteres)

4. **Atualize o arquivo config.js:**
   - Substitua a senha atual pela senha de aplicativo gerada
   - **IMPORTANTE:** Remova os espaços da senha (deve ter 16 caracteres)

### Exemplo:

```javascript
pass: "abcd-efgh-ijkl-mnop"; // Senha de aplicativo (SEM espaços)
```

## 🔧 Configuração Atual

- **Serviço:** Gmail
- **E-mail:** escritoriovirtual04@gmail.com
- **Servidor SMTP:** smtp.gmail.com
- **Porta:** 587

## 🧪 Como Testar

1. Inicie o servidor: `node server.js`
2. Teste o endpoint: `http://localhost:3000/contato`
3. Verifique se recebe o e-mail no Gmail

## 📋 Status do Formulário

✅ Servidor funcionando
✅ Validação de dados
✅ Tratamento de erros
✅ Interface responsiva
⚠️ Aguardando configuração de senha de aplicativo

---

**Nota:** O Gmail bloqueia autenticação básica por padrão por questões de segurança. A senha de aplicativo é a solução recomendada pelo Google.
