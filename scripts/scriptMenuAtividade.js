// Arquivo: scripts/scriptMenuAtividades.js (VERSÃO FINAL)
document.addEventListener('DOMContentLoaded', () => {
    const containerLicoes = document.getElementById('Atividades'); 
    
    if (!containerLicoes) {
        console.error("O container com ID 'Atividades' não foi encontrado.");
        return;
    }

    // Cria os botões dinamicamente a partir das LIÇÕES
    DADOS_LICOES.forEach(licao => {
        const botao = document.createElement('button');
        botao.className = 'circle';
        botao.dataset.licaoId = licao.id;

        const imagem = document.createElement('img');
        imagem.src = licao.icone;
        imagem.className = 'icone';
        
        const titulo = document.createElement('h2');
        titulo.textContent = licao.titulo;

        botao.appendChild(imagem);
        botao.appendChild(titulo);

        botao.addEventListener('click', () => {
            window.location.href = `atividade.html?licaoId=${licao.id}`;
        });
        
        containerLicoes.appendChild(botao);
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
