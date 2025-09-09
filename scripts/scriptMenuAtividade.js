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

    const btnSair = document.getElementById('sair');
    if (btnSair) {
        btnSair.addEventListener('click', () => {
            // Altere para o link da sua página principal
            window.location.href = 'telaPratica.html'; 
        });
    }
});