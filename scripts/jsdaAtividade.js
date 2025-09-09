document.addEventListener('DOMContentLoaded', () => {
    // Pega o ID da atividade na URL (ex: atividade.html?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const atividadeId = parseInt(urlParams.get('id')); // Converte para número

    // Encontra a atividade no nosso "banco de dados"
    const atividadeAtual = DADOS_ATIVIDADES.find(a => a.id === atividadeId);

    if (!atividadeAtual) {
        alert("Atividade não encontrada!");
        return;
    }

    // Pega os containers do HTML
    const containerAssociacao = document.getElementById('exercicio-associacao');
    const containerTraducao = document.getElementById('exercicio-traducao');

    // **A MÁGICA ACONTECE AQUI**
    // Verifica o tipo da atividade e chama a função correta
    if (atividadeAtual.tipo === 'associacao_imagem') {
        containerAssociacao.style.display = 'block'; // Mostra este container
        carregarExercicioAssociacao(atividadeAtual);
    } else if (atividadeAtual.tipo === 'traducao') {
        containerTraducao.style.display = 'block'; // Mostra este container
        carregarExercicioTraducao(atividadeAtual);
    }
});

function carregarExercicioAssociacao(dados) {
    // Lógica para preencher a tela de associação de imagem
    document.getElementById('pergunta-associacao').textContent = dados.pergunta;
    const opcoesContainer = document.getElementById('opcoes-imagem');
    // ...cria os cards de imagem, etc.
    console.log("Carregando exercício de associação:", dados);
}

function carregarExercicioTraducao(dados) {
    // Lógica para preencher a tela de tradução
    document.getElementById('pergunta-traducao').textContent = dados.pergunta;
    // ...configura o botão de áudio, o input, etc.
    console.log("Carregando exercício de tradução:", dados);
}