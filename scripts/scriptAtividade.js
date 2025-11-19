document.addEventListener('DOMContentLoaded', () => {
    
    // ========================================================
    // DADOS DAS LIÇÕES (ATUALIZADOS PARA DIGITAÇÃO)
    // ========================================================
    const modulesContent = {
        // MÓDULO 1: COMIDAS 
        '1': {
            // NÍVEL 1
            '1': [
                { 
                    id: 'mod1_niv1_q1', type: 'select_image', title: 'escolha-imagem', highlight: 'Book', correct: 'book',
                    options: [
                        { id: 'orange', image: '🍊', color: '#ffd1dc' },
                        { id: 'apple', image: '🍎', color: '#d4f9d4' },
                        { id: 'banana', image: '🍌', color: '#bae6fd' },
                        { id: 'book', image: '📕', color: '#e9d5ff' } 
                    ]
                },
                // TRADUÇÃO: Removi 'options', agora só importa o 'correct'
                { 
                    id: 'mod1_niv1_q2', type: 'translate', title: 'traducao', highlight: 'Apple', image: '🍎', correct: 'Maçã'
                },
                { 
                    id: 'mod1_niv1_q3', type: 'select_word', title: 'escolha-palavra', image: '🏠', imageColor: '#d1e6fa',
                    correct: 'House', options: ['House', 'Cat', 'AirPlane']
                },
                { 
                    id: 'mod1_niv1_q4', type: 'select_image', title: 'escolha-imagem', highlight: 'Book', correct: 'book',
                    options: [
                        { id: 'orange', image: '🍊', color: '#ffd1dc' },
                        { id: 'apple', image: '🍎', color: '#d4f9d4' },
                        { id: 'banana', image: '🍌', color: '#bae6fd' },
                        { id: 'book', image: '📕', color: '#e9d5ff' } 
                    ]
                },
                 { 
                    id: 'mod1_niv1_q5', type: 'translate', title: 'traducao', highlight: 'Apple', image: '🍎', correct: 'Maçã'
                }
            ],
            // NÍVEL 2
            '2': [
                { 
                    id: 'mod1_niv2_q1', type: 'select_word', title: 'escolha-palavra', image: '🍌', imageColor: '#ffe0b2',
                    correct: 'Banana', options: ['Apple', 'Banana', 'Carrot']
                },
                { 
                    id: 'mod1_niv2_q2', type: 'select_image', title: 'escolha-imagem', highlight: 'Orange', correct: 'orange',
                    options: [
                        { id: 'banana', image: '🍌', color: '#bae6fd' },
                        { id: 'orange', image: '🍊', color: '#ffd1dc' },
                        { id: 'grape', image: '🍇', color: '#e9d5ff' },
                    ]
                },
                { 
                    id: 'mod1_niv2_q3', type: 'translate', title: 'traducao', highlight: 'Orange', image: '🍊', correct: 'Laranja'
                }
            ],
            // NÍVEL 3
            '3': [
                { 
                    id: 'mod1_niv3_q1', type: 'translate', title: 'traducao', highlight: 'Carrot', image: '🥕', correct: 'Cenoura'
                },
                { 
                    id: 'mod1_niv3_q2', type: 'select_image', title: 'escolha-imagem', highlight: 'Broccoli', correct: 'broccoli',
                    options: [
                        { id: 'carrot', image: '🥕', color: '#ffe0b2' },
                        { id: 'broccoli', image: '🥦', color: '#d4f9d4' },
                        { id: 'pizza', image: '🍕', color: '#ffd1dc' },
                    ]
                },
                { 
                    id: 'mod1_niv3_q3', type: 'select_word', title: 'escolha-palavra', image: '🥔', imageColor: '#e9d5ff',
                    correct: 'Potato', options: ['Tomato', 'Potato', 'Onion']
                }
            ],
            // NÍVEL 4
            '4': [
                { 
                    id: 'mod1_niv4_q1', type: 'select_word', title: 'escolha-palavra', image: '🍞', imageColor: '#fff3e0',
                    correct: 'Bread', options: ['Bread', 'Milk', 'Egg']
                },
                { 
                    id: 'mod1_niv4_q2', type: 'translate', title: 'traducao', highlight: 'Milk', image: '🥛', correct: 'Leite'
                },
                { 
                    id: 'mod1_niv4_q3', type: 'select_image', title: 'escolha-imagem', highlight: 'Coffee', correct: 'coffee',
                    options: [
                        { id: 'milk', image: '🥛', color: '#bae6fd' },
                        { id: 'coffee', image: '☕', color: '#ffe0b2' },
                        { id: 'tea', image: '🍵', color: '#d4f9d4' },
                    ]
                }
            ],
            // NÍVEL 5
            '5': [
                { 
                    id: 'mod1_niv5_q1', type: 'select_image', title: 'escolha-imagem', highlight: 'Burger', correct: 'burger',
                    options: [
                        { id: 'pizza', image: '🍕', color: '#ffd1dc' },
                        { id: 'burger', image: '🍔', color: '#d4f9d4' },
                        { id: 'fries', image: '🍟', color: '#ffe0b2' },
                    ]
                },
                { 
                    id: 'mod1_niv5_q2', type: 'select_word', title: 'escolha-palavra', image: '🍳', imageColor: '#ffe0b2',
                    correct: 'Egg', options: ['Egg', 'Bacon', 'Sausage']
                },
                { 
                    id: 'mod1_niv5_q3', type: 'translate', title: 'traducao', highlight: 'Cheese', image: '🧀', correct: 'Queijo'
                }
            ]
        },
        
        '2': { '1': [], '2': [], '3': [], '4': [], '5': [] },
        '3': { '1': [], '2': [], '3': [], '4': [], '5': [] },
        '4': { '1': [], '2': [], '3': [], '4': [], '5': [] }
    };

    // ========================================================
    // LÓGICA DO PROGRAMA
    // ========================================================
    const urlParams = new URLSearchParams(window.location.search);
    const moduleId = urlParams.get('moduleId') || '1';
    const currentLevel = parseInt(urlParams.get('level')) || 1;

    let currentQueue = [];
    if (modulesContent[moduleId] && modulesContent[moduleId][currentLevel]) {
        currentQueue = [...modulesContent[moduleId][currentLevel]];
    }

    let totalQuestions = currentQueue.length;
    let completedCount = 0; 
    let currentState = 'idle'; 
    let currentSelection = null; 
    let isCorrect = false;

    // DOM Elements
    const wrapper = document.getElementById('atividade-wrapper');
    const btnPrincipal = document.getElementById('btn-principal');
    const feedbackArea = document.getElementById('feedback-area');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackMessage = document.getElementById('feedback-message');
    const feedbackIcon = document.getElementById('feedback-icon');
    const progressBar = document.getElementById('progresso-atual');
    const modalConclusao = document.getElementById('licao-concluida-modal');
    const btnFinalizar = document.getElementById('btn-finalizar');

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
            showSummary();
            return;
        }

        const activity = currentQueue[0];
        const container = document.createElement('div');
        container.className = 'exercicio-container';

        // --- LÓGICA DE RENDERIZAÇÃO ---
        if (activity.type === 'select_image') {
            container.innerHTML = `
                <h2 class="titulo-exercicio">escolha-imagem <span class="palavra-destaque">${activity.highlight}</span></h2>
                <div class="opcoes-grid">
                    ${activity.options.map(opt => `
                        <div class="card-opcao card-imagem" style="background-color: ${opt.color};" data-value="${opt.id}">
                            <span style="pointer-events:none">${opt.image}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (activity.type === 'select_word') {
            container.innerHTML = `
                <h2 class="titulo-exercicio">escolha-palavra</h2>
                <div class="imagem-destaque" style="background-color: ${activity.imageColor || '#ffe0b2'};">
                    ${activity.image.startsWith('http') ? `<img src="${activity.image}" alt="${activity.image}" />` : activity.image}
                </div>
                <div class="opcoes-lista">
                    ${activity.options.map(opt => `
                        <div class="card-opcao card-texto" data-value="${opt}">${opt}</div>
                    `).join('')}
                </div>`;
        }
        // --- AQUI MUDOU: INPUT DE TEXTO ---
        else if (activity.type === 'translate') {
            container.innerHTML = `
                <h2 class="titulo-exercicio">traducao</h2>
                <span class="palavra-destaque-orange">${activity.highlight}</span>
                <div class="imagem-destaque" style="background-color: #ffe0b2;">
                    ${activity.image.startsWith('http') ? `<img src="${activity.image}" alt="${activity.image}" />` : activity.image}
                </div>
                
                <textarea id="resposta-texto" class="area-texto" placeholder="Escreva em português"></textarea>
            `;
        }

        wrapper.appendChild(container);

        // LISTENERS
        if (activity.type === 'translate') {
            // Listener para Digitação
            const textArea = document.getElementById('resposta-texto');
            textArea.addEventListener('input', (e) => {
                currentSelection = e.target.value; // Armazena o que foi digitado
                
                // Habilita botão se tiver texto
                if (currentSelection.trim().length > 0) {
                    btnPrincipal.disabled = false;
                    btnPrincipal.classList.add('ativo');
                } else {
                    btnPrincipal.disabled = true;
                    btnPrincipal.classList.remove('ativo');
                }
            });
        } else {
            // Listener para Click (Botões)
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
        
        // --- VERIFICAÇÃO ---
        let isCorrectAnswer = false;

        if (activity.type === 'translate') {
            // Compara Texto (ignora espaços e maiúsculas)
            const respostaUsuario = currentSelection.trim().toLowerCase();
            const respostaCerta = activity.correct.trim().toLowerCase();
            isCorrectAnswer = (respostaUsuario === respostaCerta);

            // Feedback visual no textarea
            const textArea = document.getElementById('resposta-texto');
            if(textArea) {
                textArea.disabled = true; // Bloqueia digitação
                textArea.classList.add(isCorrectAnswer ? 'correto' : 'incorreto');
            }

        } else {
            // Compara ID/Valor do botão
            isCorrectAnswer = (currentSelection === activity.correct);
            
            // Feedback visual nos cards
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
            feedbackMessage.innerHTML = `A resposta correta é: <strong>${activity.correct}</strong>`;
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

    function showSummary() {
        if (window.saveLessonProgress) {
            const percentPerLevel = 20; 
            const newTotalProgress = currentLevel * percentPerLevel;
            window.saveLessonProgress(moduleId, newTotalProgress);
        }
        document.getElementById('conclusao-titulo').textContent = `Nível ${currentLevel} Completo!`;
        modalConclusao.classList.add('visivel');
    }

    btnFinalizar.addEventListener('click', () => {
        window.location.href = 'teladudyacademy.html';
    });

    // Inicializa
    if (currentQueue.length === 0) {
        wrapper.innerHTML = `<h2 style="text-align:center; margin-top:50px; color:#888;">Nível vazio.</h2>`;
    } else {
        renderCurrentActivity();
    }
});
