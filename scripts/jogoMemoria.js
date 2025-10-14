document.addEventListener('DOMContentLoaded', () => {
    const blocks = document.querySelectorAll('.block');
    const popupOverlay = document.getElementById('popupOverlay');
    const sairBtnPrincipal = document.getElementById('sair');
    const regressivaContainer = document.getElementById('container');
    const timeRegressivaElement = document.getElementById('regressiva');
    const cronometroElement = document.getElementById('time');
    const colors = ['#E8A763', '#408000', '#8C52FF', '#FFB8D2', '#FABB18', '#226699'];
    const shadow = ['#C88743', '#2F5E00', '#703BDA', '#D98BA7', '#D39D11', '#17496E'];

    let cards = [
        { id: 'idApple', image: '../assets/jogoMemoria/apple.svg', color: colors[0], boxShadow: shadow[0]  },
        { id: 'idApple2', image: '../assets/jogoMemoria/apple.svg', color: colors[0], boxShadow: shadow[0] },
        { id: 'idGrape', image: '../assets/jogoMemoria/grape.svg', color: colors[1], boxShadow: shadow[1] },
        { id: 'idGrape2', image: '../assets/jogoMemoria/grape.svg', color: colors[1], boxShadow: shadow[1] },
        { id: 'idStrawberry', image: '../assets/jogoMemoria/strawberry.svg', color: colors[2], boxShadow: shadow[2] },
        { id: 'idStrawberry2', image: '../assets/jogoMemoria/strawberry.svg', color: colors[2], boxShadow: shadow[2] },
        { id: 'idOrange', image: '../assets/jogoMemoria/orange.svg', color: colors[3], boxShadow: shadow[3] },
        { id: 'idOrange2', image: '../assets/jogoMemoria/orange.svg', color: colors[3], boxShadow: shadow[3] },
        { id: 'idWatermelon', image: '../assets/jogoMemoria/watermelon.svg', color: colors[4], boxShadow: shadow[4] },
        { id: 'idWatermelon2', image: '../assets/jogoMemoria/watermelon.svg', color: colors[4], boxShadow: shadow[4] },
        { id: 'idPineapple', image: '../assets/jogoMemoria/pineapple.svg', color: colors[5], boxShadow: shadow[5] },
        { id: 'idPineapple2', image: '../assets/jogoMemoria/pineapple.svg', color: colors[5], boxShadow: shadow[5] }
    ];

    let flippedCards = [];
    let matchedPairs = 0;
    let isGameOver = false;
    let contagemAtual = 3;
    let segundosJogo = 0;
    let cronometroIntervalo;

    function formatarTempo(segundos) {
        const minutos = String(Math.floor(segundos / 60)).padStart(2, '0');
        const secs = String(segundos % 60).padStart(2, '0');
        return `${minutos}:${secs}`;
    }

    function iniciarCronometroJogo() {
        cronometroIntervalo = setInterval(() => {
            segundosJogo++;
            cronometroElement.textContent = formatarTempo(segundosJogo);
        }, 1000);
    }

    function embaralharCartas() {
        cards = cards.sort(() => Math.random() - 0.5); // Embaralha as cartas
        blocks.forEach((block, index) => {
            const img = block.querySelector('img');

            block.setAttribute('data-id', cards[index].id);  // Define o id da carta
            img.src = '../assets/memorygame.svg';  // Coloca o verso da carta inicialmente
            block.style.backgroundColor = '#0262FF';  // Cor de fundo
            block.style.boxShadow = ''; // Limpa a sombra inicial
        });
    }   

    function virarCarta(block) {
        if (block.classList.contains('flipped') || isGameOver || block.classList.contains('fixed')) return;

        const cardId = block.getAttribute('data-id'); // Pega o id da carta virada
        const card = cards.find(c => c.id === cardId); // Encontra o objeto correspondente à carta
        
        if (!card) {
            console.warn('Carta não encontrada para id:', cardId);
            return;
        }

        block.classList.add('flipped');  // Marca a carta como virada
        const img = block.querySelector('img');
        img.src = card.image;  // Coloca a imagem da carta virada (imagem da frente)
        block.style.backgroundColor = card.color;  // Aplica a cor de fundo da carta
        block.style.boxShadow = `6px 6px ${card.boxShadow}`;  // Aplica a sombra da carta

        flippedCards.push(block);  // Adiciona a carta à lista de cartas viradas

        if (flippedCards.length === 2) {
            checkForMatch();  // Checa se as cartas viradas formam um par
        }
    }

    function checkForMatch() {
        const [firstCard, secondCard] = flippedCards;
        if (!firstCard || !secondCard) {
            flippedCards = [];
            return;
        }
    
        if (firstCard.getAttribute('data-id') === secondCard.getAttribute('data-id')) {
            matchedPairs++;  // Par de cartas correto encontrado
            firstCard.classList.add('fixed');
            secondCard.classList.add('fixed');
            
            // As cartas corretas permanecem viradas
            firstCard.classList.add('flipped');
            secondCard.classList.add('flipped');
            flippedCards = [];
        
            if (matchedPairs === cards.length / 2) {
                setTimeout(() => {
                    window.location.href = '../telas/finalJogo.html';
                }, 1000);
            }
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                firstCard.querySelector('img').src = '../assets/memorygame.svg';  // Coloca o verso da carta
                secondCard.querySelector('img').src = '../assets/memorygame.svg';  // Coloca o verso da carta
                firstCard.style.backgroundColor = '#0262FF';  // Cor de fundo do verso
                secondCard.style.backgroundColor = '#0262FF';  // Cor de fundo do verso
                firstCard.style.boxShadow = ''; // Remove a sombra
                secondCard.style.boxShadow = ''; // Remove a sombra
                flippedCards = [];
            }, 1000);  // Tempo de espera para virar as cartas de volta
        }
    }

    blocks.forEach(block => {
        block.addEventListener('click', () => virarCarta(block));
    });

    function iniciarJogo() {
        regressivaContainer.style.display = 'none'; // Esconde o contador
        embaralharCartas(); // Embaralha as cartas

        // Mostrar todas as cartas por 5 segundos
        blocks.forEach(block => {
            block.classList.add('flipped');
            const img = block.querySelector('img');
            const card = cards.find(c => c.id === block.getAttribute('data-id'));
            if (card) {
                img.src = card.image;
                block.style.backgroundColor = card.color;
                block.style.boxShadow = `6px 6px ${card.boxShadow}`;
            }
        });

        // Após 5 segundos, esconda novamente as cartas e inicie o cronômetro
        setTimeout(() => {
            blocks.forEach(block => {
                if (!block.classList.contains('fixed')) {
                    block.classList.remove('flipped');
                    const img = block.querySelector('img');
                    img.src = '../assets/memorygame.svg';
                    block.style.backgroundColor = '#0262FF';
                    block.style.boxShadow = '';
                }
            });
            iniciarCronometroJogo(); // Inicia o cronômetro do jogo
        }, 5000);
    }   


    const regressivaIntervalo = setInterval(() => {
        contagemAtual--;
        timeRegressivaElement.textContent = contagemAtual;
        if (contagemAtual <= 0) {
            clearInterval(regressivaIntervalo);
            iniciarJogo();
        }
    }, 1000);

    sairBtnPrincipal.addEventListener('click', () => {
        clearInterval(cronometroIntervalo);
        popupOverlay.classList.add('active');
    });

    popupOverlay.querySelector('#btnSair').addEventListener('click', () => {
        window.location.href = '../telas/tela_escolhaJogos.html';
    });

    popupOverlay.querySelector('#btnVoltar').addEventListener('click', () => {
        iniciarCronometroJogo();
        popupOverlay.classList.remove('active');
    });
});
