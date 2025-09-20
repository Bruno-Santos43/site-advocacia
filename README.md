# 🏛️ Site Advocacia Virtual

Site profissional para escritório de advocacia com formulário de contato funcional.

## 📋 Status do Projeto

✅ **FUNCIONAL** - Todas as correções aplicadas

### 🔧 Correções Realizadas:

- ✅ Criado arquivo `smtp-config.php` (estava faltando)
- ✅ Configurado SMTP para Gmail
- ✅ Email único configurado: `escritoriovirtual04@gmail.com`
- ✅ Senha de aplicativo configurada: `tsoopdkzivckgree`
- ✅ Formulário de contato funcionando
- ✅ Template HTML para emails
- ✅ Validação robusta de dados

## 🚀 Como Usar

### 1. Configurar Email (OBRIGATÓRIO)

Edite o arquivo `smtp-config.php`:

```php
// ✅ CONFIGURADO - Senha já inserida
define('SMTP_PASSWORD', 'tsoopdkzivckgree'); // ← SENHA DE APP DO GMAIL
```

**Como obter a senha de aplicativo do Gmail:**

1. Acesse [myaccount.google.com](https://myaccount.google.com)
2. Vá em Segurança > Verificação em duas etapas (ative se necessário)
3. Em "Como fazer login no Google", clique em "Senhas de app"
4. Selecione "Email" e "Outro (nome personalizado)"
5. Digite "Site Advocacia" e clique em "Gerar"
6. Use essa senha de 16 caracteres no arquivo (NÃO use sua senha normal)

### 2. Testar o Formulário

1. Abra `test-contact.html` no navegador
2. Preencha os dados
3. Clique em "Enviar Mensagem de Teste"
4. Verifique se o email chegou no Gmail: `escritoriovirtual04@gmail.com`

### 3. Usar no Site Principal

O formulário no `index.html` já está configurado e funcionando.

## 📁 Estrutura de Arquivos

```
SITE-ADVOCACIA/
├── index.html          # Página principal
├── styles.css          # Estilos
├── script.js           # JavaScript
├── contato.php         # Backend do formulário
├── smtp-config.php     # ✅ NOVO - Configuração SMTP
├── test-contact.html   # ✅ NOVO - Teste do formulário
├── TODO.md            # Documentação
├── assets/            # Recursos (ícones, fontes)
└── searce/            # Imagens do escritório
```

## 🔧 Configurações SMTP

**Gmail:**

- Host: `smtp.gmail.com`
- Porta: `587`
- Email: `escritoriovirtual04@gmail.com`
- Senha: **Senha de aplicativo** (não senha normal)
- **Email para receber contatos:** `escritoriovirtual04@gmail.com`
- **ATENÇÃO:** É necessário ativar a verificação em duas etapas no Gmail

## 🧪 Teste

1. **Teste local:** Use `test-contact.html`
2. **Teste produção:** Use o formulário no `index.html`
3. **Debug:** Verifique logs do servidor PHP

## 📧 Funcionalidades do Email

- ✅ Template HTML profissional
- ✅ Dados organizados em campos
- ✅ Reply-to configurado
- ✅ Tratamento de erros
- ✅ Logs de debug

## 🚨 Solução de Problemas

**Erro: "smtp-config.php não encontrado"**

- ✅ **RESOLVIDO** - Arquivo criado

**Erro: "Falha no envio do email"**

- Verifique a senha no `smtp-config.php`
- Certifique-se que o PHP está configurado para enviar emails
- Verifique se o Gmail permite SMTP (pode ser necessário ativar "Acesso a app menos seguro")
- Certifique-se que a verificação em duas etapas está ativa no Gmail

**Erro: "Dados inválidos"**

- Verifique se todos os campos obrigatórios estão preenchidos
- Email deve ter formato válido
- Mensagem deve ter pelo menos 10 caracteres

## 📞 Suporte

Se precisar de ajuda:

1. Verifique se a senha está correta no `smtp-config.php`
2. Teste usando `test-contact.html`
3. Verifique os logs do servidor

---

**✅ Projeto funcionando corretamente!**
