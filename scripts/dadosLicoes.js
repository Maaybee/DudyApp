// scripts/dadosLicoes.js

const licoesData = {
    "1": { // Lição de Comidas (lessonId: 1)
        name: "Comidas",
        activities: [
            {
                type: "traducao", // Imagem 3 (Traduza Orange)
                question: "Traduza",
                word: "Apple",
                image: "../assets/img/apple.png",
                correctAnswer: "maçã"
            },
            {
                type: "associacao-imagem", // Imagem 2 (Selecione Book)
                question: "Selecione",
                word: "Banana",
                options: [
                    { id: "opt1", image: "../assets/img/apple.png", text: "Maçã", isCorrect: false, bgColor: '#ffb7d4' },
                    { id: "opt2", image: "../assets/img/banana.png", text: "Banana", isCorrect: true, bgColor: '#a0d8ff' },
                    { id: "opt3", image: "../assets/img/orange.png", text: "Laranja", isCorrect: false, bgColor: '#d1ffb7' },
                    { id: "opt4", image: "../assets/img/grape.png", text: "Uva", isCorrect: false, bgColor: '#e0b0ff' }
                ]
            },
            {
                type: "selecao-texto", // Imagem 1 (Selecione o nome em inglês com a casa)
                question: "Selecione o nome",
                word: "em inglês",
                image: "../assets/img/house.png",
                options: [
                    { id: "optA", text: "House", isCorrect: true },
                    { id: "optB", text: "Cat", isCorrect: false },
                    { id: "optC", text: "AirPlane", isCorrect: false }
                ]
            },
            {
                type: "traducao", // Exemplo de outra tradução
                question: "Traduza",
                word: "Water",
                image: "../assets/img/water.png",
                correctAnswer: "água"
            }
        ]
    },
    "2": { // Lição de Animais (lessonId: 2)
        name: "Animais",
        activities: [
            // Defina as 4 atividades para animais aqui
            {
                type: "traducao",
                question: "Traduza",
                word: "Cat",
                image: "../assets/img/cat.png",
                correctAnswer: "gato"
            },
            {
                type: "associacao-imagem",
                question: "Selecione",
                word: "Dog",
                options: [
                    { id: "opt1", image: "../assets/img/cat.png", text: "Gato", isCorrect: false, bgColor: '#ffb7d4' },
                    { id: "opt2", image: "../assets/img/dog.png", text: "Cachorro", isCorrect: true, bgColor: '#a0d8ff' },
                    { id: "opt3", image: "../assets/img/bird.png", text: "Pássaro", isCorrect: false, bgColor: '#d1ffb7' },
                    { id: "opt4", image: "../assets/img/fish.png", text: "Peixe", isCorrect: false, bgColor: '#e0b0ff' }
                ]
            },
            {
                type: "selecao-texto",
                question: "Selecione o nome",
                word: "em inglês",
                image: "../assets/img/fish.png",
                options: [
                    { id: "optA", text: "Bird", isCorrect: false },
                    { id: "optB", text: "Fish", isCorrect: true },
                    { id: "optC", text: "Cat", isCorrect: false }
                ]
            },
            {
                type: "traducao",
                question: "Traduza",
                word: "Bird",
                image: "../assets/img/bird.png",
                correctAnswer: "pássaro"
            }
        ]
    }
    // Adicione mais lições (3: Família, 4: Escola) com suas respectivas 4 atividades
};