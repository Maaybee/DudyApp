const DADOS_ATIVIDADES = [
    {
        id: 1,
        tipo: 'associacao_imagem', // <-- Identifica o tipo de exercício
        pergunta: "Qual destas imagens é 'açúcar'?",
        palavraAlvo: 'açúcar',
        respostaCorreta: 'sugar',
        opcoes: [
            { id: 'water', imagem: '../assets/imagens/water.png', texto: 'water' },
            { id: 'sugar', imagem: '../assets/imagens/sugar.png', texto: 'sugar' },
            { id: 'milk',  imagem: '../assets/imagens/milk.png',  texto: 'milk' }
        ]
    },
    {
        id: 2,
        tipo: 'traducao', // <-- Identifica o tipo de exercício
        pergunta: 'Escreva em português:',
        palavraOriginal: 'Sugar.',
        respostaCorreta: 'Açúcar',
        audio: '../assets/audio/sugar.mp3'
    },
    {
        id: 3,
        tipo: 'associacao_imagem',
        pergunta: "Qual destas imagens é 'maçã'?",
        palavraAlvo: 'maçã',
        respostaCorreta: 'apple',
        opcoes: [
            { id: 'apple',  imagem: '../assets/imagens/apple.png',  texto: 'apple' },
            { id: 'bread',  imagem: '../assets/imagens/bread.png',  texto: 'bread' },
            { id: 'cheese', imagem: '../assets/imagens/cheese.png', texto: 'cheese' }
        ]
    }
    // Adicione quantas atividades quiser aqui...
];