// Arquivo: scripts/scriptAtividade.js

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const atividadeId = parseInt(urlParams.get('id'));

    const atividadeAtual = DADOS_ATIVIDADES.find(a => a.id === atividadeId);

    if (!atividadeAtual) {
        document.body.innerHTML = "<h1>Erro: Atividade não encontrada.</h1>";
        return;
    }

    if (atividadeAtual.tipo === 'associacao_imagem') {
        document.getElementById('exercicio-associacao').style.display = 'block';
        carregarExercicioAssociacao(atividadeAtual);
    } else if (atividadeAtual.tipo === 'traducao') {
        document.getElementById('exercicio-traducao').style.display = 'block';
        carregarExercicioTraducao(atividadeAtual);
    }
});

function carregarExercicioAssociacao(dados) {
    const perguntaEl = document.getElementById('pergunta-associacao');
    const opcoesContainer = document.getElementById('opcoes-imagem');
    const btnVerificar = document.getElementById('btnVerificar');
    let respostaSelecionada = null;

    perguntaEl.innerHTML = dados.pergunta;
    opcoesContainer.innerHTML = ''; // Limpa opções anteriores

    dados.opcoes.forEach(opcao => {
        const card = document.createElement('div');
        card.className = 'card-imagem';
        card.dataset.resposta = opcao.id;
        
        const img = document.createElement('img');
        img.src = opcao.imagem;
        
        const p = document.createElement('p');
        p.textContent = opcao.texto;

        card.appendChild(img);
        card.appendChild(p);
        opcoesContainer.appendChild(card);

        card.addEventListener('click', () => {
            document.querySelectorAll('.card-imagem').forEach(c => c.classList.remove('selecionado'));
            card.classList.add('selecionado');
            respostaSelecionada = card.dataset.resposta;
            btnVerificar.disabled = false;
        });
    });

    btnVerificar.disabled = true;
    btnVerificar.onclick = () => {
        if (respostaSelecionada === dados.respostaCorreta) {
            alert('Correto!');
        } else {
            alert('Incorreto!');
        }
    };
}

function carregarExercicioTraducao(dados) {
    const perguntaEl = document.getElementById('pergunta-traducao');
    const btnAudio = document.getElementById('btnAudio');
    const inputResposta = document.getElementById('inputResposta');
    const btnVerificar = document.getElementById('btnVerificar');

    perguntaEl.textContent = dados.pergunta;
    btnAudio.querySelector('span').textContent = dados.palavraOriginal;
    
    btnAudio.onclick = () => {
        new Audio(dados.audio).play();
    };

    btnVerificar.onclick = () => {
        const respostaUsuario = inputResposta.value.trim().toLowerCase();
        const respostaCorreta = dados.respostaCorreta.trim().toLowerCase();
        if (respostaUsuario === respostaCorreta) {
            alert('Correto!');
        } else {
            alert(`Incorreto! A resposta era: ${dados.respostaCorreta}`);
        }
    };
}