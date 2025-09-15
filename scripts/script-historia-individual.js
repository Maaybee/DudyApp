document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DA PÁGINA ---
    const header = document.querySelector('.header'); // Adicionado
    const personagens = document.querySelector('.personagens'); // Adicionado
    const textoContainer = document.querySelector('.texto');
    const quizContainer = document.querySelector('.quiz-container');
    const botoesContainer = document.getElementById('botoes-container');
    const audioPlayer = document.getElementById('player');
    
    // --- ELEMENTOS DO MODAL E POP-UP ---
    const historiaConcluidaModal = document.getElementById('historia-concluida-modal');
    const sairBtnPrincipal = document.getElementById('sair');
    const popupOverlay = document.getElementById('popupOverlay');
    
    // --- VARIÁVEIS DE ESTADO ---
    let linhaAtual = 0;
    let historia;

    // --- LÓGICA DE INÍCIO (com botão de início) ---
    // (Mantendo a lógica do botão de início que já tinhamos feito)
    const telaInicioOverlay = document.getElementById('tela-inicio-overlay');
    const btnComecarHistoria = document.getElementById('btnComecarHistoria');

    if (btnComecarHistoria) {
        btnComecarHistoria.addEventListener('click', () => {
            telaInicioOverlay.style.display = 'none';
            audioPlayer.play().catch(() => {});
            audioPlayer.pause();
            iniciarHistoria();
        });
    } else {
        // Caso a tela de início não exista, carrega a história diretamente
        iniciarHistoria();
    }
    
    // --- INICIALIZAÇÃO DA HISTÓRIA ---
    function iniciarHistoria() {
        const urlParams = new URLSearchParams(window.location.search);
        const historiaId = urlParams.get('id');
        historia = DADOS_HISTORIAS.find(h => h.id === historiaId);

        if (!historia) { document.body.innerHTML = '<h1>Erro: História não encontrada.</h1>'; return; }

        document.title = `DudyApp - ${historia.titulo}`;
        header.querySelector('.books').src = `/DudyApp${historia.icone_header.substring(2)}`; 
        header.querySelector('h4').textContent = historia.titulo;
        personagens.querySelector('span').textContent = historia.personagens;
        
        quizContainer.style.display = 'none';
        mostrarLinha(linhaAtual);
    }

    // --- LÓGICA DO DIÁLOGO (sem alterações) ---
    function mostrarLinha(indice) {
        if (indice >= historia.dialogo.length) { iniciarQuiz(); return; }
        
        linhaAtual = indice;
        const item = historia.dialogo[indice];
        textoContainer.innerHTML = '';

        const p = document.createElement('p');
        p.textContent = (item.tipo === 'acao') ? `(${item.texto})` : `${item.personagem}: ${item.fala}`;
        textoContainer.appendChild(p);
        
        if (item.audio) {
            audioPlayer.src = `/DudyApp/audios/${item.audio}.mp3`;
            audioPlayer.play().catch(e => console.error("Erro ao tocar o áudio:", e));
        }

        const navContainer = document.createElement('div');
        navContainer.className = 'buttons';

        if (linhaAtual > 0) {
            const btnAnterior = document.createElement('button');
            btnAnterior.textContent = 'Anterior';
            btnAnterior.onclick = (e) => {
                e.target.style.backgroundColor = '#90EE90';
                mostrarLinha(linhaAtual - 1);
            };
            navContainer.appendChild(btnAnterior);
        }

        const btnProximo = document.createElement('button');
        btnProximo.textContent = 'Avançar';
        btnProximo.onclick = (e) => {
            e.target.style.backgroundColor = '#90EE90';
            mostrarLinha(linhaAtual + 1);
        };
        navContainer.appendChild(btnProximo);

        textoContainer.appendChild(navContainer);
    }

    // --- LÓGICA DO QUIZ ---
    function iniciarQuiz() {
        textoContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        botoesContainer.innerHTML = '';
        
        historia.quiz.perguntas.forEach((pergunta, indicePergunta) => {
            const perguntaDiv = document.createElement('div');
            perguntaDiv.className = 'quiz-pergunta';

            const perguntaTitulo = document.createElement('h4');
            perguntaTitulo.textContent = pergunta;
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
        btnFinalizar.className = 'buttons';
        btnFinalizar.onclick = finalizarQuiz;
        botoesContainer.appendChild(btnFinalizar);
    }

    function checarResposta(botaoSelecionado, indicePergunta) {
        const respostaCorreta = historia.quiz.respostasCorretas[indicePergunta];
        const containerBotoes = botaoSelecionado.parentElement;

        containerBotoes.querySelectorAll('button').forEach(b => {
            b.disabled = true;
            if (b.textContent === respostaCorreta) {
                b.style.backgroundColor = '#90EE90';
            }
        });

        if (botaoSelecionado.textContent !== respostaCorreta) {
            botaoSelecionado.style.backgroundColor = '#FFB6C1';
        }
    }

    // --- FUNÇÃO DE FINALIZAR QUIZ (ATUALIZADA) ---
    function finalizarQuiz() {
        header.style.display = 'none';
        personagens.style.display = 'none';
        quizContainer.style.display = 'none';
        
        let pontuacaoFinal = 0;
        const perguntasRespondidas = botoesContainer.querySelectorAll('.quiz-pergunta');
        perguntasRespondidas.forEach((perguntaDiv, indice) => {
            const botoes = perguntaDiv.querySelectorAll('button');
            const respostaCorreta = historia.quiz.respostasCorretas[indice];
            botoes.forEach(botao => {
                if (botao.disabled && botao.textContent === respostaCorreta && botao.style.backgroundColor === 'rgb(144, 238, 144)') {
                    pontuacaoFinal++;
                }
            });
        });

        // Mostra o modal de conclusão
        historiaConcluidaModal.style.display = 'flex';
        
        // Preenche a pontuação no modal
        document.getElementById('pontuacao-final-texto').textContent = `${pontuacaoFinal} de ${historia.quiz.perguntas.length}`;
        
        // Configura o botão de voltar
        document.getElementById('btnVoltarParaHistorias').onclick = () => {
            window.location.href = '../telas/indexCentrohistorias.html';
        };
    }

    // --- LÓGICA DO POP-UP (sem alterações) ---
    sairBtnPrincipal.addEventListener('click', () => {
        popupOverlay.classList.add('active');
    });
    popupOverlay.querySelector('#btnSair').addEventListener('click', () => {
        window.location.href = '../telas/indexCentrohistorias.html';
    });
    popupOverlay.querySelector('#btnVoltar').addEventListener('click', () => {
        popupOverlay.classList.remove('active');
    });
});