// Arquivo: scripts/scriptAtividade.js

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const licaoId = parseInt(urlParams.get('licaoId'));
    
    const licaoAtual = DADOS_LICOES.find(l => l.id === licaoId);

    if (!licaoAtual) {
        document.body.innerHTML = "<h1>Erro: Lição não encontrada.</h1>";
        return;
    }

    // --- VARIÁVEIS DE ESTADO (AJUSTADAS) ---
    const atividadesOriginais = [...licaoAtual.atividades];
    let atividadesRestantes = [...licaoAtual.atividades];
    let currentIndex = 0;
    let atividadesErradas = [];
    // NOVO: Array para rastrear acertos únicos
    let atividadesCorretasUnicas = []; 
    let licaoFinalizada = false;

    const feedbackEl = document.getElementById('feedback');
    const btnVerificar = document.getElementById('btnVerificar');
    const progressoAtualEl = document.getElementById('progresso-atual');
    
    const licaoConcluidaModal = document.getElementById('licao-concluida-modal');
    const btnVoltarMenu = document.getElementById('btnVoltarMenu');
    const atividadeWrapper = document.querySelector('.atividade-wrapper');
    const acoesRodape = document.querySelector('.acoes-rodape');
    const progressoHeader = document.querySelector('.progresso-header');

    // --- FUNÇÃO DE PROGRESSO (CORRIGIDA) ---
    function atualizarProgresso() {
        const totalAtividades = atividadesOriginais.length;
        // O progresso agora é baseado no número de atividades únicas acertadas
        const percentual = (atividadesCorretasUnicas.length / totalAtividades) * 100;
        progressoAtualEl.style.width = `${percentual}%`;
    }

    // --- FUNÇÃO PARA CARREGAR PRÓXIMA ATIVIDADE (sem alterações) ---
    function carregarProximaAtividade() {
        if (licaoFinalizada) { return; }

        feedbackEl.textContent = '';
        feedbackEl.className = '';
        
        document.getElementById('exercicio-associacao').style.display = 'none';
        document.getElementById('exercicio-traducao').style.display = 'none';
        btnVerificar.disabled = true;

        acoesRodape.style.display = 'flex';
        progressoHeader.style.display = 'flex';
        atividadeWrapper.style.display = 'flex'; 

        if (currentIndex >= atividadesRestantes.length) {
            if (atividadesErradas.length > 0) {
                atividadesRestantes = atividadesErradas;
                atividadesErradas = [];
                currentIndex = 0;
            } else {
                licaoFinalizada = true;
                licaoConcluidaModal.style.display = 'flex';
                
                atividadeWrapper.style.display = 'none';
                acoesRodape.style.display = 'none';
                progressoHeader.style.display = 'none';

                btnVoltarMenu.onclick = () => {
                    window.location.href = 'telaAtividade.html';
                };
                return;
            }
        }
        
        if (atividadesRestantes.length === 0 || currentIndex >= atividadesRestantes.length) {
            console.error("Fila de atividades vazia ou índice inválido.");
            licaoFinalizada = true;
            return;
        }

        const proximaAtividadeInfo = atividadesRestantes[currentIndex];
        const atividadeCompleta = DADOS_ATIVIDADES.find(a => a.id === proximaAtividadeInfo.id && a.tipo === proximaAtividadeInfo.tipo);

        if (!atividadeCompleta) {
            console.error('Detalhes da atividade não encontrados:', proximaAtividadeInfo);
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

    // --- FUNÇÃO DE VERIFICAÇÃO (CORRIGIDA) ---
    function verificarResposta(isCorreta, atividadeRespondida) {
        if (licaoFinalizada) return;

        btnVerificar.disabled = true;

        if (isCorreta) {
            feedbackEl.textContent = 'Correto!';
            feedbackEl.className = 'feedback correto';
            
            // Verifica se a atividade já foi acertada antes
            const jaAcertou = atividadesCorretasUnicas.some(item => item.id === atividadeRespondida.id);
            if (!jaAcertou) {
                // Se for um acerto inédito, adiciona à lista e atualiza o progresso
                atividadesCorretasUnicas.push(atividadeRespondida);
                atualizarProgresso();
            }
        } else {
            feedbackEl.textContent = `Incorreto! A resposta era: ${atividadeRespondida.respostaCorreta}`;
            feedbackEl.className = 'feedback incorreto';
            atividadesErradas.push(atividadesRestantes[currentIndex]);
        }
        
        currentIndex++;
        setTimeout(carregarProximaAtividade, 1500); 
    }

    // --- Funções de Carregamento (sem alterações) ---
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