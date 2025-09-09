document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DA PÁGINA ---
    const headerImg = document.querySelector('.header .books');
    const headerTitulo = document.querySelector('.header h4');
    const personagensSpan = document.querySelector('.personagens span');
    const textoContainer = document.querySelector('.texto');
    const quizContainer = document.querySelector('.quiz-container');
    const botoesContainer = document.getElementById('botoes-container');
    const audioPlayer = document.getElementById('player');
    
    // --- POP-UP DE SAÍDA ---
    const sairBtnPrincipal = document.getElementById('sair');
    const popupOverlay = document.getElementById('popupOverlay');
    const btnSairPopup = document.getElementById('btnSair');
    const btnVoltarPopup = document.getElementById('btnVoltar');

    // --- VARIÁVEIS DE ESTADO ---
    let linhaAtual = 0;
    let historia;

    // --- INICIALIZAÇÃO ---
    function iniciarHistoria() {
        const urlParams = new URLSearchParams(window.location.search);
        const historiaId = urlParams.get('id');
        historia = DADOS_HISTORIAS.find(h => h.id === historiaId);

        if (!historia) { document.body.innerHTML = '<h1>Erro: História não encontrada.</h1>'; return; }

        document.title = `DudyApp - ${historia.titulo}`;
        // Caminho da imagem também corrigido
        headerImg.src = `/DudyApp${historia.icone_header.substring(2)}`; 
        headerTitulo.textContent = historia.titulo;
        personagensSpan.textContent = historia.personagens;
        
        quizContainer.style.display = 'none';
        mostrarLinha(linhaAtual);
    }

    // --- LÓGICA DO DIÁLOGO ---
   function mostrarLinha(indice) {
    if (indice >= historia.dialogo.length) {
        iniciarQuiz(); // Se o diálogo acabou, começa o quiz
        return;
    }
    
    linhaAtual = indice;
    const item = historia.dialogo[indice];

    textoContainer.innerHTML = '';

    const p = document.createElement('p');
    if (item.tipo === 'acao') {
        p.textContent = `(${item.texto})`;
        p.style.fontStyle = 'italic';
        p.style.textAlign = 'center';
    } else {
        p.textContent = `${item.personagem}: ${item.fala}`;
        if (item.audio) {
            // A CORREÇÃO ESTÁ NESTA LINHA: O caminho agora aponta para a pasta correta
            audioPlayer.src = `/DudyApp/audios/${item.audio}.mp3`; 
            audioPlayer.play().catch(e => console.error("Erro ao tocar o áudio:", e));
        }
    }
    textoContainer.appendChild(p);

    const navContainer = document.createElement('div');
    navContainer.className = 'buttons'; 

    if (linhaAtual > 0) {
        const btnAnterior = document.createElement('button');
        btnAnterior.textContent = 'Anterior';
        btnAnterior.onclick = (e) => {
            e.target.style.backgroundColor = '#90EE90';
            mostrarLinha(linhaAtual - 1);
        };
        navContainer.appendChild(btnAnterior);
    }

    const btnProximo = document.createElement('button');
    btnProximo.textContent = 'Avançar';
    btnProximo.onclick = (e) => {
        e.target.style.backgroundColor = '#90EE90';
        mostrarLinha(linhaAtual + 1);
    };
    navContainer.appendChild(btnProximo);

    textoContainer.appendChild(navContainer);
}
    // --- LÓGICA DO QUIZ (sem alterações) ---
    function iniciarQuiz() {
        document.querySelector('.header').style.display = 'none';
        document.querySelector('.personagens').style.display = 'none';
        textoContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        // ...resto da função...
    }
    // ...resto das funções do quiz e do pop-up...

    // (O resto do seu arquivo continua igual a partir daqui)
});

