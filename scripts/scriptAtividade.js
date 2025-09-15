// Arquivo: scripts/scriptAtividade.js

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const licaoId = parseInt(urlParams.get('licaoId'));
    
    const licaoAtual = DADOS_LICOES.find(l => l.id === licaoId);

    if (!licaoAtual) {
        document.body.innerHTML = "<h1>Erro: Lição não encontrada.</h1>";
        return;
    }

    // Variáveis para o estado da lição
    let atividadesOriginais = [...licaoAtual.atividades];
    let atividadesRestantes = [...licaoAtual.atividades];
    let currentIndex = 0;
    let atividadesErradas = [];
    let acertos = 0;

    const feedbackEl = document.getElementById('feedback');
    const btnVerificar = document.getElementById('btnVerificar');
    const progressoAtualEl = document.getElementById('progresso-atual');
    
    // Função para atualizar a barra de progresso
    function atualizarProgresso() {
        const totalAtividades = atividadesOriginais.length;
        const percentual = (acertos / totalAtividades) * 100;
        progressoAtualEl.style.width = `${percentual}%`;
    }

    // Função para carregar a próxima atividade
    function carregarProximaAtividade() {
        // --- A CORREÇÃO ESTÁ AQUI ---
        feedbackEl.textContent = ''; // Limpa o texto
        feedbackEl.className = '';   // Limpa as classes de estilo (correto/incorreto)
        // --- FIM DA CORREÇÃO ---

        document.getElementById('exercicio-associacao').style.display = 'none';
        document.getElementById('exercicio-traducao').style.display = 'none';
        btnVerificar.disabled = true;

        if (currentIndex >= atividadesRestantes.length) {
            if (atividadesErradas.length > 0) {
                atividadesRestantes = atividadesErradas;
                atividadesErradas = [];
                currentIndex = 0;
            } else {
                alert('Lição concluída! Parabéns!');
                window.location.href = 'telaAtividade.html';
                return;
            }
        }

        const proximaAtividadeInfo = atividadesRestantes[currentIndex];
        const atividadeCompleta = DADOS_ATIVIDADES.find(a => a.id === proximaAtividadeInfo.id && a.tipo === proximaAtividadeInfo.tipo);

        if (!atividadeCompleta) {
            console.error('Detalhes da atividade não encontrados:', proximaAtividadeInfo);
            document.body.innerHTML = "<h1>Erro ao carregar atividade.</h1>";
            return;
        }

        if (atividadeCompleta.tipo === 'associacao_imagem') {
            document.getElementById('exercicio-associacao').style.display = 'block';
            carregarExercicioAssociacao(atividadeCompleta);
        } else if (atividadeCompleta.tipo === 'traducao') {
            document.getElementById('exercicio-traducao').style.display = 'block';
            carregarExercicioTraducao(atividadeCompleta);
        }
        
        atualizarProgresso();
    }

    // Função para lidar com a resposta do usuário
    function verificarResposta(isCorreta, atividadeRespondida) {
        btnVerificar.disabled = true;

        if (isCorreta) {
            feedbackEl.textContent = 'Correto!';
            feedbackEl.className = 'feedback correto';
            // Apenas incrementa o acerto se não for uma atividade repetida por erro
            if (!atividadesErradas.some(err => err.id === atividadeRespondida.id)) {
                acertos++;
            }
        } else {
            feedbackEl.textContent = `Incorreto! A resposta era: ${atividadeRespondida.respostaCorreta}`;
            feedbackEl.className = 'feedback incorreto';
            atividadesErradas.push(atividadesRestantes[currentIndex]);
        }
        
        currentIndex++;

        setTimeout(carregarProximaAtividade, 1500); 
    }

    // --- Funções de Carregamento de Exercícios (sem alterações) ---
    function carregarExercicioAssociacao(dados) {
        const perguntaEl = document.getElementById('pergunta-associacao');
        const opcoesContainer = document.getElementById('opcoes-imagem');
        let respostaSelecionada = null;

        perguntaEl.innerHTML = `Qual destas imagens é "<span>${dados.palavraAlvo}</span>"?`;
        opcoesContainer.innerHTML = '';

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

        btnVerificar.onclick = () => {
            verificarResposta(respostaSelecionada === dados.respostaCorreta, dados);
        };
    }

    function carregarExercicioTraducao(dados) {
        const perguntaEl = document.getElementById('pergunta-traducao');
        const btnAudio = document.getElementById('btnAudio');
        const spanPalavra = document.getElementById('palavra-audio');
        const inputResposta = document.getElementById('inputResposta');
        
        const imgContainer = document.getElementById('imagem-principal-container');
        const imgEl = document.getElementById('imagem-principal');

        perguntaEl.textContent = dados.pergunta;
        spanPalavra.textContent = dados.palavraOriginal;
        inputResposta.value = '';
        
        if (dados.imagemPrincipal) {
            imgContainer.style.display = 'flex';
            imgEl.src = dados.imagemPrincipal;
        } else {
            imgContainer.style.display = 'none';
        }
        
        btnAudio.onclick = () => { new Audio(dados.audio).play(); };

        inputResposta.addEventListener('input', () => {
            btnVerificar.disabled = inputResposta.value.trim() === '';
        });

        btnVerificar.onclick = () => {
            const respostaUsuario = inputResposta.value.trim().toLowerCase();
            const respostaCorreta = dados.respostaCorreta.trim().toLowerCase();
            verificarResposta(respostaUsuario === respostaCorreta, dados);
        };
    }

    // Inicia a primeira atividade da lição
    carregarProximaAtividade();
});