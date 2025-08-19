<?php
// Arquivo: api/cadastrar_kid.php (NOVO)

ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

// Credenciais do banco de dados
$servidor = "127.0.0.1";
$usuario = "root";
$senha = "1234"; // Sua senha
$banco = "dudy";

try {
    $conn = new PDO("mysql:host=$servidor;dbname=$banco;charset=utf8", $usuario, $senha);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $dados = json_decode(file_get_contents('php://input'), true);

    // Validação dos dados da CRIANÇA
    if (!$dados || !isset($dados['nomeCrianca']) || !isset($dados['dataNascCrianca']) || !isset($dados['idResponsavel'])) {
        throw new InvalidArgumentException('Dados da criança ou do responsável incompletos.');
    }

    $nomeCrianca = $dados['nomeCrianca'];
    $dataNascCrianca = $dados['dataNascCrianca'];
    $idResponsavel = $dados['idResponsavel'];

    // Insere na tabela 'estudante'
    $sqlEstudante = "INSERT INTO estudante (nome, dataNasc, idResponsavel, experiencia) VALUES (:nome, :dataNasc, :idResponsavel, 0)";
    $stmtEstudante = $conn->prepare($sqlEstudante);
    $stmtEstudante->execute([
        ':nome'         => $nomeCrianca,
        ':dataNasc'     => $dataNascCrianca,
        ':idResponsavel'=> $idResponsavel
    ]);

    // Envia uma resposta de sucesso
    echo json_encode(['status' => 'sucesso', 'mensagem' => 'Criança cadastrada com sucesso!']);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'erro', 'mensagem' => 'Erro no servidor: ' . $e->getMessage()]);
}

$conn = null;
?>