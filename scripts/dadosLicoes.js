// Arquivo: scripts/dadosLicoes.js

const DADOS_LICOES = [
    {
        id: 1,
        titulo: "Lição 1: Foods",
        descricao: "Aprenda palavras e frases sobre comidas.",
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
            { id: '1c', imagem: '/DudyApp/assets/img/leite.svg', texto: 'Milk' }
        ],
        respostaCorreta: '1a'
    },
   {
        id: 2,
        tipo: 'traducao',
        pergunta: 'Traduza:',
        palavraOriginal: 'Orange',
        // ADICIONADO: A imagem que aparecerá na tela
        imagemPrincipal: '/DudyApp/assets/img/orange.svg', 
        audio: '/DudyApp/assets/audio/house.mp3',
        respostaCorreta: 'Laraja'
    },
    {
        id: 3,
        tipo: 'associacao_imagem',
        palavraAlvo: 'Laranja',
        opcoes: [
            { id: '3a', imagem: '/DudyApp/assets/img/morango.svg', texto: 'Water' },
            { id: '3b', imagem: '/DudyApp/assets/img/leite.svg', texto: 'Milk' },
            { id: '3c', imagem: '/DudyApp/assets/img/orange.svg', texto: 'Orange' }
        ],
        respostaCorreta: '3c'
    },
    {
        id: 4,
        tipo: 'traducao',
        pergunta: 'Traduza:',
        palavraOriginal: 'MIlk',
        audio: '/DudyApp/assets/audio/car.mp3', // Exemplo de arquivo de áudio
        respostaCorreta: 'Leite'
    },
    {
        id: 5,
        tipo: 'associacao_imagem',
        palavraAlvo: 'Água',
        opcoes: [
            { id: '5a', imagem: '/DudyApp/assets/img/pizza.svg', texto: 'Pizza' },
            { id: '5b', imagem: '/DudyApp/assets/img/agua.svg', texto: 'Water' },
            { id: '5c', imagem: '/DudyApp/assets/img/orange.svg', texto: 'Orange' }
        ],
        respostaCorreta: '5b'
    }
    // Certifique-se de que DADOS_ATIVIDADES está completo com todas as suas atividades
    // e que os IDs usados nas lições existem aqui.
];