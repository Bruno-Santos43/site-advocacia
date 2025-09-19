<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Incluir configuração SMTP
require_once 'smtp-config.php';

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Método não permitido'
    ]);
    exit;
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Dados JSON inválidos'
    ]);
    exit;
}

// Extract form data
$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$phone = $data['phone'] ?? '';
$subject = $data['subject'] ?? '';
$message = $data['message'] ?? '';

// Validation errors array
$errors = [];

// Validate name
if (empty($name) || !is_string($name) || strlen(trim($name)) < 2) {
    $errors[] = 'Nome deve ter pelo menos 2 caracteres';
}

// Validate email
$emailRegex = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';
if (empty($email) || !preg_match($emailRegex, $email)) {
    $errors[] = 'E-mail inválido';
}

// Validate subject
if (empty($subject) || !is_string($subject) || strlen(trim($subject)) < 3) {
    $errors[] = 'Assunto deve ter pelo menos 3 caracteres';
}

// Validate message
if (empty($message) || !is_string($message) || strlen(trim($message)) < 10) {
    $errors[] = 'Mensagem deve ter pelo menos 10 caracteres';
}

// Validate phone (optional)
if (!empty($phone)) {
    $phoneRegex = '/^\(?(\d{2})\)?\s?9?\d{4}-?\d{4}$/';
    $cleanPhone = preg_replace('/\s/', '', $phone);
    if (!preg_match($phoneRegex, $cleanPhone)) {
        $errors[] = 'Telefone deve estar no formato (XX) XXXXX-XXXX';
    }
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Dados inválidos',
        'details' => $errors
    ]);
    exit;
}

// Sanitize data
$name = trim($name);
$email = trim(strtolower($email));
$subject = trim($subject);
$message = trim($message);
if (!empty($phone)) {
    $phone = trim($phone);
}

// Prepare data for email
$formData = [
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'subject' => $subject,
    'message' => $message
];

// Send email using SMTP configuration
$result = SMTPConfig::sendContactEmail($formData);

if ($result['success']) {
    echo json_encode([
        'success' => true,
        'message' => 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
        'timestamp' => $result['timestamp']
    ]);
} else {
    error_log("Erro ao enviar e-mail para " . SMTPConfig::TO_EMAIL);
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Erro interno do servidor ao enviar e-mail'
    ]);
}
?>
