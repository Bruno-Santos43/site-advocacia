<?php
/**
 * Configuração SMTP para envio de emails
 * Site de Advocacia Virtual
 */

// Configurações SMTP - CONFIGURADO PARA GMAIL
define('SMTP_HOST', 'smtp.gmail.com'); // Gmail SMTP
define('SMTP_PORT', 587); // Porta SMTP para Gmail
define('SMTP_USERNAME', 'escritoriovirtual04@gmail.com'); // Email Gmail
define('SMTP_PASSWORD', 'tsoopdkzivckgree'); // Senha de aplicativo Gmail
define('SMTP_ENCRYPTION', 'tls'); // TLS para Gmail

// Email do destinatário
define('TO_EMAIL', 'escritoriovirtual04@gmail.com');
define('TO_NAME', 'Advocacia Virtual');

// Email do remetente
define('FROM_EMAIL', 'escritoriovirtual04@gmail.com');
define('FROM_NAME', 'Advocacia Virtual - Contato');

/**
 * Classe para configuração e envio de emails
 */
class SMTPConfig {

    /**
     * Envia email de contato
     * @param array $formData Dados do formulário
     * @return array Resultado do envio
     */
    public static function sendContactEmail($formData) {
        $timestamp = date('Y-m-d H:i:s');

        try {
            // Criar o corpo do email
            $subject = "Novo contato do site: " . $formData['subject'];
            $message = self::buildEmailBody($formData, $timestamp);

            // Headers do email
            $headers = "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
            $headers .= "From: " . FROM_NAME . " <" . FROM_EMAIL . ">" . "\r\n";
            $headers .= "Reply-To: " . $formData['name'] . " <" . $formData['email'] . ">" . "\r\n";

            // Tentar enviar o email
            if (mail(TO_EMAIL, $subject, $message, $headers)) {
                return [
                    'success' => true,
                    'message' => 'Email enviado com sucesso',
                    'timestamp' => $timestamp
                ];
            } else {
                return [
                    'success' => false,
                    'error' => 'Falha no envio do email',
                    'timestamp' => $timestamp
                ];
            }

        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => 'Erro: ' . $e->getMessage(),
                'timestamp' => $timestamp
            ];
        }
    }

    /**
     * Monta o corpo do email em HTML
     * @param array $data Dados do formulário
     * @param string $timestamp Data/hora do envio
     * @return string HTML do email
     */
    private static function buildEmailBody($data, $timestamp) {
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <title>Novo Contato - Site Advocacia Virtual</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #1e293b; color: white; padding: 20px; text-align: center; }
                .content { background-color: #f8fafc; padding: 20px; }
                .field { margin-bottom: 15px; }
                .field-label { font-weight: bold; color: #1e293b; }
                .field-value { margin-top: 5px; }
                .footer { background-color: #64748b; color: white; padding: 15px; text-align: center; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>📧 Novo Contato - Site Advocacia Virtual</h1>
                    <p>Recebido em: {$timestamp}</p>
                </div>

                <div class='content'>
                    <div class='field'>
                        <div class='field-label'>👤 Nome:</div>
                        <div class='field-value'>{$data['name']}</div>
                    </div>

                    <div class='field'>
                        <div class='field-label'>📧 Email:</div>
                        <div class='field-value'>{$data['email']}</div>
                    </div>

                    " . (!empty($data['phone']) ? "
                    <div class='field'>
                        <div class='field-label'>📱 Telefone:</div>
                        <div class='field-value'>{$data['phone']}</div>
                    </div>
                    " : "") . "

                    <div class='field'>
                        <div class='field-label'>📝 Assunto:</div>
                        <div class='field-value'>{$data['subject']}</div>
                    </div>

                    <div class='field'>
                        <div class='field-label'>💬 Mensagem:</div>
                        <div class='field-value' style='background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #3b82f6;'>
                            " . nl2br(htmlspecialchars($data['message'])) . "
                        </div>
                    </div>
                </div>

                <div class='footer'>
                    <p>Este email foi enviado automaticamente pelo site Advocacia Virtual</p>
                    <p>Por favor, não responda diretamente a este email</p>
                </div>
            </div>
        </body>
        </html>
        ";
    }
}
?>
