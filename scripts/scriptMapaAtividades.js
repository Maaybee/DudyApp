// Arquivo: scripts/scriptMapaAtividades.js

document.addEventListener('DOMContentLoaded', () => {
    const licoesContainer = document.getElementById('licoes-container');
    const btnVoltar = document.querySelector('.btn-voltar');

    // --- POSIÇÕES DAS LIÇÕES (AJUSTE AQUI!) ---
    // 'top': Distância do topo do mapa (em %). Aumente para descer.
    // 'left': Distância da esquerda (em %). 50% = centro.
    const posicoes = [
        // Valores de exemplo - VOCÊ PRECISA AJUSTAR ESTES VALORES
        { top: '10%', left: '50%' },   // Posição da Lição 1 (Foods) - Tente aumentar o top
        { top: '25%', left: '50%' },   // Posição da Lição 2 (Foods 2) - Tente aumentar o top
        { top: '40%', left: '50%' },   // Posição da Lição 3 (Foods 3) - Tente aumentar o top
        { top: '55%', left: '50%' },   // Posição da Lição 4 (Foods 4) - Tente aumentar o top
        // Adicione as posições para as outras 16 lições aqui...
        // Ex: { top: '70%', left: '40%' }, // Um pouco à esquerda
        // Ex: { top: '85%', left: '60%' }, // Um pouco à direita
    ];

    const coresBotoes = ['cor-1', 'cor-2', 'cor-3', 'cor-4']; // Cores dos botões

    // Cria os botões (O restante do código permanece o mesmo)
    DADOS_LICOES.forEach((licao, index) => {
        if (!posicoes[index]) return; 

        const botao = document.createElement('button');
        botao.className = `licao-ponto ${coresBotoes[index % coresBotoes.length]}`;
        botao.dataset.licaoId = licao.id;

        const pos = posicoes[index];
        botao.style.top = pos.top;
        botao.style.left = pos.left;
        botao.style.transform = 'translateX(-50%)'; // Mantém centralizado horizontalmente

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