// Arquivo: scripts/scriptAtividade.js

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const licaoId = parseInt(urlParams.get('licaoId')); // Agora pegamos 'licaoId'
    const atividadeIndex = parseInt(urlParams.get('atividadeIndex') || '0'); // Qual atividade da lição estamos
    
    // Encontra a lição atual
    const licaoAtual = DADOS_LICOES.find(l => l.id === licaoId);

    if (!licaoAtual) {
        document.body.innerHTML = "<h1>Erro: Lição não encontrada.</h1>";
        return;
    }

    // Variáveis para o estado da lição
    let atividadesRestantes = [...licaoAtual.atividades]; // Cópia para não modificar o original
    let currentIndex = atividadeIndex; // Começa da atividade especificada ou da primeira
    let atividadesErradas = [];
    let vidas = 5; // Exemplo de vidas
    let progressoTotal = licaoAtual.atividades.length;
    let acertosConsecutivos = 0; // Para o progresso

    const feedbackEl = document.getElementById('feedback');
    const btnVerificar = document.getElementById('btnVerificar');
    const progressoAtualEl = document.getElementById('progresso-atual');
    const vidasEl = document.getElementById('vidas');

    // Função para atualizar a barra de progresso
    function atualizarProgresso() {
        const atividadesCompletas = licaoAtual.atividades.length - atividadesRestantes.length;
        const percentual = (acertosConsecutivos / progressoTotal) * 100; // Progresso baseado em acertos não repetidos
        progressoAtualEl.style.width = `${percentual}%`;
    }

    // Função para carregar a próxima atividade
    function carregarProximaAtividade() {
        if (currentIndex >= atividadesRestantes.length && atividadesErradas.length === 0) {
            // Lição completa!
            alert('Lição concluída! Parabéns!');
            window.location.href = 'telaAtividade.html'; // Redireciona para o menu de lições
            return;
        }

        // Se houver erros, coloca eles no final da fila
        if (currentIndex >= atividadesRestantes.length && atividadesErradas.length > 0) {
            atividadesRestantes = atividadesErradas;
            atividadesErradas = [];
            currentIndex = 0; // Reinicia o índice para os erros
            alert('Vamos revisar as atividades que você errou!');
        }

        const proximaAtividadeInfo = atividadesRestantes[currentIndex];
        const atividadeCompleta = DADOS_ATIVIDADES.find(a => a.id === proximaAtividadeInfo.id && a.tipo === proximaAtividadeInfo.tipo);

        if (!atividadeCompleta) {
            console.error('Atividade completa não encontrada para ID:', proximaAtividadeInfo.id, 'e tipo:', proximaAtividadeInfo.tipo);
            document.body.innerHTML = "<h1>Erro: Atividade detalhada não encontrada.</h1>";
            return;
        }

        // Limpa a tela antes de carregar nova atividade
        document.getElementById('exercicio-associacao').style.display = 'none';
        document.getElementById('exercicio-traducao').style.display = 'none';
        feedbackEl.textContent = '';
        btnVerificar.disabled = true;

        if (atividadeCompleta.tipo === 'associacao_imagem') {
            document.getElementById('exercicio-associacao').style.display = 'block';
            carregarExercicioAssociacao(atividadeCompleta);
        } else if (atividadeCompleta.tipo === 'traducao') {
            document.getElementById('exercicio-traducao').style.display = 'block';
            carregarExercicioTraducao(atividadeCompleta);
        }
        atualizarProgresso();
        vidasEl.textContent = vidas;
    }

    // Função para lidar com a resposta do usuário
    function verificarResposta(isCorreta, atividadeRespondida) {
        if (isCorreta) {
            feedbackEl.textContent = 'Correto!';
            feedbackEl.className = 'correto';
            acertosConsecutivos++; // Incrementa acertos para o progresso
            currentIndex++; // Vai para a próxima atividade na sequência
        } else {
            feedbackEl.textContent = 'Incorreto!';
            feedbackEl.className = 'incorreto';
            feedbackEl.textContent += ` Resposta correta: ${atividadeRespondida.respostaCorreta}`; // Mostra a resposta correta
            feedbackEl.className = 'incorreto';
            vidas--; // Perde uma vida
            vidasEl.textContent = vidas;
            acertosConsecutivos = 0; // Reinicia acertos consecutivos ao errar
            atividadesErradas.push(atividadesRestantes[currentIndex]); // Adiciona a atividade ao final da lição

            if (vidas <= 0) {
                alert('Você ficou sem vidas! Tente novamente.');
                window.location.href = 'telaAtividade.html'; // Redireciona para o menu de lições
                return;
            }
            currentIndex++; // Ainda avança para a próxima, mas a errada volta no final
        }
        btnVerificar.disabled = true; // Desabilita o botão após verificar

        // Pequeno atraso para o usuário ver o feedback antes de carregar a próxima
        setTimeout(carregarProximaAtividade, 1500); 
    }

    // --- Funções de Carregamento de Exercícios (com callback para verificarResposta) ---

    function carregarExercicioAssociacao(dados) {
        const perguntaEl = document.getElementById('pergunta-associacao');
        const opcoesContainer = document.getElementById('opcoes-imagem');
        const inputRespostaAssociacao = document.getElementById('inputResposta'); // Pode não existir
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
    const btnVerificar = document.getElementById('btnVerificar');
    
    // NOVO: Pega os elementos da imagem
    const imgContainer = document.getElementById('imagem-principal-container');
    const imgEl = document.getElementById('imagem-principal');

    perguntaEl.textContent = dados.pergunta;
    spanPalavra.textContent = dados.palavraOriginal;
    
    // Mostra e preenche a imagem se ela existir nos dados
    if (dados.imagemPrincipal) {
        imgContainer.style.display = 'flex';
        imgEl.src = dados.imagemPrincipal;
    } else {
        imgContainer.style.display = 'none'; // Esconde se não houver imagem
    }
    
    btnAudio.onclick = () => { new Audio(dados.audio).play(); };

    inputResposta.addEventListener('input', () => {
        btnVerificar.disabled = inputResposta.value.trim() === '';
    });

    btnVerificar.disabled = true;
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

    // Inicia a primeira atividade da lição
    carregarProximaAtividade();
});