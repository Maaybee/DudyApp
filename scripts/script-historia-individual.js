document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DA PÁGINA ---
    const headerImg = document.querySelector('.header .books');
    const headerTitulo = document.querySelector('.header h4');
    const personagensSpan = document.querySelector('.personagens span');
    const textoContainer = document.querySelector('.texto');
    const quizContainer = document.querySelector('.quiz-container');
    const perguntaEl = document.getElementById('pergunta');
    const botoesContainer = document.getElementById('botoes-container');
    const audioPlayer = document.getElementById('player');
    
    // --- POP-UP DE SAÍDA ---
    const sairBtnPrincipal = document.getElementById('sair');
    const popupOverlay = document.getElementById('popupOverlay');
    const btnSairPopup = document.getElementById('btnSair');
    const btnVoltarPopup = document = document.getElementById('btnVoltar');

    // --- VARIÁVEIS DE ESTADO ---
    let linhaAtual = 0;
    let historia; // Para guardar os dados da história atual

    // --- INICIALIZAÇÃO ---
    function iniciarHistoria() {
        // 1. Pegar o ID da URL e encontrar a história correspondente
        const urlParams = new URLSearchParams(window.location.search);
        const historiaId = urlParams.get('id');

        if (!historiaId) {
            document.body.innerHTML = '<h1>Erro: História não encontrada.</h1>';
            return;
        }

        historia = DADOS_HISTORIAS.find(h => h.id === historiaId);

        if (!historia) {
            document.body.innerHTML = `<h1>Erro: História com ID "${historiaId}" não encontrada.</h1>`;
            return;
        }

        // 2. Preencher as informações iniciais da página
        document.title = `DudyApp - ${historia.titulo}`;
        headerImg.src = historia.icone_header;
        headerTitulo.textContent = historia.titulo;
        personagensSpan.textContent = historia.personagens;
        
        quizContainer.style.display = 'none'; // Esconde o quiz inicialmente
        mostrarLinha(linhaAtual);
    }

    // --- LÓGICA DO DIÁLOGO (Corrigida) ---
    function mostrarLinha(indice) {
        if (indice >= historia.dialogo.length) {
            iniciarQuiz(); // Se o diálogo acabou, começa o quiz
            return;
        }
        
        linhaAtual = indice;
        const item = historia.dialogo[indice];

        textoContainer.innerHTML = '';

        const p = document.createElement('p');
        if (item.tipo === 'acao') {
            p.textContent = `(${item.texto})`;
            p.style.fontStyle = 'italic';
            p.style.textAlign = 'center';
        } else {
            p.textContent = `${item.personagem}: ${item.fala}`;
            if (item.audio) {
                audioPlayer.src = `../assets/audio/${item.audio}.mp3`;
                audioPlayer.play();
            }
        }
        textoContainer.appendChild(p);

        const navContainer = document.createElement('div');
        navContainer.className = 'dialogo-nav';

        if (linhaAtual > 0) {
            const btnAnterior = document.createElement('button');
            btnAnterior.textContent = 'Anterior';
            btnAnterior.onclick = () => mostrarLinha(linhaAtual - 1);
            navContainer.appendChild(btnAnterior);
        }

        const btnProximo = document.createElement('button');
        btnProximo.textContent = 'Próximo';
        btnProximo.onclick = () => mostrarLinha(linhaAtual + 1);
        navContainer.appendChild(btnProximo);

        textoContainer.appendChild(navContainer);
    }

    // --- LÓGICA DO QUIZ (Corrigida para mostrar tudo de uma vez) ---
    function iniciarQuiz() {
        textoContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        botoesContainer.innerHTML = '';
        
        historia.quiz.perguntas.forEach((pergunta, indicePergunta) => {
            const perguntaDiv = document.createElement('div');
            perguntaDiv.className = 'quiz-pergunta';
            perguntaDiv.style.marginBottom = '20px';

            const perguntaTitulo = document.createElement('h4');
            perguntaTitulo.textContent = `Pergunta ${indicePergunta + 1}: ${pergunta}`;
            perguntaDiv.appendChild(perguntaTitulo);

            const botoesPerguntaDiv = document.createElement('div');
            botoesPerguntaDiv.className = 'quiz-alternativas buttons';

            historia.quiz.alternativas[indicePergunta].forEach(alternativa => {
                const botao = document.createElement('button');
                botao.textContent = alternativa;
                botao.onclick = (e) => checarResposta(e.target, indicePergunta);
                botoesPerguntaDiv.appendChild(botao);
            });

            perguntaDiv.appendChild(botoesPerguntaDiv);
            botoesContainer.appendChild(perguntaDiv);
        });

        const btnFinalizar = document.createElement('button');
        btnFinalizar.textContent = 'Finalizar Quiz';
        btnFinalizar.id = 'btnFinalizar';
        btnFinalizar.style.marginTop = '20px';
        btnFinalizar.onclick = finalizarQuiz;
        botoesContainer.appendChild(btnFinalizar);
    }

    function checarResposta(botaoSelecionado, indicePergunta) {
        const respostaCorreta = historia.quiz.respostasCorretas[indicePergunta];
        const respostaDoUsuario = botaoSelecionado.textContent;
        const containerBotoes = botaoSelecionado.parentElement;

        containerBotoes.querySelectorAll('button').forEach(b => {
            b.disabled = true;
            if (b.textContent === respostaCorreta) {
                b.style.backgroundColor = '#90EE90';
            }
        });

        if (respostaDoUsuario !== respostaCorreta) {
            botaoSelecionado.style.backgroundColor = '#FFB6C1';
        }
    }

    function finalizarQuiz() {
        let pontuacaoFinal = 0;
        const perguntasRespondidas = botoesContainer.querySelectorAll('.quiz-pergunta');
        perguntasRespondidas.forEach((perguntaDiv, indice) => {
            const botoes = perguntaDiv.querySelectorAll('button');
            const respostaCorreta = historia.quiz.respostasCorretas[indice];
            botoes.forEach(botao => {
                if (botao.textContent === respostaCorreta && botao.style.backgroundColor === 'rgb(144, 238, 144)') {
                    pontuacaoFinal++;
                }
            });
        });

        quizContainer.innerHTML = `
            <h2>Quiz Finalizado!</h2>
            <h3>Sua pontuação: ${pontuacaoFinal} de ${historia.quiz.perguntas.length}</h3>
            <button onclick="window.location.href='../telas/centrohistorias.html'">Voltar para Histórias</button>
        `;
    }

    // --- LÓGICA DO POP-UP ---
    sairBtnPrincipal.addEventListener('click', () => {
        popupOverlay.style.display = 'flex';
    });
    btnSairPopup.addEventListener('click', () => {
        window.location.href = '../telas/centrohistorias.html';
    });
    btnVoltarPopup.addEventListener('click', () => {
        popupOverlay.style.display = 'none';
    });

    // Inicia a aplicação
    iniciarHistoria();
});