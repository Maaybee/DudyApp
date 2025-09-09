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
            { id: 'water', imagem: '/DudyApp/assets/img/water.png', texto: 'water' },
            { id: 'sugar', imagem: '/DudyApp/assets/img/sugar.png', texto: 'sugar' },
            { id: 'milk',  imagem: '/DudyApp/assets/img/milk.png',  texto: 'milk' }
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