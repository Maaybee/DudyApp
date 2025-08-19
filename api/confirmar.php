<?php
// Arquivo: api/confirmar.php (NOVO)

// Credenciais do banco de dados
$servidor = "127.0.0.1";
$usuario = "root";
$senha = "1234";
$banco = "dudy";

// Verifica se o token foi passado na URL
if (isset($_GET['token']) && !empty($_GET['token'])) {
    $token = $_GET['token'];
    
    try {
        $conn = new PDO("mysql:host=$servidor;dbname=$banco;charset=utf8", $usuario, $senha);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Procura pelo usuário com o token fornecido que ainda não foi confirmado
        $sql = "SELECT idResponsavel FROM responsavel WHERE token_confirmacao = :token AND email_confirmado = 0";
        $stmt = $conn->prepare($sql);
        $stmt->execute([':token' => $token]);
        
        $responsavel = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Se encontrou um usuário
        if ($responsavel) {
            // Atualiza o status para confirmado e limpa o token
            $sqlUpdate = "UPDATE responsavel SET email_confirmado = 1, token_confirmacao = NULL WHERE idResponsavel = :id";
            $stmtUpdate = $conn->prepare($sqlUpdate);
            $stmtUpdate->execute([':id' => $responsavel['idResponsavel']]);
            
            echo "<h1>E-mail confirmado com sucesso!</h1>";
            echo "<p>Sua conta foi ativada. Agora você já pode fazer o login.</p>";
            // Você pode adicionar um link para a página de login aqui
            // echo '<a href="http://localhost/dudy/telaLogin.html">Ir para o Login</a>';

        } else {
            // Se não encontrou (token inválido ou já usado)
            echo "<h1>Link de confirmação inválido ou expirado.</h1>";
            echo "<p>Este link pode já ter sido usado ou não é válido. Por favor, tente fazer o login ou se cadastrar novamente.</p>";
        }

    } catch (PDOException $e) {
        echo "<h1>Erro!</h1>";
        echo "<p>Ocorreu um erro com o banco de dados. Por favor, tente mais tarde.</p>";
        // Em produção, você logaria o erro em vez de exibi-lo: error_log($e->getMessage());
    }

} else {
    // Se nenhum token foi fornecido na URL
    echo "<h1>Acesso Inválido.</h1>";
    echo "<p>Nenhum token de confirmação foi fornecido.</p>";
}

$conn = null;
?>