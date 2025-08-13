// Arquivo: js/script.js

// Variáveis globais para o estado do quiz
let pontuacao = 0;
let indicePergunta = 0;
let quizAtual = null;
let historiaAtual = null; // Vamos guardar a história atual aqui

// Acontece assim que a página 'historia.html' é carregada
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const historiaId = urlParams.get('id');

    if (!historiaId) {
        alert("História não encontrada!");
        window.location.href = '/telas/indexCentrohistorias.html';
        return;
    }

    // Encontra e armazena a história completa
    historiaAtual = DADOS_HISTORIAS.find(h => h.id === historiaId);

    if (!historiaAtual) {
        alert("Dados da história não encontrados!");
        return;
    }

    // Preenche o "molde" HTML com os dados da história
    document.title = historiaAtual.titulo;
    document.querySelector('.header h4').textContent = historiaAtual.titulo;
    document.querySelector('.header .books').src = historiaAtual.icone_header;
    document.querySelector('.personagens span').textContent = historiaAtual.personagens;

    const textoContainer = document.querySelector('.texto');
    textoContainer.innerHTML = '';

    // Cria o diálogo dinamicamente
    historiaAtual.dialogo.forEach(item => {
        if (item.tipo === 'acao') {
            const p = document.createElement('p');
            p.textContent = item.texto;
            textoContainer.appendChild(p);
        } else {
            const a = document.createElement('a');
            a.href = "#";
            a.innerHTML = `<b>${item.personagem}:</b> ${item.fala}`;
            a.onclick = () => tocarAudio(item.audio);
            textoContainer.appendChild(a);
        }
    });

    // Inicia o quiz com os dados corretos
    quizAtual = historiaAtual.quiz;
    carregarPergunta();

    document.getElementById("sair").addEventListener('click', function() {
        // Aqui você poderia fazer outras coisas, como salvar dados...
        console.log('Botão clicado, redirecionando...');
        
        // E então, redirecionar o usuário
        window.location.href = '/telas/indexCentrohistorias.html'; 
    });
});

// --- LÓGICA DO QUIZ ---

function carregarPergunta() {ç
    const botoesContainer = document.getElementById('botoes-container');
    const txtPergunta = document.getElementById('pergunta');

    // Verifica se o quiz terminou
    if (indicePergunta >= quizAtual.perguntas.length) {
        // Mostra a mensagem final e CHAMA A FUNÇÃO PARA SALVAR
        txtPergunta.innerHTML = `<b>Congratulations!</b> You got ${pontuacao}/${quizAtual.perguntas.length} correct.`;
        botoesContainer.innerHTML = '<p>Salvando seu progresso...</p>'; // Mensagem de feedback
        
        finalizarEsalvarQuiz(); // A grande mudança está aqui!
        return;
    }

    botoesContainer.innerHTML = '';
    txtPergunta.innerHTML = `<b>Question ${indicePergunta + 1}:</b> ${quizAtual.perguntas[indicePergunta]}`;

    quizAtual.alternativas[indicePergunta].forEach(textoAlternativa => {
        const botao = document.createElement('button');
        botao.textContent = textoAlternativa;
        botao.onclick = () => verificarResposta(botao, textoAlternativa);
        botoesContainer.appendChild(botao);
    });
}

function verificarResposta(botaoClicado, respostaEscolhida) {
    const botoesContainer = document.getElementById('botoes-container');
    const todosOsBotoes = botoesContainer.querySelectorAll('button');
    todosOsBotoes.forEach(btn => btn.disabled = true);

    const respostaCerta = quizAtual.respostasCorretas[indicePergunta];

    if (respostaEscolhida.trim() === respostaCerta) {
        botaoClicado.style.backgroundColor = '#00BF63';
        pontuacao++;
    } else {
        botaoClicado.style.backgroundColor = '#F2383D';
        todosOsBotoes.forEach(btn => {
            if (btn.textContent.trim() === respostaCerta) {
                btn.style.backgroundColor = '#00BF63';
            }
        });
    }

    setTimeout(() => {
        indicePergunta++;
        carregarPergunta();
    }, 1500);
}

// --- FUNÇÕES DE APOIO ---

/**
 * Função que envia a pontuação final para o backend (API).
 */
function finalizarEsalvarQuiz() {
    // IMPORTANTE: Aqui você precisa saber qual estudante está logado.
    // Como ainda não temos um sistema de login, usaremos um valor fixo como exemplo.
    const idEstudanteLogado = 1; // Exemplo: Henrico (id 1) está jogando.

    // Pega o ID numérico do jogo que acabamos de jogar.
    const idJogoAtual = historiaAtual.jogo_id;

    // Monta o objeto de dados para enviar ao servidor.
    const dadosParaSalvar = {
        idEstudante: idEstudanteLogado,
        idJogo: idJogoAtual,
        pontuacao: pontuacao
    };

    // Usa a API Fetch para enviar os dados para o seu arquivo de backend.
    // Certifique-se de que o caminho 'api/salvar-pontuacao.php' está correto.
    fetch('api/pontuacao.php', {
        method: 'POST', // Estamos enviando dados
        headers: {
            'Content-Type': 'application/json', // O formato dos dados é JSON
        },
        body: JSON.stringify(dadosParaSalvar), // Converte o objeto JS para texto JSON
    })
    .then(response => response.json()) // Converte a resposta do servidor para objeto JS
    .then(data => {
        console.log('Resposta do servidor:', data); // Útil para depuração
        // Redireciona para o menu principal após um pequeno atraso
        setTimeout(() => {
            window.location.href = 'indexCentrohistorias.html';
        }, 2000); // Espera 2 segundos para o usuário ver a pontuação final
    })
    .catch((error) => {
        console.error('Erro ao salvar pontuação:', error);
        alert('Ocorreu um erro ao salvar seu progresso. Mas não se preocupe, vamos te levar de volta ao menu.');
        // Redireciona mesmo se der erro
        setTimeout(() => {
            window.location.href = 'indexCentrohistorias.html';
        }, 2000);
    });
}


function tocarAudio(nome) {
    const audio = document.getElementById('player');
    audio.src = '/audios/' + nome + '.mp3';
    audio.play().catch(e => console.error("Error playing audio:", e));
}

const popupOverlay = document.getElementById('popupOverlay');
const popUpContent = document.getElementById('pop-up'); // O conteúdo do pop-up em si
const btnSair = document.getElementById('btnSair');
const btnVoltar = document.getElementById('btnVoltar');

// Referência ao elemento que acionará o pop-up (a imagem com id="sair")
const sairImg = document.getElementById('sair');

// --- Funções para controlar o Pop-up ---

// Função para mostrar o pop-up
function mostrarPopupSair() {
    if (popupOverlay) { // Garante que o overlay existe no HTML
        popupOverlay.classList.add('active'); // Adiciona a classe 'active' para exibir o overlay
        // Opcional: Adicionar classe para animar o conteúdo do pop-up, se desejar
        // if (popUpContent) {
        //     popUpContent.classList.add('active');
        // }
    }
}

// Função para esconder o pop-up
function esconderPopupSair() {
    if (popupOverlay) { // Garante que o overlay existe no HTML
        popupOverlay.classList.remove('active'); // Remove a classe 'active' para ocultar o overlay
        // Opcional: Remover classe de animação do conteúdo do pop-up
        // if (popUpContent) {
        //     popUpContent.classList.remove('active');
        // }
    }
}

// --- Adiciona os Event Listeners ---

// 1. Abre o pop-up quando a imagem 'sair' é clicada
if (sairImg) {
    sairImg.addEventListener('click', mostrarPopupSair);
} else {
    console.warn("Elemento com ID 'sair' não encontrado. O botão de saída do pop-up pode não funcionar.");
}

// 2. Ação do botão "SAIR" dentro do pop-up
if (btnSair) {
    btnSair.addEventListener('click', () => {

        window.location.href = '/telas/indexCentrohistorias.html';
    });
} else {
    console.warn("Elemento com ID 'btnSair' não encontrado.");
}

// 3. Ação do botão "VOLTAR" dentro do pop-up
if (btnVoltar) {
    btnVoltar.addEventListener('click', esconderPopupSair); // Apenas esconde o pop-up
} else {
    console.warn("Elemento com ID 'btnVoltar' não encontrado.");
}

// 4. Opcional: Fechar o pop-up clicando fora dele (no overlay)
if (popupOverlay) {
    popupOverlay.addEventListener('click', (event) => {
        // Verifica se o clique foi diretamente no overlay (não no conteúdo do pop-up)
        if (event.target === popupOverlay) {
            esconderPopupSair();
        }
    });
}