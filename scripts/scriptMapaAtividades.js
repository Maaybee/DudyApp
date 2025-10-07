// scripts/scriptMapaAtividades.js

document.addEventListener('DOMContentLoaded', () => {
    const licoesContainer = document.getElementById('licoes-container');
    const btnVoltar = document.querySelector('.btn-voltar');

    // Mapeia cores para os botões
    const coresBotoes = ['cor-1', 'cor-2', 'cor-3', 'cor-4']; // Amarelo, Rosa, Verde, Amarelo (repetindo)

    // Percorre as lições definidas em DADOS_LICOES (do dadosLicoes.js)
    DADOS_LICOES.forEach((licao, index) => {
        const botao = document.createElement('button');
        
        // Adiciona as classes para estilo e posicionamento
        botao.className = `licao-ponto licao-posicao-${index + 1} ${coresBotoes[index % coresBotoes.length]}`;
        botao.dataset.licaoId = licao.id; // Guarda o ID da lição para redirecionamento

        const icone = document.createElement('img');
        icone.src = licao.icone; // Usa o ícone definido no dadosLicoes.js
        icone.alt = `Ícone da ${licao.titulo}`;
        icone.className = 'icone-licao';

        const titulo = document.createElement('p');
        titulo.textContent = licao.titulo;

        botao.appendChild(icone);
        botao.appendChild(titulo);

        // Adiciona evento de clique para redirecionar para a tela da atividade
        botao.addEventListener('click', () => {
            window.location.href = `atividade.html?licaoId=${licao.id}`;
        });

        licoesContainer.appendChild(botao);
    });

    // Funcionalidade do botão de voltar
    if (btnVoltar) {
        btnVoltar.addEventListener('click', () => {
            window.history.back(); // Volta para a página anterior
        });
    }
});