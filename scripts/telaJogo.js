let valor = 0;
let pontuacao = 0;
let imagemElemento; 
let btnUm;
let btnDois;
let btnTres;
const proxBtnUm = ['House', 'Car', 'Bird']; 
const proxBtnDois = ['Cat', 'House', 'Horse'];
const proxBtnTres = ['AirPlane', 'AirPlane', 'Bunny'];
const imagensSrc = ['assets/casinha.png', 'assets/carro.png', 'assets/coelho.png']; 
let contador = 0;
const respostasCorretas = ['House', 'Car', 'Bunny','fim']; 
let respostaCertaAtual = ''; 

const telaJogo = document.getElementById('telaJogo');

document.addEventListener('DOMContentLoaded', () => {
    imagemElemento = document.getElementById('img');
    if (!imagemElemento) {
        console.error("Elemento com ID 'img' não encontrado no DOM.");
    }

    btnUm = document.getElementById('btnUm');
    btnDois = document.getElementById('btnDois');
    btnTres = document.getElementById('btnTres');

    if (!btnUm || !btnDois || !btnTres) {
        console.error("Um ou mais botões de resposta não foram encontrados.");
    }

    // Inicializa a primeira imagem e a primeira resposta correta
    if (imagemElemento) {
        imagemElemento.src = imagensSrc[contador];
        definirRespostaCorretaAtual();
        resetarBotoesParaProximaPergunta(); // Configura os textos dos botões iniciais
    }
});

// Função para definir a resposta certa com base no contador
function definirRespostaCorretaAtual() {
    if (contador < respostasCorretas.length) {
        respostaCertaAtual = respostasCorretas[contador];
    } 
}

function mudarTelaJogo() {

    if (respostaCertaAtual == "fim"){ 
        fimDeJogo();

    } else { 
        if (contador < imagensSrc.length - 1) { 
        contador = contador + 1; // Incrementa para a próxima pergunta
        const tempoDeEsperaImagem = 500;

        setTimeout(() => {
            if (imagemElemento) { 
                imagemElemento.src = imagensSrc[contador];
                console.log(`Imagem mudada para ${imagensSrc[contador]} após atraso.`);
            }
            valor = 0; // Reseta valor após a transição da tela
            definirRespostaCorretaAtual(); // Atualiza a resposta certa para a nova imagem
            resetarBotoesParaProximaPergunta();
        }, tempoDeEsperaImagem);
    } else {
        console.log("Jogo finalizado! Pontuação final: " + pontuacao);
        if (btnUm) btnUm.disabled = true;
        if (btnDois) btnDois.disabled = true;
        if (btnTres) btnTres.disabled = true;
        fimDeJogo();
    }

    }    

}

function resetarBotoesParaProximaPergunta() {
    if (btnUm && btnDois && btnTres) {
        btnUm.style.backgroundColor = '#FFF7F7';
        btnDois.style.backgroundColor = '#FFF7F7';
        btnTres.style.backgroundColor = '#FFF7F7';

        if (contador < proxBtnUm.length) {
            btnUm.textContent = proxBtnUm[contador];
        }
        if (contador < proxBtnDois.length) {
            btnDois.textContent = proxBtnDois[contador];
        }
        if (contador < proxBtnTres.length) {
            btnTres.textContent = proxBtnTres[contador];
        }

        btnUm.disabled = false;
        btnDois.disabled = false;
        btnTres.disabled = false;
    }
}

function verificarResposta(elementoBotaoClicado) {
    const textoDoBotao = elementoBotaoClicado.textContent.trim();
    console.log("Botão clicado: " + textoDoBotao);

    if (btnUm) btnUm.disabled = true;
    if (btnDois) btnDois.disabled = true;
    if (btnTres) btnTres.disabled = true;


    if (textoDoBotao === respostaCertaAtual) {
        elementoBotaoClicado.style.backgroundColor = '#00BF63'; // Verde para correto
        valor = valor + 1; // 'valor' pode ser para acertos ou para indicar que uma resposta foi dada
        pontuacao = pontuacao + 1;
        console.log("Resposta correta! Pontuação: " + pontuacao + ", Valor: " + valor);
    } else {
    elementoBotaoClicado.style.backgroundColor = '#F2383D'; // Vermelho para errado
    valor = valor + 1; 
    console.log("Resposta errada! Pontuação: " + pontuacao + ", Valor: " + valor);
    }
    

    setTimeout(() => {
        mudarTelaJogo();
    }, 500); 

}

function fimDeJogo (){ 

    window.location.href = 'telaResultado.html'; 
 
    console.log("fim de jogo,tela mudada");

}