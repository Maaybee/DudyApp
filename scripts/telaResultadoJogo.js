const elementoTextoPontuacao = document.getElementById('variavel_acertos');
const elementoTextoAcertos = document.getElementById('variavel_pontuacao'); // Corrigido para pegar o h1

// Adiciona um "ouvinte" que espera o HTML da página ser totalmente carregado.
document.addEventListener('DOMContentLoaded', () => {

    // Pega os parâmetros da URL (ex: ?pontuacao=100&acertos=8)
    const params = new URLSearchParams(window.location.search);
    
    // Pega o valor específico do parâmetro 'pontuacao'
    const pontuacaoRecebida = params.get('pontuacao');

    // Verifica se o parâmetro 'pontuacao' foi encontrado na URL
    if (pontuacaoRecebida !== null) {
        // Se foi encontrado, atualiza o texto do elemento na tela.
        // Usar textContent é mais seguro e performático para inserir apenas texto.
        elementoTextoPontuacao.textContent = pontuacaoRecebida;
    } else {
        // Se não encontrou, exibe um valor padrão.
        elementoTextoPontuacao.textContent = 'N/A';
    }

    elementoTextoAcertos.textContent = pontuacaoRecebida*20;

});

// Adiciona o evento de clique ao botão 'SAIR'
document.getElementById('voltar').addEventListener('click', function() { 
    // Chama a função console.log corretamente
    console.log('Botão clicado, voltando para o home');
    // Redireciona o usuário
    window.location.href = '../telas/telaHome.html';

});
