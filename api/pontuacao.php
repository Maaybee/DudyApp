<?php
/**
 * API para salvar a pontuação de uma atividade de história.
 * Recebe dados em JSON e os insere no banco de dados.
 */

// =================================================================
// CABEÇALHOS: Essenciais para a comunicação entre JS e PHP
// =================================================================

// Informa ao navegador que a resposta será no formato JSON.
header('Content-Type: application/json');
// Permite que seu JavaScript (rodando em qualquer origem) acesse esta API.
// IMPORTANTE: Em um site real (produção), troque '*' pelo seu domínio ex: 'https://www.seusite.com'.
header('Access-Control-Allow-Origin: *');
// Permite os métodos POST (para enviar dados) e OPTIONS (verificação do navegador).
header('Access-Control-Allow-Methods: POST, OPTIONS');
// Permite que o cabeçalho 'Content-Type' seja enviado na requisição.
header('Access-Control-Allow-Headers: Content-Type');

// O navegador envia uma requisição 'OPTIONS' antes do 'POST' para verificar permissões (CORS).
// Se for uma, apenas encerramos o script com sucesso.
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

// =================================================================
// CREDENCIAIS DO BANCO DE DADOS
// =================================================================

$servidor = "127.0.0.1";  // ou "localhost"
$usuario = "root";       // Usuário padrão do MySQL em ambiente de desenvolvimento
$senha = "1234";         // A senha que você me passou
$banco = "dudy";         // O nome do seu banco de dados

// =================================================================
// LÓGICA PRINCIPAL
// =================================================================

try {

    // 1. RECEBIMENTO DOS DADOS
    // Pega os dados JSON que o JavaScript enviou no corpo da requisição.
    $dados = json_decode(file_get_contents('php://input'), true);

    // 2. VALIDAÇÃO SIMPLES
    // Verifica se os dados necessários foram realmente enviados.
    if (!isset($dados['idEstudante']) || !isset($dados['idJogo']) || !isset($dados['pontuacao'])) {
        // Se faltar algum dado, envia um erro 400 (Bad Request).
        http_response_code(400);
        echo json_encode(['status' => 'erro', 'mensagem' => 'Dados incompletos recebidos.']);
        exit; // Para a execução do script.
    }

    // Atribui os dados recebidos a variáveis para facilitar o uso.
    $idEstudante = $dados['idEstudante'];
    $idJogo = $dados['idJogo'];
    $pontuacaoObtida = $dados['pontuacao'];



    // 3. CONEXÃO COM O BANCO DE DADOS (usando PDO para mais segurança)
    $conn = new PDO("mysql:host=$servidor;dbname=$banco;charset=utf8", $usuario, $senha);
    // Configura o PDO para lançar exceções em caso de erro, facilitando o tratamento.
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 4. PREPARAÇÃO E EXECUÇÃO DO COMANDO SQL
    // A query para inserir o novo registro de progresso.
    $sql = "INSERT INTO estudanteJogos (idEstudante, idJogos, pontuacaoObtida, dataRealizacao) VALUES (:idEstudante, :idJogo, :pontuacao, NOW())";

    // Prepara a query para evitar injeção de SQL (MUITO IMPORTANTE para segurança).
    $stmt = $conn->prepare($sql);

    // Executa a query, substituindo os placeholders (:idEstudante, etc.) pelos valores reais.
    $stmt->execute([
        ':idEstudante' => $idEstudante,
        ':idJogo' => $idJogo,
        ':pontuacao' => $pontuacaoObtida
    ]);

    // 5. RESPOSTA DE SUCESSO
    // Se chegou até aqui sem erros, a inserção foi bem-sucedida.
    http_response_code(200); // OK
    echo json_encode(['status' => 'sucesso', 'mensagem' => 'Pontuação salva com sucesso!']);

} catch (PDOException $e) {
    // 6. TRATAMENTO DE ERRO
    // Se qualquer coisa dentro do bloco 'try' falhar, o 'catch' é executado.
    http_response_code(500); // Erro Interno do Servidor
    // Envia uma mensagem de erro detalhada para o console do navegador (útil para depuração).
    echo json_encode(['status' => 'erro', 'mensagem' => 'Falha no servidor: ' . $e->getMessage()]);
}

// Fecha a conexão com o banco de dados.
$conn = null;
?>