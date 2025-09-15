// Arquivo: scripts/dadosLicoes.js

const DADOS_LICOES = [
    {
        id: 1,
        titulo: "Lição 1: Foods",
        descricao: "Aprenda palavras e frases sobre comidas.",
        icone: "/DudyApp/assets/img/maça.svg", // Ícone para a Lição 1
        atividades: [1, 2, 3, 4, 5] // Sequência de 5 atividades
    },
    {
        id: 2,
        titulo: "Lição 2: Foods 2",
        descricao: "Conheça os animais.",
        icone: "/DudyApp/assets/img/orange.svg", // Ícone para a Lição 2
        atividades: [6, 7, 8, 9, 10] // Sequência de 5 novas atividades
    },
    {
        id: 3,
        titulo: "Lição 3: Foods 3",
        descricao: "Identifique objetos do dia a dia.",
        icone: "/DudyApp/assets/pizza.svg", // Ícone para a Lição 3
        atividades: [11, 12, 13, 14, 15] // Sequência de 5 novas atividades
    }
];

// DADOS_ATIVIDADES com a Lição 1 original e as novas lições
const DADOS_ATIVIDADES = [
    // --- ATIVIDADES DA LIÇÃO 1 (AS SUAS ORIGINAIS) ---
    {
        id: 1,
        tipo: 'associacao_imagem',
        pergunta: "Qual destas imagens é 'Maçã'?",
        palavraAlvo: 'Maçã',
        respostaCorreta: 'apple',
        opcoes: [
            { id: 'apple',  imagem: '/DudyApp/assets/img/maça.svg',  texto: 'Apple' },
            { id: 'orange', imagem: '/DudyApp/assets/img/orange.svg', texto: 'Orange' },
            { id: 'milk',   imagem: '/DudyApp/assets/leite.svg',   texto: 'Milk' }
        ]
    },
    {
        id: 2,
        tipo: 'traducao',
        pergunta: 'Traduza:',
        palavraOriginal: 'Orange',
        imagemPrincipal: '/DudyApp/assets/img/orange.svg', 
        audio: '/DudyApp/audios/orange.mp3', // Verifique se este áudio existe
        respostaCorreta: 'Laranja'
    },
    {
        id: 3,
        tipo: 'associacao_imagem',
        pergunta: "Qual destas imagens é 'Leite'?",
        palavraAlvo: 'Leite',
        respostaCorreta: 'milk',
        opcoes: [
            { id: 'strawberry', imagem: '/DudyApp/assets/img/morango.svg', texto: 'Strawberry' },
            { id: 'milk',       imagem: '/DudyApp/assets/leite.svg',       texto: 'Milk' },
            { id: 'orange',     imagem: '/DudyApp/assets/img/orange.svg',     texto: 'Orange' }
        ]
    },
    {
        id: 4,
        tipo: 'traducao',
        pergunta: 'Traduza:',
        palavraOriginal: 'Milk',
        imagemPrincipal: '/DudyApp/assets/leite.svg',
        audio: '/DudyApp/audios/milk.mp3',
        respostaCorreta: 'Leite'
    },
    {
        id: 5,
        tipo: 'associacao_imagem',
        pergunta: "Qual destas imagens é 'Água'?",
        palavraAlvo: 'Água',
        respostaCorreta: 'water',
        opcoes: [
            { id: 'pizza',  imagem: '/DudyApp/assets/pizza.svg',  texto: 'Pizza' },
            { id: 'water',  imagem: '/DudyApp/assets/agua.svg',  texto: 'Water' },
            { id: 'orange', imagem: '/DudyApp/assets/img/orange.svg', texto: 'Orange' }
        ]
    },

    // --- ATIVIDADES DA LIÇÃO 2: ANIMAIS (NOVAS) ---
    {
        id: 6,
        tipo: 'associacao_imagem',
        pergunta: "Qual destas imagens é 'Cachorro'?",
        palavraAlvo: 'Cachorro',
        respostaCorreta: 'dog',
        opcoes: [
            { id: 'cat', imagem: '/DudyApp/assets/img/cat.png', texto: 'Cat' },
            { id: 'dog', imagem: '/DudyApp/assets/img/dog.png', texto: 'Dog' },
            { id: 'bird', imagem: '/DudyApp/assets/img/bird.png', texto: 'Bird' }
        ]
    },
    {
        id: 7,
        tipo: 'traducao',
        pergunta: 'Traduza:',
        palavraOriginal: 'Cat',
        imagemPrincipal: '/DudyApp/assets/img/cat.png',
        audio: '/DudyApp/audios/cat.mp3',
        respostaCorreta: 'Gato'
    },
    {
        id: 8,
        tipo: 'associacao_imagem',
        pergunta: "Qual destas imagens é 'Pássaro'?",
        palavraAlvo: 'Pássaro',
        respostaCorreta: 'bird',
        opcoes: [
            { id: 'dog',  imagem: '/DudyApp/assets/img/dog.png',  texto: 'Dog' },
            { id: 'fish', imagem: '/DudyApp/assets/img/fish.png', texto: 'Fish' },
            { id: 'bird', imagem: '/DudyApp/assets/img/bird.png', texto: 'Bird' }
        ]
    },
     {
        id: 9,
        tipo: 'traducao',
        pergunta: 'Traduza:',
        palavraOriginal: 'Fish',
        imagemPrincipal: '/DudyApp/assets/img/fish.png',
        audio: '/DudyApp/audios/fish.mp3',
        respostaCorreta: 'Peixe'
    },
    {
        id: 10,
        tipo: 'associacao_imagem',
        pergunta: "Qual destas imagens é 'Cavalo'?",
        palavraAlvo: 'Cavalo',
        respostaCorreta: 'horse',
        opcoes: [
            { id: 'horse', imagem: '/DudyApp/assets/img/horse.png', texto: 'Horse' },
            { id: 'cat',   imagem: '/DudyApp/assets/img/cat.png',   texto: 'Cat' },
            { id: 'fish',  imagem: '/DudyApp/assets/img/fish.png',  texto: 'Fish' }
        ]
    },

    // --- ATIVIDADES DA LIÇÃO 3: OBJETOS (NOVAS) ---
    {
        id: 11,
        tipo: 'associacao_imagem',
        pergunta: "Qual destas imagens é 'Livro'?",
        palavraAlvo: 'Livro',
        respostaCorreta: 'book',
        opcoes: [
            { id: 'book',   imagem: '/DudyApp/assets/img/book.png',   texto: 'Book' },
            { id: 'pen',    imagem: '/DudyApp/assets/img/pen.png',    texto: 'Pen' },
            { id: 'pencil', imagem: '/DudyApp/assets/img/pencil.png', texto: 'Pencil' }
        ]
    },
    {
        id: 12,
        tipo: 'traducao',
        pergunta: 'Traduza:',
        palavraOriginal: 'Pen',
        imagemPrincipal: '/DudyApp/assets/img/pen.png',
        audio: '/DudyApp/audios/pen.mp3',
        respostaCorreta: 'Caneta'
    },
    {
        id: 13,
        tipo: 'associacao_imagem',
        pergunta: "Qual destas imagens é 'Carro'?",
        palavraAlvo: 'Carro',
        respostaCorreta: 'car',
        opcoes: [
            { id: 'house', imagem: '/DudyApp/assets/img/house.png', texto: 'House' },
            { id: 'car',   imagem: '/DudyApp/assets/img/car.png',   texto: 'Car' },
            { id: 'book',  imagem: '/DudyApp/assets/img/book.png',  texto: 'Book' }
        ]
    },
    {
        id: 14,
        tipo: 'traducao',
        pergunta: 'Traduza:',
        palavraOriginal: 'House',
        imagemPrincipal: '/DudyApp/assets/img/house.png',
        audio: '/DudyApp/audios/house.mp3',
        respostaCorreta: 'Casa'
    },
    {
        id: 15,
        tipo: 'associacao_imagem',
        pergunta: "Qual destas imagens é 'Cama'?",
        palavraAlvo: 'Cama',
        respostaCorreta: 'bed',
        opcoes: [
            { id: 'car', imagem: '/DudyApp/assets/img/car.png', texto: 'Car' },
            { id: 'bed', imagem: '/DudyApp/assets/img/bed.png', texto: 'Bed' },
            { id: 'pen', imagem: '/DudyApp/assets/img/pen.png', texto: 'Pen' }
        ]
    }
];