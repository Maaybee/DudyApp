// Arquivo: scripts/atividade.js

const DADOS_ATIVIDADES = [
    {
        id: 1,
        tipo: 'associacao_imagem',
        pergunta: "Qual destas imagens é 'açúcar'?",
        palavraAlvo: 'açúcar',
        respostaCorreta: 'sugar',
        opcoes: [
            // Caminhos corrigidos para o GitHub Pages
            { id: 'water', imagem: '/DudyApp/assets/img/maça.png', texto: 'Apple' },
            { id: 'sugar', imagem: '/DudyApp/assets/img/Orange.png', texto: 'Orange' },
            { id: 'milk',  imagem: '/DudyApp/assets/img/morango.png',  texto: 'Strawberry' }
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