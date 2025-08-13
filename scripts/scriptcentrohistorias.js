// Arquivo: js/scriptcentrohistorias.js

document.addEventListener('DOMContentLoaded', () => {
    const containerAtividades = document.getElementById('Atividades');

    // Percorre cada história no nosso "banco de dados"
    DADOS_HISTORIAS.forEach(historia => {
        // Cria o botão para cada história
        const botao = document.createElement('button');
        botao.className = 'circle';

        // Define a ação de clique: ir para a página da história com o ID correto
        botao.onclick = () => {
            window.location.href = `historia.html?id=${historia.id}`;
        };

        // Cria a imagem e o título dentro do botão
        const imagem = document.createElement('img');
        imagem.src = historia.imagem;
        imagem.id = 'icone';

        const titulo = document.createElement('h2');
        titulo.textContent = historia.titulo;

        // Adiciona a imagem e o título ao botão
        botao.appendChild(imagem);
        botao.appendChild(titulo);

        // Adiciona o botão pronto ao container na tela
        containerAtividades.appendChild(botao);
    });
});