// Arquivo: scripts/scriptMenuAtividades.js

document.addEventListener('DOMContentLoaded', () => {
    const botoesDeAtividade = document.querySelectorAll('[data-atividade-id]');

    botoesDeAtividade.forEach(botao => {
        botao.addEventListener('click', () => {
            const id = botao.dataset.atividadeId;
            // Redireciona para a página de atividade, passando o ID na URL
            window.location.href = `atividade.html?id=${id}`;
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

});