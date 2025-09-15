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
    let acertos = 0; // Contagem de acertos únicos para a barra de progresso
    let licaoFinalizada = false; // NOVA FLAG

    const feedbackEl = document.getElementById('feedback');
    const btnVerificar = document.getElementById('btnVerificar');
    const progressoAtualEl = document.getElementById('progresso-atual');
    
    // Elementos do modal de conclusão
    const licaoConcluidaModal = document.getElementById('licao-concluida-modal');
    const btnVoltarMenu = document.getElementById('btnVoltarMenu');
    const atividadeWrapper = document.querySelector('.atividade-wrapper');
    const acoesRodape = document.querySelector('.acoes-rodape');
    const progressoHeader = document.querySelector('.progresso-header');

    // Função para atualizar a barra de progresso
    function atualizarProgresso() {
        const totalAtividadesUnicas = atividadesOriginais.length;
        // Conta quantas atividades originais foram "passadas" (não estão mais em restantes ou erradas)
        const acertosUnicos = atividadesOriginais.filter(original => 
            !atividadesRestantes.some(restante => restante.id === original.id && restante.tipo === original.tipo) && 
            !atividadesErradas.some(errada => errada.id === original.id && errada.tipo === original.tipo)
        ).length;

        const percentual = (acertosUnicos / totalAtividadesUnicas) * 100;
        progressoAtualEl.style.width = `${percentual}%`;
    }
    // Função para carregar a próxima atividade
    function carregarProximaAtividade() {
        if (licaoFinalizada) { return; }

        feedbackEl.textContent = '';
        feedbackEl.className = '';
        
        document.getElementById('exercicio-associacao').style.display = 'none';
        document.getElementById('exercicio-traducao').style.display = 'none';
        btnVerificar.disabled = true;

        // Garante que os containers principais estejam visíveis
        atividadeWrapper.style.display = 'flex'; 
        progressoHeader.style.display = 'flex';
        // REMOVIDO: acoesRodape.style.display = 'flex'; // Esta linha foi removida

        if (currentIndex >= atividadesRestantes.length) {
            if (atividadesErradas.length > 0) {
                atividadesRestantes = atividadesErradas;
                atividadesErradas = [];
                currentIndex = 0;
            } else {
                // Lição completa!
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
            console.error("Tentativa de carregar atividade com fila vazia.");
            licaoFinalizada = true;
            return;
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
        if (licaoFinalizada) return; // Não permite resposta se a lição já finalizou

        btnVerificar.disabled = true;

        if (isCorreta) {
            feedbackEl.textContent = 'Correto!';
            feedbackEl.className = 'feedback correto';
            
            // Incrementa o contador de acertos apenas para atividades que não são repetidas (não estão na lista de erradas)
            // Para isso, precisamos de um jeito de saber se a 'atividadeRespondida' é uma 'original'
            // ou se já foi uma 'errada' que está sendo refeita.
            // Uma forma é ter um campo 'concluida' nos dados ou verificar contra o array original.
            // Por enquanto, vou manter o 'acertos' para o progresso da forma mais simples, 
            // que é contar cada acerto que leva a avançar no progresso total.
            
            // Esta lógica precisa ser revisada se você quiser contar "acertos de atividades únicas"
            // de forma mais rigorosa para o progresso. Por enquanto, acertos aumenta em cada acerto.
            acertos++; 

        } else {
            feedbackEl.textContent = `Incorreto! A resposta era: ${atividadeRespondida.respostaCorreta}`;
            feedbackEl.className = 'feedback incorreto';
            
            // Adiciona a atividade à lista de erradas APENAS SE AINDA NÃO ESTIVER LÁ
            // E se não for uma atividade já repetida de 'atividadesErradas'
            // (Para evitar duplicatas excessivas se o usuário errar a mesma atividade várias vezes)
            const atividadeJaEstaNaListaDeErros = atividadesErradas.some(
                err => err.id === atividadeRespondida.id && err.tipo === atividadeRespondida.tipo
            );
            
            // Adiciona aos erros se for uma atividade original ou uma que não foi adicionada ainda
            const isOriginalActivity = atividadesOriginais.some(
                orig => orig.id === atividadeRespondida.id && orig.tipo === atividadeRespondida.tipo
            );

            if (isOriginalActivity && !atividadeJaEstaNaListaDeErros) {
                atividadesErradas.push(atividadeRespondida);
            } else if (!isOriginalActivity && !atividadeJaEstaNaListaDeErros) { // Se for uma revisada e não duplicada
                 atividadesErradas.push(atividadeRespondida);
            }
        }
        
        currentIndex++; 
        setTimeout(carregarProximaAtividade, 1500); 
    }

    // --- Funções de Carregamento de Exercícios ---

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
            if (respostaSelecionada) { 
                verificarResposta(respostaSelecionada === dados.respostaCorreta, dados);
            } else {
                // Opcional: feedback para selecionar uma opção
            }
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
        inputResposta.focus(); 
        
        if (dados.imagemPrincipal) {
            imgContainer.style.display = 'flex';
            imgEl.src = dados.imagemPrincipal;
        } else {
            imgContainer.style.display = 'none';
        }
        
        btnAudio.onclick = () => { 
            if (dados.audio) { 
                new Audio(dados.audio).play(); 
            } else {
                console.warn("Nenhum arquivo de áudio especificado para esta atividade.");
            }
        };

        inputResposta.addEventListener('input', () => {
            btnVerificar.disabled = inputResposta.value.trim() === '';
        });

        btnVerificar.onclick = () => {
            const respostaUsuario = inputResposta.value.trim().toLowerCase();
            const respostaCorreta = dados.respostaCorreta.trim().toLowerCase();
            if (respostaUsuario) { 
                verificarResposta(respostaUsuario === respostaCorreta, dados);
            } else {
                // Opcional: feedback para digitar uma resposta
            }
        };
    }

    // Inicia a primeira atividade da lição
    carregarProximaAtividade();
});