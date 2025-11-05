// Arquivo: scripts/scriptAtividade.js (VERSÃO FINAL E COMPLETA)

document.addEventListener('DOMContentLoaded', async () => {
    // --- INICIALIZAÇÃO DO SUPABASE ---
    // Certifique-se de que estas chaves estão corretas para o seu projeto Supabase
    const SUPABASE_URL = "https://jqteyocpfokvjmsrdiea.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxdGV5b2NwZm9rdmptc3JkaWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MTQwNDIsImV4cCI6MjA3MTE5MDA0Mn0.SNBHJgmoXVIAx6d5uDIBU2OYfzIzyZMbqcigAuoSBtA";
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // --- PEGA O ID DA LIÇÃO DA URL ---
    const urlParams = new URLSearchParams(window.location.search);
    const licaoId = parseInt(urlParams.get('licaoId'));
    
    // Encontra a lição atual nos DADOS_LICOES
    const licaoAtual = DADOS_LICOES.find(l => l.id === licaoId);

    // Se a lição não for encontrada, exibe um erro e interrompe
    if (!licaoAtual) {
        document.body.innerHTML = "<h1>Erro: Lição não encontrada. Por favor, volte ao menu de atividades.</h1>";
        return;
    }

    // --- PEGA O ID DO ESTUDANTE ATIVO DO LOCALSTORAGE ---
    // Esta é a chave 'criancaSelecionada' que você usa na tela de seleção de perfil
    const idEstudanteAtivo = localStorage.getItem('criancaSelecionada'); 
    
    // Se nenhum estudante estiver selecionado, alerta e redireciona
    if (!idEstudanteAtivo) {
        alert("Nenhum estudante selecionado. Redirecionando para a seleção de perfil.");
        // Ajuste este caminho se sua tela de seleção de perfil estiver em outro lugar
        window.location.href = '../telas/telacadastrokid.html'; 
        return;
    }

    // --- VARIÁVEIS DE ESTADO DA LIÇÃO ---
    // Guarda os IDs das atividades originais desta lição
    const atividadesOriginais = [...licaoAtual.atividades];
    // Fila de atividades a serem feitas (inclui repetições de erros)
    let atividadesRestantes = [...licaoAtual.atividades];
    let currentIndex = 0; // Índice da atividade atual na fila 'atividadesRestantes'
    let atividadesErradas = []; // Armazena IDs das atividades que o usuário errou
    // Armazena IDs das atividades ÚNICAS que o usuário acertou (para calcular a pontuação final)
    let atividadesCorretasUnicas = []; 
    let licaoFinalizada = false; // Flag para indicar se a lição foi concluída

    // --- ELEMENTOS DA PÁGINA ---
    const feedbackEl = document.getElementById('feedback'); // Elemento para feedback de resposta (Correto/Incorreto)
    const btnVerificar = document.getElementById('btnVerificar'); // Botão para verificar a resposta
    const progressoAtualEl = document.getElementById('progresso-atual'); // Barra de progresso dentro da atividade
    const licaoConcluidaModal = document.getElementById('licao-concluida-modal'); // Modal de conclusão da lição
    const btnVoltarMenu = document.getElementById('btnVoltarMenu'); // Botão "Voltar ao Menu" no modal
    const atividadeWrapper = document.querySelector('.atividade-wrapper'); // Contêiner principal das atividades
    const acoesRodape = document.querySelector('.acoes-rodape'); // Rodapé com o botão 'Verificar'
    const progressoHeader = document.querySelector('.progresso-header'); // Cabeçalho com a barra de progresso da lição

    // --- FUNÇÕES PRINCIPAIS ---

    /**
     * Atualiza a largura da barra de progresso visual na parte superior da página.
     * O progresso é calculado com base nas atividades únicas que foram acertadas.
     */
    function atualizarProgresso() {
        const totalAtividades = atividadesOriginais.length;
        const percentual = (atividadesCorretasUnicas.length / totalAtividades) * 100;
        progressoAtualEl.style.width = `${percentual}%`;
    }

    /**
     * Carrega a próxima atividade da fila.
     * Gerencia a transição entre atividades e a conclusão da lição.
     */
    async function carregarProximaAtividade() {
        if (licaoFinalizada) return; // Não faz nada se a lição já foi finalizada

        // Limpa o feedback e esconde os tipos de exercícios anteriores
        feedbackEl.className = '';
        feedbackEl.textContent = '';
        document.getElementById('exercicio-associacao').style.display = 'none';
        document.getElementById('exercicio-traducao').style.display = 'none';
        btnVerificar.disabled = true; // Desabilita o botão 'Verificar' até uma nova interação

        // Verifica se todas as atividades da fila atual foram concluídas
        if (currentIndex >= atividadesRestantes.length) {
            if (atividadesErradas.length > 0) {
                // Se ainda há atividades que foram erradas, elas são adicionadas de volta à fila
                atividadesRestantes = atividadesErradas;
                atividadesErradas = []; // Limpa a lista de erros para a próxima rodada
                currentIndex = 0; // Reinicia o índice para começar a repassar as atividades erradas
            } else {
                // Nenhuma atividade restante e nenhum erro: lição completa!
                licaoFinalizada = true;
                await salvarProgressoDaLicao(); // Salva o progresso final no Supabase
                
                // Esconde a interface da atividade e mostra o modal de conclusão
                atividadeWrapper.style.display = 'none';
                acoesRodape.style.display = 'none';
                progressoHeader.style.display = 'none'; 
                licaoConcluidaModal.style.display = 'flex'; // Exibe o modal
                
                // Define a ação do botão "Voltar ao Menu" para redirecionar para a tela principal
                btnVoltarMenu.onclick = () => { 
                    window.location.href = 'telaDudyAcademy.html'; 
                };
                return; // Encerra a função, pois a lição foi concluída
            }
        }

        // Obtém os dados da próxima atividade a ser carregada
        const idDaProximaAtividade = atividadesRestantes[currentIndex];
        const atividadeCompleta = DADOS_ATIVIDADES.find(a => a.id === idDaProximaAtividade);

        // Se a atividade não for encontrada, registra um erro e interrompe
        if (!atividadeCompleta) {
            console.error('Detalhes da atividade não encontrados para o ID:', idDaProximaAtividade);
            return;
        }

        // Carrega o molde correto do exercício com base no seu tipo
        if (atividadeCompleta.tipo === 'associacao_imagem') {
            document.getElementById('exercicio-associacao').style.display = 'block';
            carregarExercicioAssociacao(atividadeCompleta);
        } else if (atividadeCompleta.tipo === 'traducao') {
            document.getElementById('exercicio-traducao').style.display = 'block';
            carregarExercicioTraducao(atividadeCompleta);
        }
        
        atualizarProgresso(); // Atualiza a barra de progresso da atividade
    }

    /**
     * Verifica a resposta do usuário e fornece feedback.
     * @param {boolean} isCorreta - Indica se a resposta do usuário está correta.
     * @param {object} atividadeRespondida - Os dados da atividade que foi respondida.
     */
    function verificarResposta(isCorreta, atividadeRespondida) {
        if (licaoFinalizada) return;
        btnVerificar.disabled = true; // Desabilita o botão para evitar cliques múltiplos

        if (isCorreta) {
            feedbackEl.textContent = 'Correto!';
            feedbackEl.className = 'feedback correto';
            
            // Adiciona a atividade aos acertos únicos se ainda não estiver lá
            const jaAcertou = atividadesCorretasUnicas.includes(atividadeRespondida.id);
            if (!jaAcertou) {
                atividadesCorretasUnicas.push(atividadeRespondida.id);
                atualizarProgresso(); // Atualiza a barra de progresso da lição
            }
        } else {
            feedbackEl.textContent = `Incorreto! A resposta era: ${atividadeRespondida.respostaCorreta}`;
            feedbackEl.className = 'feedback incorreto';
            
            // Adiciona a atividade à lista de erros para repassar, se ainda não estiver lá
            const jaErrou = atividadesErradas.includes(atividadesRestantes[currentIndex]);
            if (!jaErrou) {
                atividadesErradas.push(atividadesRestantes[currentIndex]);
            }
        }
        
        currentIndex++; // Avança para a próxima atividade na fila
        // Carrega o próximo exercício após um pequeno atraso para o usuário ver o feedback
        setTimeout(carregarProximaAtividade, 1500); 
    }

    /**
     * Salva ou atualiza o progresso da lição atual no Supabase.
     * Usa 'upsert' para garantir que o registro seja criado ou atualizado corretamente.
     */
    // Encontra a lição atual nos DADOS_LICOES
    

    // --- FUNÇÕES DE CARREGAMENTO DE EXERCÍCIOS ESPECÍFICOS ---

    /**
     * Carrega um exercício do tipo "Associação de Imagem".
     * @param {object} dados - Os dados específicos desta atividade.
     */
    function carregarExercicioAssociacao(dados) {
        const perguntaEl = document.getElementById('pergunta-associacao');
        const opcoesContainer = document.getElementById('opcoes-imagem');
        let respostaSelecionada = null; // Guarda a ID da opção clicada pelo usuário

        perguntaEl.innerHTML = dados.pergunta;
        opcoesContainer.innerHTML = ''; // Limpa as opções anteriores

        dados.opcoes.forEach(opcao => {
            const card = document.createElement('div');
            card.className = 'card-imagem';
            card.dataset.resposta = opcao.id; // Armazena a ID da resposta na data-attribute
            
            const img = document.createElement('img');
            img.src = opcao.imagem;
            
            const p = document.createElement('p');
            p.textContent = opcao.texto;

            card.appendChild(img);
            card.appendChild(p);
            opcoesContainer.appendChild(card);

            // Adiciona o evento de clique para seleção de opções
            card.addEventListener('click', () => {
                // Remove a classe 'selecionado' de todos os cards e adiciona ao clicado
                document.querySelectorAll('.card-imagem').forEach(c => c.classList.remove('selecionado'));
                card.classList.add('selecionado');
                respostaSelecionada = card.dataset.resposta; // Atualiza a resposta selecionada
                btnVerificar.disabled = false; // Habilita o botão 'Verificar'
            });
        });

        // Define a ação do botão 'Verificar' para este tipo de exercício
        btnVerificar.onclick = () => {
            verificarResposta(respostaSelecionada === dados.respostaCorreta, dados);
        };
    }

    /**
     * Carrega um exercício do tipo "Tradução".
     * @param {object} dados - Os dados específicos desta atividade.
     */
    function carregarExercicioTraducao(dados) {
        const perguntaEl = document.getElementById('pergunta-traducao');
        const btnAudio = document.getElementById('btnAudio');
        const spanPalavra = document.getElementById('palavra-audio');
        const inputResposta = document.getElementById('inputResposta');
        const imgContainer = document.getElementById('imagem-principal-container');
        const imgEl = document.getElementById('imagem-principal');

        perguntaEl.textContent = dados.pergunta;
        spanPalavra.textContent = dados.palavraOriginal;
        inputResposta.value = ''; // Limpa o input de resposta
        
        // Mostra ou esconde a imagem principal dependendo se ela existe
        if (dados.imagemPrincipal) {
            imgContainer.style.display = 'flex';
            imgEl.src = dados.imagemPrincipal;
        } else {
            imgContainer.style.display = 'none';
        }
        
        // Define a ação do botão de áudio
        btnAudio.onclick = () => { 
            if (dados.audio) { // Toca o áudio apenas se o caminho existir
                new Audio(dados.audio).play(); 
            } else {
                console.warn("Nenhum arquivo de áudio definido para esta atividade.");
            }
        };

        // Habilita/desabilita o botão 'Verificar' com base no preenchimento do input
        inputResposta.addEventListener('input', () => {
            btnVerificar.disabled = inputResposta.value.trim() === '';
        });

        // Define a ação do botão 'Verificar' para este tipo de exercício
        btnVerificar.onclick = () => {
            // Compara a resposta do usuário (em minúsculas) com a resposta correta (em minúsculas)
            const respostaUsuario = inputResposta.value.trim().toLowerCase();
            const respostaCorreta = dados.respostaCorreta.trim().toLowerCase();
            verificarResposta(respostaUsuario === respostaCorreta, dados);
        };
    }

    // --- INICIA O FLUXO DA LIÇÃO ---
    carregarProximaAtividade();
});