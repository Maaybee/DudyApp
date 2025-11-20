// Arquivo: js/scriptcentrohistorias.js

document.addEventListener('DOMContentLoaded', () => {
    const containerAtividades = document.getElementById('Atividades');

    // Verifica se a lista de histórias existe para não dar erro
    if (typeof DADOS_HISTORIAS !== 'undefined') {
        
        // Percorre cada história no nosso "banco de dados"
        DADOS_HISTORIAS.forEach(historia => {

            // 1. Cria a DIV (o quadrado branco)
            const div = document.createElement('div');
            div.className = 'quadBranco';
            
            // 2. Cria o BOTÃO
            const botao = document.createElement('button');
            botao.className = 'circle';

            // 3. Define a ação de clique
            botao.onclick = () => {
                window.location.href = `../telas/historia.html?id=${historia.id}`;
            };

            // 4. Cria a imagem e o título
            const imagem = document.createElement('img');
            imagem.src = historia.imagem;
            imagem.id = 'icone'; 

            const titulo = document.createElement('h2');
            titulo.textContent = historia.titulo;
            
            // --- ALTERAÇÃO AQUI ---
            // Usa a propriedade color_text do cod1 para mudar a cor deste título
            if (historia.color_text) {
                titulo.style.color = historia.color_text;
            }
            // ----------------------

            // 5. Montagem
            botao.appendChild(imagem);
            div.appendChild(botao);
            div.appendChild(titulo);

            // 6. Adiciona na tela
            containerAtividades.appendChild(div);
        });

    } else {
        console.error("A variável DADOS_HISTORIAS não foi encontrada.");
    }
});

// --- Lógica do botão de Sair ---
const sairImg = document.getElementById('sair');

if (sairImg) {
    sairImg.addEventListener('click', function() {
        window.location.href = '../telas/telaHome.html';
    });
} else {
    console.warn("Elemento com ID 'sair' não encontrado.");
}
