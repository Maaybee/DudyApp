<?php
// Arquivo: api/cadastrar.php (MODIFICADO PARA ENVIAR E-MAIL)

// Importa as classes do PHPMailer para o namespace global
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Carrega o autoloader do Composer
require '../vendor/autoload.php';

// ... (seus cabeçalhos de CORS, etc.)
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
// ...

// Credenciais do banco de dados
$servidor = "127.0.0.1";
$usuario = "root";
$senha = "1234";
$banco = "dudy";

try {
    $conn = new PDO("mysql:host=$servidor;dbname=$banco;charset=utf8", $usuario, $senha);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $dados = json_decode(file_get_contents('php://input'), true);

    if (!$dados || !isset($dados['emailResponsavel']) || !isset($dados['senhaResponsavel']) || !isset($dados['nomeResponsavel'])) {
        throw new InvalidArgumentException('Dados do responsável incompletos.');
    }

    $emailResponsavel = $dados['emailResponsavel'];
    $senhaResponsavel = $dados['senhaResponsavel'];
    $nomeResponsavel = $dados['nomeResponsavel'];
    
    $senhaHash = password_hash($senhaResponsavel, PASSWORD_DEFAULT);
    
    // GERAÇÃO DO TOKEN DE CONFIRMAÇÃO
    $token = bin2hex(random_bytes(32)); // Gera um token seguro de 64 caracteres

    $conn->beginTransaction();

    // Insere o responsável com o token e email_confirmado = 0 (false)
    $sqlResponsavel = "INSERT INTO responsavel (email, nome, senha, token_confirmacao, email_confirmado) VALUES (:email, :nome, :senha, :token, 0)";
    $stmtResponsavel = $conn->prepare($sqlResponsavel);
    $stmtResponsavel->execute([
        ':email' => $emailResponsavel,
        ':nome'  => $nomeResponsavel,
        ':senha' => $senhaHash,
        ':token' => $token
    ]);
    
    $idResponsavelCriado = $conn->lastInsertId();

    $conn->commit();
    
    // ENVIO DO E-MAIL DE CONFIRMAÇÃO
    $mail = new PHPMailer(true);
    
    // Configurações do servidor (usando Gmail como exemplo)
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'seu.email@gmail.com'; // SEU E-MAIL DO GMAIL
    $mail->Password   = 'sua-senha-de-app-de-16-letras'; // SUA SENHA DE APP GERADA PELO GOOGLE
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;
    
    // Remetente e Destinatário
    $mail->setFrom('seu.email@gmail.com', 'DudyApp');
    $mail->addAddress($emailResponsavel, $nomeResponsavel);
    
    // Conteúdo do E-mail
    $mail->isHTML(true);
    $mail->Subject = 'Confirme seu cadastro no DudyApp!';
    // O link de confirmação aponta para o seu novo script 'confirmar.php'
    $linkConfirmacao = "http://localhost/dudy/api/confirmar.php?token=" . $token;
    $mail->Body    = "Olá $nomeResponsavel,<br><br>Obrigado por se cadastrar! Por favor, clique no link abaixo para confirmar seu e-mail:<br><a href='$linkConfirmacao'>Confirmar meu E-mail</a>";
    $mail->AltBody = "Olá $nomeResponsavel,\n\nObrigado por se cadastrar! Por favor, copie e cole o seguinte link no seu navegador para confirmar seu e-mail:\n$linkConfirmacao";

    $mail->send();

    echo json_encode([
        'status' => 'sucesso', 
        'mensagem' => 'Responsável cadastrado. Um e-mail de confirmação foi enviado.',
        'idResponsavel' => $idResponsavelCriado
    ]);

} catch (Exception $e) {
    // ... seu bloco catch para erros de BD e outros ...
    if(isset($conn) && $conn->inTransaction()){ $conn->rollBack(); }
    http_response_code(500);
    echo json_encode(['status' => 'erro', 'mensagem' => 'Erro: ' . $e->getMessage()]);
}

$conn = null;
?>