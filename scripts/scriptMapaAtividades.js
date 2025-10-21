// Arquivo: scripts/scriptMapaAtividades.js (MANTENHA A VERSÃO ANTERIOR)

document.addEventListener('DOMContentLoaded', () => {
    const licoesContainer = document.getElementById('licoes-container');
    const btnVoltar = document.querySelector('.btn-voltar');

    // --- POSIÇÕES DAS LIÇÕES ---
    // Ajuste 'top' e 'left' para alinhar com seu SVG combinado.
    // 'top' agora é relativo à altura TOTAL das duas imagens juntas.
    const posicoes = [
        { top: '10%', left: '50%' },   // Posição da Lição 1
        { top: '25%', left: '50%' },   // Posição da Lição 2
        { top: '40%', left: '50%' },   // Posição da Lição 3
        { top: '55%', left: '50%' },   // Posição da Lição 4
        { top: '70%', left: '50%' },   // Posição da Lição 5
        // ... continue ajustando e adicionando ...
    ];

    const coresBotoes = ['cor-1', 'cor-2', 'cor-3', 'cor-4'];

    DADOS_LICOES.forEach((licao, index) => {
        if (!posicoes[index]) return; 

        const botao = document.createElement('button');
        botao.className = `licao-ponto ${coresBotoes[index % coresBotoes.length]}`;
        botao.dataset.licaoId = licao.id;

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