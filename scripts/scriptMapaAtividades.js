// scripts/scriptMapaAtividades.js (MANTÉM A VERSÃO ANTERIOR)

document.addEventListener('DOMContentLoaded', () => {
    const licoesContainer = document.getElementById('licoes-container');
    const btnVoltar = document.querySelector('.btn-voltar');

    const coresBotoes = ['cor-1', 'cor-2', 'cor-3', 'cor-4', 'cor-1', 'cor-2']; 

    DADOS_LICOES.forEach((licao, index) => {
        const botao = document.createElement('button');
        
        // Adiciona as classes para estilo e cor
        // Remova a classe 'licao-pos-${index}' se ainda estiver lá do teste anterior
        botao.className = `licao-ponto ${coresBotoes[index % coresBotoes.length]}`; 
        botao.dataset.licaoId = licao.id; 

        const icone = document.createElement('img');
        icone.src = licao.icone;
        icone.alt = `Ícone da ${licao.titulo}`;
        icone.className = 'icone-licao';

        const titulo = document.createElement('p');
        titulo.textContent = licao.titulo;

        botao.appendChild(icone);
        botao.appendChild(titulo);

        botao.addEventListener('click', () => {
            localStorage.setItem('licaoAtivaId', licao.id);
            window.location.href = `telaAtividade.html?licaoId=${licao.id}`;
        });

        licoesContainer.appendChild(botao);
    });

    if (btnVoltar) {
        btnVoltar.addEventListener('click', () => {
            window.history.back();
        });
    }
});