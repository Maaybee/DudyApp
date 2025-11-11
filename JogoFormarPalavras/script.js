// Espera o HTML ser completamente carregado para iniciar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CONFIGURAÇÃO INICIAL ---

    // Lista de palavras local. Verifique se os caminhos das imagens estão corretos!
    const allWords = [
        { word: 'PIG', image: 'images/pig.png' },
        { word: 'CAT', image: 'images/cat.png' },
        { word: 'DOG', image: 'images/dog.png' },
        { word: 'SUN', image: 'images/sun.png' },
        // Adicione mais palavras aqui
    ];

    let currentWordData = {}; // A palavra da rodada atual

    // Elementos do DOM
    const imageElement = document.getElementById('object-image');
    const answerSlotsElement = document.getElementById('answer-slots');
    const letterBankElement = document.getElementById('letter-bank');
    const feedbackElement = document.getElementById('feedback');

    // --- 2. FUNÇÕES DO JOGO ---

    /**
     * Prepara a próxima rodada com uma palavra aleatória
     */
    function startNextRound() {
        if (allWords.length === 0) {
            feedbackElement.textContent = "Sem palavras para jogar.";
            return;
        }

        // Pega uma palavra aleatória da lista
        currentWordData = allWords[Math.floor(Math.random() * allWords.length)];
        
        // Limpa áreas do jogo
        answerSlotsElement.innerHTML = '';
        letterBankElement.innerHTML = '';
        feedbackElement.textContent = '';
        
        // Define a imagem principal
        imageElement.src = currentWordData.image; 
        imageElement.alt = `Objeto: ${currentWordData.word}`;

        // Embaralha as letras para o banco de letras
        const letters = currentWordData.word.split('').sort(() => Math.random() - 0.5);

        // Cria os elementos de letra
        letters.forEach((char, index) => {
            const letterDiv = document.createElement('div');
            letterDiv.textContent = char;
            letterDiv.classList.add('letter');
            letterDiv.draggable = true;
            // ID precisa ser único, especialmente se houver letras repetidas (ex: 'BEE')
            letterDiv.id = `letter-${char}-${index}`;
            letterBankElement.appendChild(letterDiv);
        });

        // Cria as lacunas de resposta
        for (let i = 0; i < currentWordData.word.length; i++) {
            const slotDiv = document.createElement('div');
            slotDiv.classList.add('slot');
            slotDiv.dataset.index = i; // Armazena o índice da posição correta
            answerSlotsElement.appendChild(slotDiv);
        }

        addDragAndDropHandlers();
    }

    /**
     * Verifica se a palavra formada está correta
     */
    function checkAnswer() {
        const slots = answerSlotsElement.querySelectorAll('.slot');
        let formedWord = '';
        let isComplete = true;

        slots.forEach(slot => {
            if (slot.firstChild) {
                formedWord += slot.firstChild.textContent;
            } else {
                isComplete = false; // Se alguma lacuna estiver vazia, não está completo
            }
        });

        // Só verifica a resposta se todas as lacunas estiverem preenchidas
        if (isComplete) {
            if (formedWord === currentWordData.word) {
                feedbackElement.textContent = 'Correct!';
                feedbackElement.style.color = '#28a745'; // Verde para acerto
                
                // *** AQUI É ONDE O JOGO CONTINUA ***
                // Espera 2 segundos e começa a próxima rodada
                setTimeout(startNextRound, 2000); 

            } else {
                feedbackElement.textContent = 'Try again!';
                feedbackElement.style.color = '#dc3545'; // Vermelho para erro
            }
        }
    }

    // --- 3. LÓGICA DE ARRASTAR E SOLTAR (DRAG & DROP) ---

    function addDragAndDropHandlers() {
        const letters = document.querySelectorAll('.letter');
        const slots = document.querySelectorAll('.slot');

        letters.forEach(letter => {
            letter.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.id);
                setTimeout(() => e.target.classList.add('dragging'), 0);

                const ghost = new Image();
        ghost.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        e.dataTransfer.setDragImage(ghost, 0, 0);
            });

            letter.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
            });
        });

        slots.forEach(slot => {
            slot.addEventListener('dragover', e => {
                e.preventDefault(); // Permite que o elemento seja solto aqui
            });

            slot.addEventListener('drop', e => {
                e.preventDefault();
                const draggedLetterId = e.dataTransfer.getData('text/plain');
                const draggedLetter = document.getElementById(draggedLetterId);
                
                // Se a lacuna estiver vazia, permite soltar a letra
                if (draggedLetter && !slot.firstChild) {
                    slot.appendChild(draggedLetter);
                    checkAnswer();
                }
            });
        });

        // Permite que as letras voltem para o banco de letras
        letterBankElement.addEventListener('dragover', e => e.preventDefault());
        letterBankElement.addEventListener('drop', e => {
            e.preventDefault();
            const draggedLetterId = e.dataTransfer.getData('text/plain');
            const draggedLetter = document.getElementById(draggedLetterId);
            if (draggedLetter) {
                letterBankElement.appendChild(draggedLetter);
                checkAnswer(); // Verifica o estado do jogo mesmo se a letra voltar
            }
        });
    }

    // --- INICIA O JOGO ---
    startNextRound(); // Começa a primeira rodada

});