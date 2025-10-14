// Arquivo: scripts/scriptMapaAtividades.js (VERSÃO DEFINITIVA)

document.addEventListener('DOMContentLoaded', () => {
    const licoesContainer = document.getElementById('licoes-container');
    const btnVoltar = document.querySelector('.btn-voltar');

    // --- POSIÇÕES DAS LIÇÕES (CENTRALIZADAS) ---
    // 'top' é a distância do topo (em %). Ajuste estes valores para alinhar com o seu SVG.
    // Se 4 lições devem aparecer na tela, a distância entre cada 'top' deve ser de ~20-25%.
    const posicoes = [
        { top: '15%', left: '50%' },   // Posição da Lição 1
        { top: '30%', left: '50%' },   // Posição da Lição 2
        { top: '45%', left: '50%' },   // Posição da Lição 3
        { top: '60%', left: '50%' },   // Posição da Lição 4
        { top: '75%', left: '50%' },   // Posição da Lição 5
        // ... adicione as posições para as suas 20 lições aqui
        // Ex: { top: '90%', left: '50%' },
        // Ex: { top: '105%', left: '50%' }, etc.
    ];

    const coresBotoes = ['cor-1', 'cor-2', 'cor-3', 'cor-4'];

    DADOS_LICOES.forEach((licao, index) => {
        if (!posicoes[index]) return; // Não cria botão se não houver posição definida

        const botao = document.createElement('button');
        botao.className = `licao-ponto ${coresBotoes[index % coresBotoes.length]}`;
        botao.dataset.licaoId = licao.id;

        // Aplica o estilo de posição exato
        const pos = posicoes[index];
        botao.style.top = pos.top;
        botao.style.left = pos.left;

        const icone = document.createElement('img');
        icone.src = licao.icone;
        icone.className = 'icone-licao';
        
        const titulo = document.createElement('p');
        titulo.textContent = licao.titulo;

        botao.appendChild(icone);
        botao.appendChild(titulo);

        botao.addEventListener('click', () => {
            window.location.href = `atividade.html?licaoId=${licao.id}`;
        });
        
        licoesContainer.appendChild(botao);
    });

    if (btnVoltar) {
        btnVoltar.addEventListener('click', () => { window.history.back(); });
    }
});