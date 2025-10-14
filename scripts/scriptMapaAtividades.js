// Arquivo: scripts/scriptMapaAtividades.js (VERSÃO DEFINITIVA)

document.addEventListener('DOMContentLoaded', () => {
    const licoesContainer = document.getElementById('licoes-container');
    const btnVoltar = document.querySelector('.btn-voltar');

    // --- POSIÇÕES DAS LIÇÕES ---
    // Cada objeto {top, left} define a posição de uma lição no mapa.
    // 'top' é a distância do topo (em %), 'left' é a distância da esquerda (em %).
    // Você vai precisar ajustar esses valores para alinhar com o seu SVG.
    const posicoes = [
        { top: '8%',  left: '50%' },   // Posição da Lição 1
        { top: '22%', left: '50%' },   // Posição da Lição 2
        { top: '36%', left: '50%' },   // Posição da Lição 3
        { top: '50%', left: '50%' },   // Posição da Lição 4
        { top: '64%', left: '50%' },   // Posição da Lição 5
        { top: '78%', left: '50%' },   // Posição da Lição 6
        { top: '92%', left: '50%' }    // Posição da Lição 7
        // Adicione mais posições para suas 20 lições...
    ];

    const coresBotoes = ['cor-1', 'cor-2', 'cor-3', 'cor-4'];

    DADOS_LICOES.forEach((licao, index) => {
        if (!posicoes[index]) return; // Não cria botão se não houver posição definida

        const botao = document.createElement('button');
        botao.className = `licao-ponto ${coresBotoes[index % coresBotoes.length]}`;
        botao.dataset.licaoId = licao.id;

        // Aplica o estilo de posição
        const pos = posicoes[index];
        botao.style.top = pos.top;
        botao.style.left = pos.left;
        botao.style.transform = 'translateX(-50%)'; // Truque para centralizar horizontalmente

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

});
const sairImg = document.getElementById('sair');

if (sairImg) {
    sairImg.addEventListener('click', function() {
        // Esta função só será executada quando a imagem 'sair' for clicada
        window.location.href = '../telas/telaHome.html';
    });
} else {
    console.warn("Elemento com ID 'sair' não encontrado. O botão de saída do pop-up pode não funcionar.");
}