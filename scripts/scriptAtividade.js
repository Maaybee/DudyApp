// scripts/scriptAtividade.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Referências aos elementos HTML ---
    const progressoAtual = document.getElementById('progresso-atual');
    const fecharBtn = document.querySelector('.fechar-btn'); // Botão "X" para voltar

    // Exercício de Associação de Imagem (Imagem 2)
    const exercicioAssociacao = document.getElementById('exercicio-associacao');
    const perguntaAssociacao = document.getElementById('pergunta-associacao');
    const opcoesImagem = document.getElementById('opcoes-imagem');
    const btnContinuarAssociacao = document.getElementById('btnContinuarAssociacao');

    // Exercício de Tradução (Imagem 3)
    const exercicioTraducao = document.getElementById('exercicio-traducao');
    const perguntaTraducao = document.getElementById('pergunta-traducao');
    const imagemPrincipal = document.getElementById('imagem-principal');
    const btnContinuarTraducao = document.getElementById('btnContinuarTraducao');

    // Exercício de Seleção de Texto (Imagem 1)
    const exercicioSelecaoTexto = document.getElementById('exercicio-selecao-texto');
    const perguntaSelecaoTexto = document.getElementById('pergunta-selecao-texto');
    const imagemSelecao = document.getElementById('imagem-selecao');
    const opcoesTexto = document.getElementById('opcoes-texto');
    const btnContinuarSelecao = document.getElementById('btnContinuarSelecao');

    // Modal de Lição Concluída
    const licaoConcluidaModal = document.getElementById('licao-concluida-modal');
    const btnVoltarMenu = document.getElementById('btnVoltarMenu');

    // --- Variáveis de Estado da Atividade ---
    let currentLessonId = null; // ID da lição atual (ex: "1" para Comidas)
    let currentActivities = []; // Array das atividades para a lição atual
    let currentActivityIndex = 0; // Índice da atividade atual no array
    let selectedOptionId = null; // Para guardar a opção selecionada em exercícios de múltipla escolha
    let isCorrectAnswerGiven = false; // Para habilitar o botão de continuar após a resposta correta

    // --- Funções de Ajuda ---

    // Obtém o parâmetro lessonId da URL
    function getLessonIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('lessonId');
    }

    // Esconde todos os containers de exercício
    function hideAllExercises() {
        exercicioAssociacao.style.display = 'none';
        exercicioTraducao.style.display = 'none';
        exercicioSelecaoTexto.style.display = 'none';
    }

    // Atualiza a barra de progresso visualmente
    function updateProgressBar() {
        if (currentActivities.length === 0) {
            progressoAtual.style.width = '0%';
            return;
        }
        const progressPercentage = ((currentActivityIndex) / currentActivities.length) * 100;
        progressoAtual.style.width = `${progressPercentage}%`;
    }

    // --- Lógica de Carregamento da Lição e Atividades ---

    function loadLesson() {
        currentLessonId = getLessonIdFromUrl();

        if (!currentLessonId || !licoesData[currentLessonId]) {
            console.error("Lição não encontrada ou ID inválido.");
            alert("Lição não encontrada! Redirecionando para o menu.");
            window.location.href = "telaDudyAcademy.html"; // Redireciona de volta
            return;
        }

        currentActivities = licoesData[currentLessonId].activities;
        currentActivityIndex = 0; // Inicia sempre na primeira atividade
        loadCurrentActivity();
    }

    function loadCurrentActivity() {
        hideAllExercises(); // Esconde todos os exercícios antes de renderizar o novo
        selectedOptionId = null; // Reseta a opção selecionada
        isCorrectAnswerGiven = false; // Reseta o estado da resposta

        if (currentActivityIndex >= currentActivities.length) {
            // Todas as atividades da lição foram concluídas
            showLessonCompletedModal();
            // AQUI: Salvar o progresso da lição como 100% no localStorage
            if (window.saveLessonProgress) { // Verifica se a função existe (do dudyAcademy.js)
                window.saveLessonProgress(currentLessonId, 100);
            } else {
                console.warn("Função saveLessonProgress não disponível. Progresso não salvo.");
            }
            return;
        }

        const activity = currentActivities[currentActivityIndex];

        // Desabilita os botões de continuar por padrão, eles serão habilitados
        // APENAS APÓS uma interação válida (seleção ou confirmação de tradução).
        btnContinuarAssociacao.disabled = true;
        btnContinuarTraducao.disabled = true;
        btnContinuarSelecao.disabled = true;


        switch (activity.type) {
            case "traducao":
                renderTraducaoActivity(activity);
                exercicioTraducao.style.display = 'flex';
                // Para tradução simples (como a Imagem 3 sem input), o "Continuar"
                // significa que o usuário "viu" a resposta, então pode habilitar.
                btnContinuarTraducao.disabled = false;
                break;
            case "associacao-imagem":
                renderAssociacaoImagemActivity(activity);
                exercicioAssociacao.style.display = 'flex';
                break;
            case "selecao-texto":
                renderSelecaoTextoActivity(activity);
                exercicioSelecaoTexto.style.display = 'flex';
                break;
            default:
                console.error("Tipo de atividade desconhecido:", activity.type);
                // Em caso de erro, avança para a próxima atividade para não travar
                currentActivityIndex++;
                loadCurrentActivity();
                break;
        }
        updateProgressBar();
    }

    // --- Funções de Renderização Específicas por Tipo de Atividade ---

    function renderTraducaoActivity(activity) {
        perguntaTraducao.innerHTML = `${activity.question} <span class="palavra-destaque">${activity.word}</span>`;
        imagemPrincipal.src = activity.image;
        imagemPrincipal.alt = activity.word;
        // Não há input de resposta nesta versão da tradução.
        // O botão "Continuar" aqui simplesmente avança.
    }

    function renderAssociacaoImagemActivity(activity) {
        perguntaAssociacao.innerHTML = `${activity.question} <span class="palavra-destaque">${activity.word}</span>`;
        opcoesImagem.innerHTML = ''; // Limpa opções anteriores

        activity.options.forEach(option => {
            const card = document.createElement('div');
            card.className = 'card-imagem';
            card.dataset.optionId = option.id;
            card.style.backgroundColor = option.bgColor;
            card.innerHTML = `<img src="${option.image}" alt="${option.text}"><p>${option.text}</p>`;

            card.addEventListener('click', () => {
                document.querySelectorAll('.card-imagem').forEach(c => c.classList.remove('selecionado'));
                card.classList.add('selecionado');
                selectedOptionId = option.id;
                btnContinuarAssociacao.disabled = false; // Habilita o botão ao selecionar
            });
            opcoesImagem.appendChild(card);
        });
    }

    function renderSelecaoTextoActivity(activity) {
        perguntaSelecaoTexto.innerHTML = `${activity.question} <span class="palavra-destaque">${activity.word}</span>`;
        imagemSelecao.src = activity.image;
        imagemSelecao.alt = activity.word;
        opcoesTexto.innerHTML = ''; // Limpa opções anteriores

        activity.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'opcao-texto';
            button.dataset.optionId = option.id;
            button.textContent = option.text;

            button.addEventListener('click', () => {
                document.querySelectorAll('.opcao-texto').forEach(b => b.classList.remove('selecionado', 'incorreto')); // Limpa seleções e feedbacks
                button.classList.add('selecionado');
                selectedOptionId = option.id;
                btnContinuarSelecao.disabled = false; // Habilita o botão ao selecionar
            });
            opcoesTexto.appendChild(button);
        });
    }

    // --- Lógica de Continuação/Verificação ---

    function handleContinuar(btn) {
        const activity = currentActivities[currentActivityIndex];
        let isAnswerCorrect = true; // Por padrão, avança se não houver verificação explícita

        if (activity.type === "associacao-imagem" || activity.type === "selecao-texto") {
            const options = activity.options;
            const selectedOption = options.find(opt => opt.id === selectedOptionId);
            isAnswerCorrect = selectedOption ? selectedOption.isCorrect : false;

            // AQUI: Feedback visual imediato ao clicar em continuar para seleção/associação
            if (selectedOption) {
                const element = document.querySelector(`[data-option-id="${selectedOption.id}"]`);
                if (isAnswerCorrect) {
                    element.classList.add('selecionado'); // Já está selecionado, pode reforçar
                    // Pode adicionar um feedback de sucesso aqui
                } else {
                    element.classList.add('incorreto'); // Mostra que a resposta está errada
                    // Opcional: mostrar qual seria a resposta correta por um breve momento
                    // Por simplicidade, vamos apenas marcar a incorreta e avançar.
                }
            }
        }
        
        // Em todas as atividades, após o clique em "Continuar", avançamos.
        // A lógica de "correto/incorreto" serve para feedback, mas o fluxo avança.
        currentActivityIndex++;
        
        // AQUI: Salvar progresso no localStorage após CADA atividade
        if (window.saveLessonProgress) {
            const newProgress = Math.floor((currentActivityIndex / currentActivities.length) * 100);
            window.saveLessonProgress(currentLessonId, newProgress);
        }

        loadCurrentActivity(); // Carrega a próxima atividade ou exibe o modal de conclusão
    }

    // --- Adição de Event Listeners ---
    btnContinuarAssociacao.addEventListener('click', () => handleContinuar(btnContinuarAssociacao));
    btnContinuarTraducao.addEventListener('click', () => handleContinuar(btnContinuarTraducao));
    btnContinuarSelecao.addEventListener('click', () => handleContinuar(btnContinuarSelecao));

    fecharBtn.addEventListener('click', () => {
        window.location.href = "telaDudyAcademy.html"; // Volta para a tela de lições
    });

    // --- Modal de Lição Concluída ---
    function showLessonCompletedModal() {
        licaoConcluidaModal.classList.add('active'); // Adiciona a classe 'active'
    }

    btnVoltarMenu.addEventListener('click', () => {
        window.location.href = "telaDudyAcademy.html"; // Redireciona para o menu de lições
    });

    // --- Início: Carrega a lição ao carregar a página ---
    loadLesson();
});