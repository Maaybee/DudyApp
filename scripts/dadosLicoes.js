// Arquivo: scripts/dadosLicoes.js

const DADOS_LICOES = [
    {
        id: 1,
        titulo: "Lição 1: Minha família",
        descricao: "Aprenda palavras e frases sobre a família.",
        // Sequência de IDs de atividades que compõem esta lição
        atividades: [
            { id: 1, tipo: 'associacao_imagem' }, // Exemplo: Atividade de ID 1 é associação
            { id: 2, tipo: 'traducao' },         // Exemplo: Atividade de ID 2 é tradução
            { id: 3, tipo: 'associacao_imagem' },
            { id: 4, tipo: 'traducao' },
            { id: 5, tipo: 'associacao_imagem' }
            // Adicione mais atividades aqui para cada lição
        ]
    },
    {
        id: 2,
        titulo: "Lição 2: A Cidade",
        descricao: "Explore o vocabulário urbano.",
        atividades: [
            { id: 6, tipo: 'traducao' },
            { id: 7, tipo: 'associacao_imagem' },
            { id: 8, tipo: 'traducao' }
        ]
    }
    // Adicione mais lições aqui
];

// DADOS_ATIVIDADES continua a ser o seu array de atividades individuais
// Certifique-se de que os IDs referenciados em DADOS_LICOES.atividades existam em DADOS_ATIVIDADES
const DADOS_ATIVIDADES = [
    {
        id: 1,
        tipo: 'associacao_imagem',
        palavraAlvo: 'Maçã',
        opcoes: [
            { id: '1a', imagem: '/DudyApp/assets/img/maça.svg', texto: 'Apple' },
            { id: '1b', imagem: '/DudyApp/assets/img/orange.svg', texto: 'Orange' },
            { id: '1c', imagem: '/DudyApp/assets/img/morango.svg', texto: 'Strawberry' }
        ],
        respostaCorreta: '1a'
    },
   {
        id: 2,
        tipo: 'traducao',
        pergunta: 'Traduza:',
        palavraOriginal: 'House',
        // ADICIONADO: A imagem que aparecerá na tela
        imagemPrincipal: '/DudyApp/assets/img/house.png', 
        audio: '/DudyApp/assets/audio/house.mp3',
        respostaCorreta: 'Casa'
    },
    {
        id: 3,
        tipo: 'associacao_imagem',
        palavraAlvo: 'Cachorro',
        opcoes: [
            { id: '3a', imagem: '/DudyApp/assets/img/dog.png', texto: 'Cachorro' },
            { id: '3b', imagem: '/DudyApp/assets/img/cat.png', texto: 'Gato' },
            { id: '3c', imagem: '/DudyApp/assets/img/bird.png', texto: 'Pássaro' }
        ],
        respostaCorreta: '3a'
    },
    {
        id: 4,
        tipo: 'traducao',
        pergunta: 'Traduza:',
        palavraOriginal: 'Car',
        audio: '/DudyApp/assets/audio/car.mp3', // Exemplo de arquivo de áudio
        respostaCorreta: 'Carro'
    },
    {
        id: 5,
        tipo: 'associacao_imagem',
        palavraAlvo: 'Livro',
        opcoes: [
            { id: '5a', imagem: '/DudyApp/assets/img/book.png', texto: 'Livro' },
            { id: '5b', imagem: '/DudyApp/assets/img/pen.png', texto: 'Caneta' },
            { id: '5c', imagem: '/DudyApp/assets/img/pencil.png', texto: 'Lápis' }
        ],
        respostaCorreta: '5a'
    }
    // Certifique-se de que DADOS_ATIVIDADES está completo com todas as suas atividades
    // e que os IDs usados nas lições existem aqui.
];