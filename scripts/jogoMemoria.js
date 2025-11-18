document.addEventListener('DOMContentLoaded', () => {

    const idEstudante = localStorage.getItem("criancaSelecionada"); 
    const ID_JOGO_MEMORIA = 8; 

    let recordeAnteriorString = "99:99"; 
    let pontuacaoAcumuladaAnterior = 0;
    let isNewPlayer = true; 

    // 2. Seletores DOM e Constantes do Jogo
    const blocks = document.querySelectorAll('.block');
    const popupOverlay = document.getElementById('popupOverlay');
    const sairBtnPrincipal = document.getElementById('sair');
    const regressivaContainer = document.getElementById('container');
    const timeRegressivaElement = document.getElementById('regressiva');
    const cronometroElement = document.getElementById('time');
    const pontuacaoTotal = 80; 
    const colors = ['#FCE5B8', '#98E8AC', '#DFB8FC', '#FCB8EF', '#FFD278', '#5590BC'];
    const shadow = ['#D2B98A', '#6FBC82', '#C6A7DD', '#D894CB', '#E5B75A', '#3077AE'];
    const fontColor = ['#DBA778','#50A766','#B679E4','#DB5DC3','#E4AB39','#1A5F94']

    let pontuacaoAtual = pontuacaoTotal;

    let cards = [
        { id: 'idApple', name: 'Maçã', image: '../assets/jogoMemoria/apple.svg', color: colors[0], boxShadow: shadow[0], fontColor: fontColor[0]},
        { id: 'idApple2', name: 'Maçã', image: '../assets/jogoMemoria/apple.svg', color: colors[0], boxShadow: shadow[0], fontColor: fontColor[0]},
        
        { id: 'idGrape', name: 'Uva', image: '../assets/jogoMemoria/grape.svg', color: colors[1], boxShadow: shadow[1], fontColor: fontColor[1] },
        { id: 'idGrape2', name: 'Uva', image: '../assets/jogoMemoria/grape.svg', color: colors[1], boxShadow: shadow[1], fontColor: fontColor[1] },
        
        { id: 'idStrawberry', name: 'Morango', image: '../assets/jogoMemoria/strawberry.svg', color: colors[2], boxShadow: shadow[2], fontColor: fontColor[2] },
        { id: 'idStrawberry2', name: 'Morango', image: '../assets/jogoMemoria/strawberry.svg', color: colors[2], boxShadow: shadow[2], fontColor: fontColor[2] },
        
        { id: 'idOrange', name: 'Laranja', image: '../assets/jogoMemoria/orange.svg', color: colors[3], boxShadow: shadow[3], fontColor: fontColor[3] },
        { id: 'idOrange2', name: 'Laranja', image: '../assets/jogoMemoria/orange.svg', color: colors[3], boxShadow: shadow[3], fontColor: fontColor[3] },
        
        { id: 'idWatermelon', name: 'Melancia', image: '../assets/jogoMemoria/watermelon.svg', color: colors[4], boxShadow: shadow[4], fontColor: fontColor[4] },
        { id: 'idWatermelon2', name: 'Melancia', image: '../assets/jogoMemoria/watermelon.svg', color: colors[4], boxShadow: shadow[4], fontColor: fontColor[4] },
        
        { id: 'idPineapple', name: 'Abacaxi', image: '../assets/jogoMemoria/pineapple.svg', color: colors[5], boxShadow: shadow[5], fontColor: fontColor[5] },
        { id: 'idPineapple2', name: 'Abacaxi', image: '../assets/jogoMemoria/pineapple.svg', color: colors[5], boxShadow: shadow[5], fontColor: fontColor[5] }
    ];

    let flippedCards = [];
    let matchedPairs = 0;
    let contagemAtual = 3;
    let segundosJogo = 0;
    let cronometroIntervalo;
    let lockBoard = false; 

    function formatarTempo(segundos) {
        const minutos = String(Math.floor(segundos / 60)).padStart(2, '0');
        const secs = String(segundos % 60).padStart(2, '0');
        return `${minutos}:${secs}`;
    }

    function tempoParaSegundos(tempoFormatado) {
        const [min, sec] = tempoFormatado.split(':').map(Number);
        return (min * 60) + sec;
    }

    function iniciarCronometroJogo() {
        cronometroIntervalo = setInterval(() => {
            segundosJogo++;
            pontuacaoAtual -= 0.5;
            if (pontuacaoAtual < 0) pontuacaoAtual = 0;
            cronometroElement.textContent = formatarTempo(segundosJogo);
        }, 1000);
    }

    async function carregarRecorde() {
        if (!idEstudante) {
            console.error('ID do estudante não encontrado.');
            return;
        }

        try {
            const { data, error, status } = await supabaseClient
                .from('estudantejogos')
                .select('Record, pontuacaoobtida')
                .eq('idestudante', idEstudante)
                .eq('idjogos', ID_JOGO_MEMORIA)
                .single(); 

            if (error && status !== 406) throw error;

            if (data) {
                recordeAnteriorString = data.Record || "99:99";
                pontuacaoAcumuladaAnterior = data.pontuacaoobtida || 0;
                isNewPlayer = false;
                console.log(`✅ Recorde anterior: ${recordeAnteriorString}, Pontuação acumulada: ${pontuacaoAcumuladaAnterior}`);
            } else {
                console.log('Jogador novo, nenhum registro anterior encontrado.');
                isNewPlayer = true;
            }

        } catch (error) {
            console.error('❌ Erro ao carregar recorde:', error.message || error);
            isNewPlayer = true; 
        }
    }

    async function salvarNovoRecorde(novoRecordeString, pontuacaoObtidaAgora) {
        const novaPontuacaoTotal = pontuacaoAcumuladaAnterior + pontuacaoObtidaAgora;

        const dadosParaSalvar = {
            idestudante: idEstudante,
            idjogos: ID_JOGO_MEMORIA,
            Record: novoRecordeString,
            pontuacaoobtida: novaPontuacaoTotal,
        };

        try {
            let response;
            if (isNewPlayer) {
                response = await supabaseClient
                    .from('estudantejogos')
                    .insert([dadosParaSalvar]);
                console.log('✅ Primeiro registro inserido!');
            } else {
                response = await supabaseClient
                    .from('estudantejogos')
                    .update(dadosParaSalvar)
                    .eq('idestudante', idEstudante)
                    .eq('idjogos', ID_JOGO_MEMORIA);
                console.log('✅ Recorde/pontuação atualizados!');
            }

            if (response.error) throw response.error;


            pontuacaoAcumuladaAnterior = novaPontuacaoTotal;
            recordeAnteriorString = novoRecordeString;
            isNewPlayer = false;

        } catch (error) {
            console.error('❌ Erro ao salvar recorde:', error.message || error);
            alert(`Erro ao salvar recorde: ${error.message || error}`);
        }
    }

    // FUNÇÕES DE JOGO
    // ----------------------------------------------------------------------

    function embaralharCartas() {
        cards = cards.sort(() => Math.random() - 0.5); 
        blocks.forEach((block, index) => {
            const img = block.querySelector('img');
            const cardId = cards[index].id;
            const matchKey = cardId.endsWith('2') ? cardId.slice(0, -1) : cardId; 
            
            block.setAttribute('data-id', cardId);        
            block.setAttribute('data-match-id', matchKey); 
            
            img.src = '../assets/memorygame.svg';  
            block.style.backgroundColor = '#6FD3F5';  
            block.style.boxShadow = '#54B8DA';

            // --- NOVO CÓDIGO PARA CRIAR O TEXTO ---
            // Remove texto antigo se existir (para não duplicar)
            const oldText = block.querySelector('.card-text');
            if(oldText) oldText.remove();

            // Cria o novo elemento de texto
            const p = document.createElement('p');
            p.classList.add('card-text');
            p.textContent = cards[index].name; // Pega o nome "Maçã", "Uva"...
            p.style.color = cards[index].fontColor; // APLICA A COR AQUI
            
            // Adiciona o texto dentro do bloco
            block.appendChild(p);
            // --------------------------------------
        });
    }

    function virarCarta(block) {
        if (lockBoard || block.classList.contains('flipped') || block.classList.contains('fixed')) return;

        const cardId = block.getAttribute('data-id'); 
        const card = cards.find(c => c.id === cardId); 
        if (!card) return;

        block.classList.add('flipped'); 
        const img = block.querySelector('img');
        img.src = card.image; 
        block.style.backgroundColor = card.color;  
        block.style.boxShadow = `6px 6px ${card.boxShadow}`;  
        
        // --- ADICIONE ESTA LINHA ---
        block.style.color = card.fontColor; 
        // ---------------------------

        flippedCards.push(block); 

        if (flippedCards.length === 2) {
            lockBoard = true; 
            checkForMatch();
        }
    }

    function checkForMatch() {
        const [firstCard, secondCard] = flippedCards;
        const matchId1 = firstCard.getAttribute('data-match-id');
        const matchId2 = secondCard.getAttribute('data-match-id');
        
        if (matchId1 === matchId2) {
            matchedPairs++; 
            firstCard.classList.add('fixed');
            secondCard.classList.add('fixed');
            flippedCards = [];
            lockBoard = false; 

            if (matchedPairs === cards.length / 2) {
                clearInterval(cronometroIntervalo);

                const tempoFinalFormatado = cronometroElement.textContent;
                const tempoFinalSegundos = tempoParaSegundos(tempoFinalFormatado);
                const recordeAnteriorSegundos = tempoParaSegundos(recordeAnteriorString);
                const pontuacaoObtidaAgora = Math.ceil(pontuacaoAtual);

                console.log(`🏁 Jogo finalizado! Pontuação obtida: ${pontuacaoObtidaAgora}`);

                localStorage.setItem('pontuacaoMemoria', pontuacaoObtidaAgora);
                localStorage.setItem('memoriaTime', tempoFinalFormatado);

                // atualiza o recorde de tempo
                if (isNewPlayer || tempoFinalSegundos < recordeAnteriorSegundos) {
                    salvarNovoRecorde(tempoFinalFormatado, pontuacaoObtidaAgora);
                    localStorage.setItem('memoriaNovoRecorde', 'true');
                } else {
                    salvarNovoRecorde(recordeAnteriorString, pontuacaoObtidaAgora);
                    localStorage.setItem('memoriaNovoRecorde', 'false');
                }

                setTimeout(() => {
                    window.location.href = '../telas/telaResultado_memoria.html';
                }, 1000);
            }

        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                firstCard.querySelector('img').src = '../assets/memorygame.svg';
                secondCard.querySelector('img').src = '../assets/memorygame.svg';
                firstCard.style.backgroundColor = '#6FD3F5';
                secondCard.style.backgroundColor = '#6FD3F5';
                firstCard.style.boxShadow = '';
                secondCard.style.boxShadow = '';
                
                // --- ADICIONE ESTAS LINHAS (Limpar a cor ao errar) ---
                firstCard.style.color = '';
                secondCard.style.color = '';
                // -----------------------------------------------------

                flippedCards = [];
                lockBoard = false;
            }, 1000); 
        }
    }

    blocks.forEach(block => {
        block.addEventListener('click', () => virarCarta(block));
    });

    function iniciarJogo() {
        regressivaContainer.style.display = 'none';
        embaralharCartas();

        blocks.forEach((block, index) => {
            block.classList.add('flipped');
            const img = block.querySelector('img');
            const card = cards[index];
            if (card) {
                img.src = card.image;
                block.style.backgroundColor = card.color;
                block.style.boxShadow = `6px 6px ${card.boxShadow}`;
                // A cor do texto já foi definida no embaralharCartas
            }
        });

        setTimeout(() => {
            blocks.forEach(block => {
                if (!block.classList.contains('fixed')) {
                    block.classList.remove('flipped');
                    const img = block.querySelector('img');
                    img.src = '../assets/memorygame.svg';
                    block.style.backgroundColor = '#6FD3F5';
                    block.style.boxShadow = '';
                    
                    // --- ADICIONE ESTA LINHA (Limpar cor após 5s) ---
                    block.style.color = ''; 
                    // ------------------------------------------------
                }
            });
            iniciarCronometroJogo();
        }, 5000);
    }

    // INICIALIZAÇÃO ASSÍNCRONA
    // ----------------------------------------------------------------------

    carregarRecorde().then(() => {
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
});
