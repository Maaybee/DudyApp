// Arquivo: scripts/atividade.js

const DADOS_ATIVIDADES = [
    {
        id: 1,
        tipo: 'associacao_imagem',
        pergunta: "Qual destas imagens é 'Maçã'?",
        palavraAlvo: 'Maçã',
        respostaCorreta: 'Apple',
        opcoes: [
            // Caminhos corrigidos para o GitHub Pages
            { id: 'Apple', imagem: '/DudyApp/assets/img/maça.svg', texto: 'Apple' },
            { id: 'Orange', imagem: '/DudyApp/assets/img/orange.svg', texto: 'Orange' },
            { id: 'Strawberry',  imagem: '/DudyApp/assets/img/morango.svg',  texto: 'Strawberry' }
        ]
    },
    {
        id: 2,
        tipo: 'traducao',
        pergunta: 'Escreva em português:',
        palavraOriginal: 'Sugar.',
        respostaCorreta: 'Açúcar',
        // Caminho corrigido para o GitHub Pages
        audio: '/DudyApp/audios/sugar.mp3'
    },
    {
        id: 3,
        tipo: 'associacao_imagem',
        pergunta: "Qual destas imagens é 'maçã'?",
        palavraAlvo: 'maçã',
        respostaCorreta: 'apple',
        opcoes: [
            // Caminhos corrigidos para o GitHub Pages
            { id: 'apple',  imagem: '/DudyApp/assets/img/apple.png',  texto: 'apple' },
            { id: 'bread',  imagem: '/DudyApp/assets/img/bread.png',  texto: 'bread' },
            { id: 'cheese', imagem: '/DudyApp/assets/img/cheese.png', texto: 'cheese' }
        ]
    }
    
];
const sairImg = document.getElementById('sair');

    if (sairImg) {
        sairImg.addEventListener('click', function() {
            // Esta função só será executada quando a imagem 'sair' for clicada
            window.location.href = '../telas/telaAtividade.html';
        });
    } else {
        console.warn("Elemento com ID 'sair' não encontrado. O botão de saída do pop-up pode não funcionar.");
    }
