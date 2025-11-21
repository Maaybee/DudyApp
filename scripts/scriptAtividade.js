document.addEventListener('DOMContentLoaded', () => {

    // ========================================================
    // DADOS DAS LIÇÕES (IDS A PARTIR DE 100)
    // ========================================================
    const modulesContent = {
        // MÓDULO 1: COMIDAS
        '1': {
            // NÍVEL 1 (IDs 100 - 102)
            '1': [
                { 
                    id: '100', type: 'select_image', title: 'Selecione', highlight: 'Apple', correct: 'apple',
                    options: [
                        { id: 'orange', image: '../assets/img/orange.svg', color: '#ffd1dc' },
                        { id: 'apple', image: '../assets/img/apple.svg', color: '#d4f9d4' },
                        { id: 'banana', image: '../assets/img/banana.svg', color: '#bae6fd' },
                        { id: 'Milk', image: '../assets/img/leite.svg', color: '#e9d5ff' }
                    ]
                },
                { 
                    id: '101', type: 'translate', title: 'Traduza', highlight: 'Apple', 
                    image: '../assets/img/apple.svg', correct: ['Maçã', 'maça', 'Maça', 'maca']
                },
                { 
                    id: '102', type: 'select_word', title: 'Selecione o nome em inglês', 
                    image: '../assets/img/orange.svg', imageColor: '#d1e6fa', correct: 'Orange', 
                    options: ['Orange', 'Grape', 'Apple']
                }
            ],
            // NÍVEL 2 (IDs 103 - 105)
            '2': [
                { 
                    id: '103', type: 'select_word', title: 'Como se diz Banana?', 
                    image: '../assets/img/banana.svg', imageColor: '#ffe0b2',
                    correct: 'Banana', options: ['Apple', 'Banana', 'Carrot']
                },
                { 
                    id: '104', type: 'select_image', title: 'Selecione', highlight: 'Orange', correct: 'orange',
                    options: [
                        { id: 'banana', image: '../assets/svg/banana.svg', color: '#bae6fd' },
                        { id: 'orange', image: '../assets/svg/orange.svg', color: '#ffd1dc' },
                        { id: 'grape', image: '../assets/svg/grape.svg', color: '#e9d5ff' },
                    ]
                },
                { 
                    id: '105', type: 'translate', title: 'Traduza', highlight: 'Orange', 
                    image: '../assets/svg/orange_big.svg', correct: ['Laranja']
                }
            ],
            // NÍVEL 3 (IDs 106 - 108)
            '3': [
                { 
                    id: '106', type: 'translate', title: 'Traduza', highlight: 'Carrot', 
                    image: '../assets/svg/carrot_big.svg', correct: 'Cenoura'
                },
                { 
                    id: '107', type: 'select_image', title: 'Selecione', highlight: 'Broccoli', correct: 'broccoli',
                    options: [
                        { id: 'carrot', image: '../assets/svg/carrot.svg', color: '#ffe0b2' },
                        { id: 'broccoli', image: '../assets/svg/broccoli.svg', color: '#d4f9d4' },
                        { id: 'pizza', image: '../assets/svg/pizza.svg', color: '#ffd1dc' },
                    ]
                },
                { 
                    id: '108', type: 'select_word', title: 'Como se diz Batata?', 
                    image: '../assets/svg/potato_big.svg', imageColor: '#e9d5ff',
                    correct: 'Potato', options: ['Tomato', 'Potato', 'Onion']
                }
            ],
            // NÍVEL 4 (IDs 109 - 111)
            '4': [
                { 
                    id: '109', type: 'select_word', title: 'Selecione o nome em inglês', 
                    image: '../assets/svg/bread_big.svg', imageColor: '#fff3e0',
                    correct: 'Bread', options: ['Bread', 'Milk', 'Egg']
                },
                { 
                    id: '110', type: 'translate', title: 'Traduza', highlight: 'Milk', 
                    image: '../assets/svg/milk_big.svg', correct: 'Leite'
                },
                { 
                    id: '111', type: 'select_image', title: 'Selecione', highlight: 'Coffee', correct: 'coffee',
                    options: [
                        { id: 'milk', image: '../assets/svg/milk.svg', color: '#bae6fd' },
                        { id: 'coffee', image: '../assets/svg/coffee.svg', color: '#ffe0b2' },
                        { id: 'tea', image: '../assets/svg/tea.svg', color: '#d4f9d4' },
                    ]
                }
            ],
            // NÍVEL 5 (IDs 112 - 114)
            '5': [
                { 
                    id: '112', type: 'select_image', title: 'Selecione', highlight: 'Burger', correct: 'burger',
                    options: [
                        { id: 'pizza', image: '../assets/svg/pizza.svg', color: '#ffd1dc' },
                        { id: 'burger', image: '../assets/svg/burger.svg', color: '#d4f9d4' },
                        { id: 'fries', image: '../assets/svg/fries.svg', color: '#ffe0b2' },
                    ]
                },
                { 
                    id: '113', type: 'select_word', title: 'Selecione o nome em inglês', 
                    image: '../assets/svg/egg_big.svg', imageColor: '#ffe0b2',
                    correct: 'Egg', options: ['Egg', 'Bacon', 'Sausage']
                },
                { 
                    id: '114', type: 'translate', title: 'Traduza', highlight: 'Cheese', 
                    image: '../assets/svg/cheese_big.svg', correct: 'Queijo'
                }
            ]
        },
        
       
        '2': { '1': [], '2': [], '3': [], '4': [], '5': [] },
        '3': { '1': [], '2': [], '3': [], '4': [], '5': [] },
        '4': { '1': [], '2': [], '3': [], '4': [], '5': [] }
    };
    // ========================================================
    // CONFIGURAÇÃO
    // ========================================================
    const urlParams = new URLSearchParams(window.location.search);
    const moduleId = urlParams.get('moduleId') || '1';
    const currentLevel = parseInt(urlParams.get('level')) || 1;
    const idEstudante = localStorage.getItem("criancaSelecionada");

    let currentQueue = [];
    if (modulesContent[moduleId] && modulesContent[moduleId][currentLevel]) {
        currentQueue = [...modulesContent[moduleId][currentLevel]];
    }

    let totalQuestions = currentQueue.length;
    let completedCount = 0; 
    let currentState = 'idle'; 
    let currentSelection = null; 
    let isCorrect = false;

    const wrapper = document.getElementById('atividade-wrapper');
    const btnPrincipal = document.getElementById('btn-principal');
    const feedbackArea = document.getElementById('feedback-area');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackMessage = document.getElementById('feedback-message');
    const feedbackIcon = document.getElementById('feedback-icon');
    const progressBar = document.getElementById('progresso-atual');
    const modalConclusao = document.getElementById('licao-concluida-modal');
    const btnFinalizar = document.getElementById('btn-finalizar');
    const tituloModal = document.getElementById('conclusao-titulo');
    const mensagemModal = document.getElementById('conclusao-mensagem');

    // ========================================================
    // RENDERIZAÇÃO
    // ========================================================
    function updateProgress() {
        const percentage = totalQuestions === 0 ? 0 : (completedCount / totalQuestions) * 100;
        progressBar.style.width = `${percentage}%`;
    }

    function renderCurrentActivity() {
        wrapper.innerHTML = '';
        currentSelection = null;
        currentState = 'idle';
        resetFeedbackUI();

        if (currentQueue.length === 0) {
            finalizarNivel(); 
            return;
        }

        const activity = currentQueue[0];
        const container = document.createElement('div');
        container.className = 'exercicio-container';

        if (activity.type === 'select_image') {
            container.innerHTML = `
                <h2 class="titulo-exercicio">${activity.title} <span class="palavra-destaque">${activity.highlight}</span></h2>
                <div class="opcoes-grid">
                    ${activity.options.map(opt => `
                        <div class="card-opcao card-imagem" style="background-color: ${opt.color};" data-value="${opt.id}">
                            <img src="${opt.image}" alt="${opt.id}" onerror="this.style.display='none'; this.parentElement.innerHTML='🖼️'"/>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (activity.type === 'select_word') {
            container.innerHTML = `
                <h2 class="titulo-exercicio">${activity.title}</h2>
                <div class="imagem-destaque" style="background-color: ${activity.imageColor || '#fff'};">
                    <img src="${activity.image}" alt="imagem" onerror="this.style.display='none'; this.parentElement.innerHTML='🖼️'"/>
                </div>
                <div class="opcoes-lista">
                    ${activity.options.map(opt => `
                        <div class="card-opcao card-texto" data-value="${opt}">${opt}</div>
                    `).join('')}
                </div>`;
        }
        else if (activity.type === 'translate') {
            container.innerHTML = `
                <h2 class="titulo-exercicio">${activity.title}</h2>
                <span class="palavra-destaque-orange">${activity.highlight}</span>
                <div class="imagem-destaque" style="background-color: #fff3e0;">
                    <img src="${activity.image}" alt="imagem" onerror="this.style.display='none'; this.parentElement.innerHTML='🖼️'"/>
                </div>
                <textarea id="resposta-texto" class="area-texto" placeholder="Escreva em português..."></textarea>
            `;
        }

        wrapper.appendChild(container);

        if (activity.type === 'translate') {
            const textArea = document.getElementById('resposta-texto');
            textArea.addEventListener('input', (e) => {
                currentSelection = e.target.value;
                if (currentSelection.trim().length > 0) {
                    btnPrincipal.disabled = false;
                    btnPrincipal.classList.add('ativo');
                } else {
                    btnPrincipal.disabled = true;
                    btnPrincipal.classList.remove('ativo');
                }
            });
        } else {
            const cards = container.querySelectorAll('.card-opcao');
            cards.forEach(card => {
                card.addEventListener('click', () => handleOptionSelect(card, cards));
            });
        }
    }

    function handleOptionSelect(selectedCard, allCards) {
        if (currentState === 'checked') return;
        allCards.forEach(c => c.classList.remove('selecionado'));
        selectedCard.classList.add('selecionado');
        currentSelection = selectedCard.dataset.value;
        btnPrincipal.disabled = false;
        btnPrincipal.classList.add('ativo');
        btnPrincipal.innerText = "VERIFICAR";
    }

    btnPrincipal.addEventListener('click', () => {
        if (currentState === 'idle') {
            if (currentSelection) checkAnswer();
        } else if (currentState === 'checked') {
            nextQuestion();
        }
    });

    function checkAnswer() {
        const activity = currentQueue[0];
        let isCorrectAnswer = false;

        if (activity.type === 'translate') {
            const respostaUsuario = currentSelection.trim().toLowerCase();
            
            if (Array.isArray(activity.correct)) {
                const respostasAceitas = activity.correct.map(r => r.trim().toLowerCase());
                isCorrectAnswer = respostasAceitas.includes(respostaUsuario);
            } else {
                const respostaCerta = activity.correct.trim().toLowerCase();
                isCorrectAnswer = (respostaUsuario === respostaCerta);
            }
            
            const textArea = document.getElementById('resposta-texto');
            if(textArea) {
                textArea.disabled = true;
                textArea.classList.add(isCorrectAnswer ? 'correto' : 'incorreto');
            }
        } else {
            isCorrectAnswer = (currentSelection === activity.correct);
            const allCards = document.querySelectorAll('.card-opcao');
            allCards.forEach(card => {
                if (card.dataset.value === currentSelection) {
                    card.classList.remove('selecionado');
                    card.classList.add(isCorrectAnswer ? 'correto' : 'incorreto');
                }
            });
        }

        isCorrect = isCorrectAnswer;
        currentState = 'checked';
        feedbackArea.classList.add('com-feedback');
        
        if (isCorrect) {
            feedbackArea.classList.add('correto');
            feedbackTitle.innerText = "Incrível!";
            feedbackMessage.innerText = "";
            feedbackIcon.innerText = "✔"; 
        } else {
            feedbackArea.classList.add('erro');
            feedbackTitle.innerText = "Ops, errou!";
            
            let respostaParaMostrar = Array.isArray(activity.correct) ? activity.correct[0] : activity.correct;
            feedbackMessage.innerHTML = `A resposta correta é: <strong>${respostaParaMostrar}</strong>`;
            feedbackIcon.innerText = "✕"; 
        }
        btnPrincipal.innerText = "CONTINUAR";
    }

    function nextQuestion() {
        const finishedActivity = currentQueue.shift();
        if (isCorrect) {
            completedCount++;
            updateProgress();
        } else {
            currentQueue.push(finishedActivity);
        }
        renderCurrentActivity();
    }

    function resetFeedbackUI() {
        feedbackArea.classList.remove('com-feedback', 'correto', 'erro');
        btnPrincipal.disabled = true;
        btnPrincipal.classList.remove('ativo');
        btnPrincipal.innerText = "VERIFICAR";
    }

    // ========================================================
    // SALVAMENTO NO BANCO (COM PALAVRAS)
    // ========================================================

    async function finalizarNivel() {
        if (window.saveLessonProgress) {
            const percentPerLevel = 20; 
            const newTotalProgress = currentLevel * percentPerLevel;
            window.saveLessonProgress(moduleId, newTotalProgress);
        }

        tituloModal.textContent = `Nível ${currentLevel} Completo!`;
        mensagemModal.textContent = "Salvando...";
        modalConclusao.classList.add('visivel');
        btnFinalizar.disabled = true; 

        await salvarNoBanco();
    }

    async function salvarNoBanco() {
        if (!idEstudante) {
            console.error("Erro: Nenhum estudante selecionado.");
            atualizarModalSucesso();
            return;
        }

        const PONTOS_GANHOS = 20;
        const PALAVRAS_NOVAS = 4; // <--- Regra das 4 palavras novas

        try {
            // 1. Salva registro no histórico de jogos
            const { error: errorInsert } = await supabaseClient
                .from('estudantejogos')
                .insert({
                    idestudante: parseInt(idEstudante),
                    idjogos: parseInt(moduleId), 
                    pontuacaoobtida: PONTOS_GANHOS,
                    datarealizacao: new Date().toISOString()
                });

            if (errorInsert) throw errorInsert;

            // 2. Busca dados atuais (pontos E palavras)
            const { data: estudanteData, error: errorSelect } = await supabaseClient
                .from('estudante')
                .select('pontuacao_total, palavras_total') // <--- Pega as palavras também
                .eq('idestudante', parseInt(idEstudante))
                .single();

            if (errorSelect) throw errorSelect;

            // 3. Calcula novos totais
            const novaPontuacao = (estudanteData.pontuacao_total || 0) + PONTOS_GANHOS;
            const novasPalavras = (estudanteData.palavras_total || 0) + PALAVRAS_NOVAS; // <--- Soma as palavras

            // 4. Atualiza o perfil com ambos os valores
            const { error: errorUpdate } = await supabaseClient
                .from('estudante')
                .update({ 
                    pontuacao_total: novaPontuacao,
                    palavras_total: novasPalavras // <--- Salva no banco
                })
                .eq('idestudante', parseInt(idEstudante));

            if (errorUpdate) throw errorUpdate;

            console.log(`Sucesso! Pontos: ${novaPontuacao}, Palavras: ${novasPalavras}`);
            atualizarModalSucesso(novaPontuacao, novasPalavras);

        } catch (error) {
            console.error("Erro ao salvar:", error);
            mensagemModal.textContent = "Erro ao salvar dados, mas você concluiu!";
            btnFinalizar.disabled = false;
            btnFinalizar.textContent = "CONTINUAR";
        }
    }

    function atualizarModalSucesso(pontos, palavras) {
        mensagemModal.innerHTML = `
            <strong>+20 Pontos!</strong><br>
            <strong>+4 Palavras novas!</strong><br><br>
            Total de palavras aprendidas: ${palavras || '...'}
        `;
        btnFinalizar.disabled = false;
        btnFinalizar.textContent = "CONTINUAR";
    }

    btnFinalizar.addEventListener('click', () => {
        window.location.href = 'teladudyacademy.html';
    });

    // ========================================================
    // INICIALIZAÇÃO
    // ========================================================
    if (currentQueue.length === 0) {
        wrapper.innerHTML = `<h2 style="text-align:center; margin-top:50px; color:#aaa;">Nível vazio.</h2>`;
    } else {
        renderCurrentActivity();
    }
});