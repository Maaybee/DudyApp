document.addEventListener('DOMContentLoaded', () => {

    // ========================================================
    // DADOS COMPLETOS DO CURSO (MANTENHA SEUS DADOS AQUI)
    // ========================================================
    const modulesContent = {
        '1': {
            '1': [
                { id: '100', type: 'select_image', title: 'Selecione', highlight: 'Apple', correct: 'apple', options: [ { id: 'apple', image: '../assets/svg/apple.svg', color: '#d4f9d4' }, { id: 'banana', image: '../assets/svg/banana.svg', color: '#e9d5ff' }, { id: 'Grape', image: '../assets/svg/grape.svg', color: '#bae6fd' }, { id: 'Orange', image: '../assets/svg/orange.svg', color: '#ffd1dc' }, ]},
                { id: '101', type: 'select_word', title: 'Banana', image: '../assets/svg/banana.svg', imageColor: '#bae6fd', correct: 'Banana', options: ['Apple', 'Banana', 'Grapes'] },
                { id: '102', type: 'translate', title: 'Traduza', highlight: 'Orange', image: '../assets/svg/orange.svg', correct: ['Laranja', 'laraja'] },
                { id: '103', type: 'select_image', title: 'i eat', highlight: 'Bananas', correct: 'Banana', mascotImage: '../assets/svg/urso_banana.svg', options: [ { id: 'Banana', image: '../assets/svg/banana.svg', color: '#ffd1dc',  }, { id: 'apple', image: '../assets/svg/apple.svg', color: '#e9d5ff' } ]},
                { id: '104', type: 'select_word', title: 'Grape', image: '../assets/svg/grape.svg', imageColor: '#bae6fd', correct: 'Grapes', options: ['Apple', 'Banana', 'Grapes'] },
                { id: '105', type: 'translate', title: 'Traduza', highlight: 'I eat Bananas', image: '../assets/svg/banana.svg', correct: ['Eu como bananas', 'como bananas','eu como banana', 'como banana'] }
           
                
            ],
            '2': [
                { id: '106', type: 'select_image', title: 'Selecione', highlight: 'ice Cream', correct: 'Ice Cream', options: [ { id: 'Ice Cream', image: '../assets/svg/icecream.svg', color: '#d4f9d4' }, { id: 'fries', image: '../assets/svg/fries.svg', color: '#fff3e0' },{ id: 'pizza', image: '../assets/svg/pizza.svg', color: '#fff3e0' }, { id: 'chocolate', image: '../assets/svg/chocolate.svg', color: '#fff3e0' }]},
                { id: '107', type: 'select_word', title: 'Como se diz Batata frita?', image: '../assets/svg/fries.svg', imageColor: '#bae6fd', correct: 'Fries', options: ['Pizza', 'Fries', 'Juice'] },
                { id: '108', type: 'translate', title: 'Traduza', highlight: 'Chocolate', image: '../assets/svg/chocolate.svg', correct: ['Chocolate'] },
                { id: '109', type: 'select_image', title: 'I eat', highlight: 'Hamburguer', correct: 'Hamburguer',  mascotImage: '../assets/svg/urso_hamburguer.svg', options: [ { id: 'Hamburguer', image: '../assets/svg/hamburguer.svg', color: '#ffd1dc' }, { id: 'fries', image: '../assets/svg/fries.svg', color: '#d4f9d4' } ]},
                { id: '110', type: 'select_word', title: 'Como se diz sanduiche?', image: '../assets/svg/sandwich.svg', imageColor: '#bae6fd', correct: 'Sandwich', options: ['Pizza', 'Fries', 'Sandwich'] },
                { id: '111', type: 'translate', title: 'Traduza', highlight: 'Eu como batata frita', image: '../assets/svg/fries.svg', correct: ['I eat fries'] }
           
                
            ],
            '3': [
                { id: '112', type: 'select_image', title: 'Selecione', highlight: 'Grapes', correct: 'Grapes', options: [ { id: 'Grapes', image: '../assets/svg/grape.svg', color: '#ffd1dc' }, { id: 'sandwich', image: '../assets/svg/sandwich.svg', color: '#fff3e0' },{ id: 'cake', image: '../assets/svg/cake.svg', color: '#e9d5ff' },{ id: 'Orange', image: '../assets/svg/orange.svg', color: '#bae6fd' } ]},
                { id: '113', type: 'select_word', title: 'O que é isso?', image: '../assets/svg/apple.svg', imageColor: '#ffd1dc', correct: 'Apple', options: ['Juice', 'Water', 'Apple'] }, 
                { id: '114', type: 'translate', title: 'Traduza', highlight: 'Laranja', image: '../assets/svg/orange.svg', correct: ['Orange', 'oranges'] },
                { id: '115', type: 'select_image', title: 'i eat', highlight: 'grapes', correct: 'Grapes',  mascotImage: '../assets/svg/urso_grape.svg', options: [ { id: 'banana', image: '../assets/svg/banana.svg', color: '#ffd1dc' }, { id: 'Grapes', image: '../assets/svg/grape.svg', color: '#fff3e0' } ]},
                { id: '116', type: 'select_word', title: 'O que é isso?', image: '../assets/svg/strawberry.svg', imageColor: '#ffd1dc', correct: 'Strawberry', options: ['Strawberry', 'Apple', 'Banana'] }, 
                { id: '117', type: 'translate', title: 'Traduza', highlight: 'Strawberry', image: '../assets/svg/strawberry.svg', correct: ['morango', 'morago'] }
            ],
            '4': [
                { id: '118', type: 'select_image', title: 'Selecione', highlight: 'Water', correct: 'Water', options: [ { id: 'Milk', image: '../assets/svg/milk.svg', color: '#ffd1dc' }, { id: 'Juice', image: '../assets/svg/juice.svg', color: '#fff3e0' },{ id: 'Tea', image: '../assets/svg/tea.svg', color: '#d4f9d4' },{ id: 'Water', image: '../assets/svg/water.svg', color: '#e9d5ff' } ]},
                { id: '119', type: 'select_word', title: 'O que é isso?', image: '../assets/svg/milk.svg', imageColor: '#ffd1dc', correct: 'Milk', options: ['Juice', 'Water', 'Milk'] }, 
                { id: '120', type: 'translate', title: 'Traduza', highlight: 'Tea', image: '../assets/svg/tea.svg', correct: ['Chá', 'cha'] },
                { id: '121', type: 'select_image', title: 'i drink', highlight: 'water', correct: 'Water',  mascotImage: '../assets/svg/urso_water.svg', options: [ { id: 'juice', image: '../assets/svg/juice.svg', color: '#ffd1dc' }, { id: 'Water', image: '../assets/svg/water.svg', color: '#fff3e0' } ]},
                { id: '122', type: 'select_word', title: 'O que é isso?', image: '../assets/svg/soda.svg', imageColor: '#ffd1dc', correct: 'Soda', options: ['Water', 'Soda', 'Tea'] }, 
                { id: '123', type: 'translate', title: 'Traduza', highlight: 'Suco', image: '../assets/svg/juice.svg', correct: ['Juice', 'juice'] }
            ],
            '5': [
                { id: '106', type: 'select_image', title: 'Selecione', highlight: 'ice Cream', correct: 'Ice Cream', options: [ { id: 'Ice Cream', image: '../assets/svg/icecream.svg', color: '#d4f9d4' }, { id: 'fries', image: '../assets/svg/fries.svg', color:'#bae6fd' },{ id: 'pizza', image: '../assets/svg/pizza.svg', color: '#e9d5ff' }, { id: 'chocolate', image: '../assets/svg/chocolate.svg', color: '#fff3e0' }]},
                { id: '107', type: 'select_word', title: 'Como se diz Batata frita?', image: '../assets/svg/fries.svg', imageColor: '#bae6fd', correct: 'Fries', options: ['Pizza', 'Fries', 'Juice'] },
                { id: '108', type: 'translate', title: 'Traduza', highlight: 'Chocolate', image: '../assets/svg/chocolate.svg', correct: ['Chocolate'] },
                { id: '109', type: 'select_image', title: 'I eat', highlight: 'Hamburguer', correct: 'Hamburguer',  mascotImage: '../assets/svg/urso_hamburguer.svg', options: [ { id: 'Hamburguer', image: '../assets/svg/hamburguer.svg', color: '#ffd1dc' }, { id: 'fries', image: '../assets/svg/fries.svg', color: '#d4f9d4' } ]},
                { id: '110', type: 'select_word', title: 'Como se diz sanduiche?', image: '../assets/svg/sandwich.svg', imageColor: '#bae6fd', correct: 'Sandwich', options: ['Pizza', 'Fries', 'Sandwich'] },
                { id: '111', type: 'translate', title: 'Traduza', highlight: 'Eu como batata frita', image: '../assets/svg/fries.svg', correct: ['I eat fries'] }
           
            ]
        },
        // ... Mantenha os outros módulos (2 a 10) aqui ...
        '2': { '1': [], '2': [], '3': [], '4': [], '5': [] },
        '3': { '1': [], '2': [], '3': [], '4': [], '5': [] },
        '4': { '1': [], '2': [], '3': [], '4': [], '5': [] },
        '5': { '1': [], '2': [], '3': [], '4': [], '5': [] },
        '6': { '1': [], '2': [], '3': [], '4': [], '5': [] },
        '7': { '1': [], '2': [], '3': [], '4': [], '5': [] },
        '8': { '1': [], '2': [], '3': [], '4': [], '5': [] },
        '9': { '1': [], '2': [], '3': [], '4': [], '5': [] },
        '10': { '1': [], '2': [], '3': [], '4': [], '5': [] }
    };

    // ========================================================
    // CONFIGURAÇÃO E LÓGICA
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

        // ============================================================
        // 1. DEFINIÇÃO SEGURA DO URSINHO (ESTE CÓDIGO DEVE FICAR AQUI EM CIMA)
        // ============================================================
        // Se existir 'mascotImage' nos dados, cria o HTML. Se não, cria uma string vazia.
        const mascotHTML = activity.mascotImage ? `
            <div class="mascot-verb-container">
                <img src="${activity.mascotImage}" class="mascot-verb-img" alt="Urso Verbo">
            </div>
        ` : ''; 
        // ============================================================

        // --- TIPO 1: SELECT IMAGE ---
        if (activity.type === 'select_image') {
            container.innerHTML = `
                <h2 class="titulo-exercicio">${activity.title} <span class="palavra-destaque">${activity.highlight}</span></h2>
                ${mascotHTML} 
                <div class="opcoes-grid">
                    ${activity.options.map(opt => `
                        <div class="card-opcao card-imagem" style="background-color: ${opt.color};" data-value="${opt.id}">
                            <img src="${opt.image}" alt="${opt.id}" onerror="this.style.display='none'; this.parentElement.innerHTML='🖼️'"/>
                            <p class="card-label">${opt.id.charAt(0).toUpperCase() + opt.id.slice(1)}</p>
                        </div>
                    `).join('')}
                </div>`;
        }
        // --- TIPO 2: SELECT WORD ---
        else if (activity.type === 'select_word') {
            container.innerHTML = `
                <h2 class="titulo-exercicio">${activity.title}</h2>
                ${mascotHTML} 
                <div class="imagem-destaque" style="background-color: ${activity.imageColor || '#fff'};">
                    <img src="${activity.image}" alt="imagem" onerror="this.style.display='none'; this.parentElement.innerHTML='🖼️'"/>
                </div>
                <div class="opcoes-lista">
                    ${activity.options.map(opt => `
                        <div class="card-opcao card-texto" data-value="${opt}">${opt}</div>
                    `).join('')}
                </div>`;
        }
        // --- TIPO 3: TRANSLATE ---
        else if (activity.type === 'translate') {
            container.innerHTML = `
                <h2 class="titulo-exercicio">${activity.title}</h2>
                ${mascotHTML} 
                <span class="palavra-destaque-orange" data-original="${activity.highlight}" title="Clique para ver a tradução">${activity.highlight}</span>
                <div class="imagem-destaque" style="background-color: #fff3e0;">
                    <img src="${activity.image}" alt="imagem" onerror="this.style.display='none'; this.parentElement.innerHTML='🖼️'"/>
                </div>
                <textarea id="resposta-texto" class="area-texto" placeholder="Escreva aqui..."></textarea>
            `;
        }

        wrapper.appendChild(container);

        // --- LISTENERS (Mantidos iguais) ---
        if (activity.type === 'translate') {
            const textArea = document.getElementById('resposta-texto');
            const palavraDestaque = container.querySelector('.palavra-destaque-orange');
            
            if(palavraDestaque) {
                palavraDestaque.addEventListener('click', () => {
                    const original = palavraDestaque.dataset.original;
                    const traducao = Array.isArray(activity.correct) ? activity.correct[0] : activity.correct;
                    if (palavraDestaque.textContent === original) {
                        palavraDestaque.textContent = traducao;
                        palavraDestaque.classList.add('traduzido'); 
                    } else {
                        palavraDestaque.textContent = original;
                        palavraDestaque.classList.remove('traduzido'); 
                    }
                });
            }

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
        
        // Limpa conteúdo anterior
        const feedbackContent = feedbackArea.querySelector('.feedback-content');
        feedbackContent.innerHTML = ''; 

        if (isCorrect) {
            // --- ACERTOU ---
            feedbackArea.classList.add('correto');
            feedbackArea.classList.remove('erro');
            
            feedbackContent.innerHTML = `
                <div class="feedback-icon-circle">✔</div>
                <div class="feedback-text">
                    <h3>Incrível!</h3>
                </div>
            `;
        } else {
            // --- ERROU (COM GIF DO URSO) ---
            feedbackArea.classList.add('erro');
            feedbackArea.classList.remove('correto');

            let respostaParaMostrar = Array.isArray(activity.correct) ? activity.correct[0] : activity.correct;

            // Aqui mudamos para tag <IMG> apontando para o .gif
            feedbackContent.innerHTML = `
                <div class="feedback-text" style="width: 100%; text-align: center;">
                    <h3 style="margin-bottom: 5px;">Vamos tentar de novo!</h3>
                    <p style="font-size: 16px; color: #0056b3;">A resposta era: <strong>${respostaParaMostrar}</strong></p>
                </div>
                
                <div class="urso-erro-container">
                    <img src="../assets/video/dudy_erro.gif" class="urso-erro-img" alt="Urso Triste">
                </div>
            `;
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

    // ========================================================
    // SALVAMENTO ATUALIZADO (COM MEDALHAS NO NÍVEL 5)
    // ========================================================
    async function salvarNoBanco() {
        if (!idEstudante) {
            console.error("Erro: Nenhum estudante selecionado.");
            atualizarModalSucesso();
            return;
        }

        const PONTOS_GANHOS = 20;
        const PALAVRAS_NOVAS = 3; 

        try {
            // 1. Salva no histórico
            const { error: errorInsert } = await supabaseClient
                .from('estudantejogos')
                .insert({
                    idestudante: parseInt(idEstudante),
                    idjogos: parseInt(moduleId), 
                    pontuacaoobtida: PONTOS_GANHOS,
                    datarealizacao: new Date().toISOString()
                });

            if (errorInsert) throw errorInsert;

            // 2. Busca dados atuais (agora incluindo medalhas_total)
            const { data: estudanteData, error: errorSelect } = await supabaseClient
                .from('estudante')
                .select('pontuacao_total, palavras_total, medalhas_total')
                .eq('idestudante', parseInt(idEstudante))
                .single();

            if (errorSelect) throw errorSelect;

            // 3. Calcula novos totais
            const novaPontuacao = (estudanteData.pontuacao_total || 0) + PONTOS_GANHOS;
            const novasPalavras = (estudanteData.palavras_total || 0) + PALAVRAS_NOVAS;
            
            // LÓGICA DA MEDALHA: Se for nível 5, ganha +1 medalha
            let novasMedalhas = estudanteData.medalhas_total || 0;
            let ganhouMedalha = false;

            if (currentLevel === 5) {
                novasMedalhas += 1;
                ganhouMedalha = true;
            }

            // 4. Atualiza o perfil
            const { error: errorUpdate } = await supabaseClient
                .from('estudante')
                .update({ 
                    pontuacao_total: novaPontuacao,
                    palavras_total: novasPalavras,
                    medalhas_total: novasMedalhas // Atualiza medalhas
                })
                .eq('idestudante', parseInt(idEstudante));

            if (errorUpdate) throw errorUpdate;

            console.log(`Sucesso! Pontos: ${novaPontuacao}, Medalhas: ${novasMedalhas}`);
            atualizarModalSucesso(novaPontuacao, novasPalavras, ganhouMedalha);

        } catch (error) {
            console.error("Erro ao salvar:", error);
            mensagemModal.textContent = "Erro ao salvar dados, mas você concluiu!";
            btnFinalizar.disabled = false;
            btnFinalizar.textContent = "CONTINUAR";
        }
    }

    function atualizarModalSucesso(pontos, palavras, ganhouMedalha) {
        // Limpa o conteúdo anterior para montar o novo layout
        const conteudoModal = document.querySelector('.modal-conteudo');
        
        // Monta o HTML com o Vídeo e as informações
        let htmlContent = `
            <video class="video-conclusao" autoplay loop playsinline muted>
                <source src="../assets/video/conclusao.mp4" type="video/mp4">
                Seu navegador não suporta vídeo.
            </video>

            <h2 id="conclusao-titulo">Lição Completa! 🏆</h2>

            <div class="conclusao-pontos">
                +20 Pontos! ✨
            </div>
        `;

        // 4. MEDALHA EXTRA (SE HOUVER)
        if (ganhouMedalha) {
            htmlContent += `
                <div style="color: #ff9600; font-weight: bold; font-size: 18px; animation: popIn 0.5s infinite alternate;">
                    🏅 VOCÊ GANHOU UMA MEDALHA!
                </div>
            `;
        }

        // 5. PALAVRAS E DETALHES
        htmlContent += `
            <div class="conclusao-detalhes">
                <strong>+3 Palavras novas!</strong><br>
                Total aprendido: ${palavras || '...'} palavras
            </div>

            <button id="btn-finalizar-novo" class="btn-principal" style="background-color: #007bff; box-shadow: 0 6px 0 #0056b3; color: white;">
                CONTINUAR
            </button>
        `;

        // Injeta o HTML no modal
        conteudoModal.innerHTML = htmlContent;

        // Re-adiciona o evento de click no botão novo (pois o antigo foi apagado do DOM)
        document.getElementById('btn-finalizar-novo').addEventListener('click', () => {
            window.location.href = 'telaDudyAcademy.html';
        });
    }

    if (currentQueue.length === 0) {
        wrapper.innerHTML = `<h2 style="text-align:center; margin-top:50px; color:#aaa;">Nível vazio.</h2>`;
    } else {
        renderCurrentActivity();
    }
});