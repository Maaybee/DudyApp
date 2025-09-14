// Arquivo: scripts/scriptcentrohistorias.js
document.addEventListener('DOMContentLoaded', () => {
    const mapaContainer = document.getElementById('mapa-container');

    // Verifica se os dados das histórias existem
    if (typeof DADOS_HISTORIAS === 'undefined') {
        console.error('Os dados das histórias (DADOS_HISTORIAS) não foram encontrados.');
        return;
    }

    DADOS_HISTORIAS.forEach(historia => {
        // Cria o 'nó' do mapa que vai segurar o botão
        const nodeDiv = document.createElement('div');
        nodeDiv.className = 'historia-node';

        // Cria o botão da história
        const botao = document.createElement('button');
        botao.className = 'historia-button';
        
        // Cria a imagem
        const imagem = document.createElement('img');
        // Usa o caminho corrigido para o GitHub Pages
        imagem.src = `/DudyApp${historia.imagem.substring(2)}`; 
        
        // Cria o título
        const titulo = document.createElement('span');
        titulo.textContent = historia.titulo;

        // Adiciona a imagem e o título ao botão
        botao.appendChild(imagem);
        botao.appendChild(titulo);
        
        // Define a ação de clique para ir para a página da história
        botao.onclick = () => {
            window.location.href = `historia.html?id=${historia.id}`;
        };

        // Adiciona o botão ao 'nó' e o 'nó' ao container do mapa
        nodeDiv.appendChild(botao);
        mapaContainer.appendChild(nodeDiv);
    });
});