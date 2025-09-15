// Arquivo: scripts/scriptAtividade.js

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const licaoId = parseInt(urlParams.get('licaoId'));
    
    // Encontra a lição atual
    const licaoAtual = DADOS_LICOES.find(l => l.id === licaoId);

    if (!licaoAtual) {
        document.body.innerHTML = "<h1>Erro: Lição não encontrada.</h1>";
        return;
    }

    // Variáveis para o estado da lição
    let atividadesOriginal = [...licaoAtual.atividades]; // Guarda a ordem original
    let atividadesRestantes = [...licaoAtual.atividades]; // Cópia que será manipulada
    let currentIndex = 0; // Índice da atividade atual na fila de atividadesRestantes
    let atividadesErradas = [];
    let vidas = 5; 
    let acertosConsecutivos = 0; // Para o progresso visual

    const feedbackEl = document.getElementById('feedback');
    const btnVerificar = document.getElementById('btnVerificar');
    const progressoAtualEl = document.getElementById('progresso-atual');
    const vidasEl = document.getElementById('vidas');

    // Inicializa as vidas no display
    vidasEl.textContent = vidas;

    // Função para atualizar a barra de progresso
    function atualizarProgresso() {
        // O progresso deve ser baseado na quantidade de atividades na sequência original que foram acertadas
        // (sem contar as que retornaram por erro)
        const totalAtividadesUnicas = atividadesOriginal.length;
        const acertosUnicos = atividadesOriginal.filter(original => 
            !atividadesRestantes.some(restante => restante.id === original.id && restante.tipo === original.tipo) &&
            !atividadesErradas.some(errada => errada.id === original.id && errada.tipo === original.tipo)
        ).length;
        
        // Simplesmente a quantidade de atividades que já foram "passadas"
        const percentual = (acertosConsecutivos / totalAtividadesUnicas) * 100;
        progressoAtualEl.style.width = `${percentual}%`;
    }

    // Função para carregar a próxima atividade
    function carregarProximaAtividade() {
        // Limpa feedback anterior e esconde os containers
        feedbackEl.textContent = '';
        document.getElementById('exercicio-associacao').style.display = 'none';
        document.getElementById('exercicio-traducao').style.display = 'none';
        btnVerificar.disabled = true; // Garante que o botão verificar esteja desabilitado no início

        // 1. Verifica se a lição original acabou e não há erros para revisar
        if (currentIndex >= atividadesRestantes.length && atividadesErradas.length === 0) {
            alert('Lição concluída! Parabéns!');
            window.location.href = '../telas/telaAtividade.html'; // Redireciona para o menu de lições
            return;
        }

        // 2. Se a fila atual de atividades acabou, mas há erros, reinicia com os erros
        if (currentIndex >= atividadesRestantes.length && atividadesErradas.length > 0) {
            atividadesRestantes = atividadesErradas;
            atividadesErradas = [];
            currentIndex = 0; // Reinicia o índice para começar pelos erros
            // alert('Vamos revisar as atividades que você errou!'); // Opcional: avisar ao usuário
        }

        const proximaAtividadeInfo = atividadesRestantes[currentIndex];
        const atividadeCompleta = DADOS_ATIVIDADES.find(a => a.id === proximaAtividadeInfo.id && a.tipo === proximaAtividadeInfo.tipo);

        if (!atividadeCompleta) {
            console.error('Atividade completa não encontrada para ID:', proximaAtividadeInfo.id, 'e tipo:', proximaAtividadeInfo.tipo);
            document.body.innerHTML = "<h1>Erro: Atividade detalhada não encontrada.</h1>";
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
        vidasEl.textContent = vidas; // Atualiza o display de vidas
    }

    // Função para lidar com a resposta do usuário
    function verificarResposta(isCorreta, atividadeRespondida) {
        if (isCorreta) {
            feedbackEl.textContent = 'Correto!';
            feedbackEl.className = 'feedback correto'; // Adiciona classe 'feedback'
            acertosConsecutivos++; 
        } else {
            feedbackEl.textContent = 'Incorreto!';
            feedbackEl.className = 'feedback incorreto'; // Adiciona classe 'feedback'
            feedbackEl.textContent += ` Resposta correta: ${atividadeRespondida.respostaCorreta}`; 
            vidas--; 
            vidasEl.textContent = vidas;
            acertosConsecutivos = 0; // Reinicia acertos consecutivos ao errar
            atividadesErradas.push(atividadesRestantes[currentIndex]); // Adiciona a atividade ao final da lição

            if (vidas <= 0) {
                alert('Você ficou sem vidas! Tente novamente.');
                window.location.href = '../telas/telaAtividade.html'; // Redireciona em caso de fim das vidas
                return;
            }
        }
        btnVerificar.disabled = true; // Desabilita o botão após verificar

        // Move para a próxima atividade na fila atual
        currentIndex++; 

        // Pequeno atraso para o usuário ver o feedback antes de carregar a próxima
        setTimeout(carregarProximaAtividade, 1500); 
    }

    // --- Funções de Carregamento de Exercícios (com callback para verificarResposta) ---

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

        // O clique no botão Verificar agora chama a função centralizada verificarResposta
        btnVerificar.onclick = () => {
            verificarResposta(respostaSelecionada === dados.respostaCorreta, dados);
        };
    }

    function carregarExercicioTraducao(dados) {
        const perguntaEl = document.getElementById('pergunta-traducao');
        const btnAudio = document.getElementById('btnAudio');
        const spanPalavra = document.getElementById('palavra-audio');
        const inputResposta = document.getElementById('inputResposta');
        const btnVerificar = document.getElementById('btnVerificar');
        
        // Pega os elementos da imagem
        const imgContainer = document.getElementById('imagem-principal-container');
        const imgEl = document.getElementById('imagem-principal');

        perguntaEl.textContent = dados.pergunta;
        spanPalavra.textContent = dados.palavraOriginal;
        inputResposta.value = ''; // Limpa o input
        
        // Mostra e preenche a imagem se ela existir nos dados
        if (dados.imagemPrincipal) {
            imgContainer.style.display = 'flex';
            imgEl.src = dados.imagemPrincipal;
        } else {
            imgContainer.style.display = 'none'; // Esconde se não houver imagem
        }
        
        btnAudio.onclick = () => { 
            if (dados.audio) { // Garante que há um áudio antes de tentar tocar
                new Audio(dados.audio).play(); 
            } else {
                console.warn("Nenhum arquivo de áudio especificado para esta atividade.");
            }
        };

        // Habilita o botão Verificar apenas quando o input tem texto
        inputResposta.addEventListener('input', () => {
            btnVerificar.disabled = inputResposta.value.trim() === '';
        });

        // O clique no botão Verificar agora chama a função centralizada verificarResposta
        btnVerificar.onclick = () => {
            const respostaUsuario = inputResposta.value.trim().toLowerCase();
            const respostaCorreta = dados.respostaCorreta.trim().toLowerCase();
            verificarResposta(respostaUsuario === respostaCorreta, dados);
        };
    }

    // Inicia a primeira atividade da lição
    carregarProximaAtividade();
});