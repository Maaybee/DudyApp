// Arquivo: js/historias.js

const DADOS_HISTORIAS = [
    {
        id: 'picnic', // Identificador único (sem espaços ou acentos)
        jogo_id: 3,
        titulo: 'The Picnic',
        personagens: 'Leo and Emma',
        imagem: '../assets/img/livro rosa.png', // Imagem do menu
        icone_header: '../assets/img/livro-rosa.svg', // Ícone do cabeçalho na página da história
        dialogo: [
            { personagem: 'Emma', fala: 'Hi Leo! Are you ready for the picnic?', audio: 'emma1' },
            { personagem: 'Leo', fala: 'Yes! I have apples and sandwiches.', audio: 'leo1' },
            { personagem: 'Emma', fala: 'Yum! I have juice and cookies.', audio: 'emma2' },
            { personagem: 'Leo', fala: 'Great! I like cookies.', audio: 'leo2' },
            { personagem: 'Emma', fala: 'Let’s sit under the tree.', audio: 'emma3' },
            { tipo: 'acao', texto: '(They sit and eat.)' },
            { personagem: 'Leo', fala: 'This sandwich is so good!', audio: 'leo3' },
            { personagem: 'Emma', fala: 'And this apple is so sweet!', audio: 'emma4' },
            { personagem: 'Leo', fala: 'I’m happy. Picnics are fun!', audio: 'leo4' },
            { personagem: 'Emma', fala: 'Yes, very fun!', audio: 'emma5' }
        ],
        quiz: {
            perguntas: [
                'What does Leo bring to the picnic?',
                'Which sentence shows that Emma likes the apple?',
                'How do they feel about the picnic?',
            ],
            alternativas: [
                ['Apples and sandwiches.', 'Juice and cookies.', 'Bananas and pears.'],
                ['This apple is sweet!', 'I have juice and cookies.', 'I’m hungry.'],
                ['Picnics are boring.', 'Picnics are fun!', 'I’m sleepy.']
            ],
            respostasCorretas: [
                'Apples and sandwiches.',
                'This apple is sweet!',
                'Picnics are fun!',
            ]
        }
    },
    {
        id: 'pizza-time',
        jogo_id: 4,
        titulo: 'Pizza Time',
        personagens: 'Mia and Sam',
        imagem: '../assets/img/livro azul.png',
        icone_header: '../assets/img/livro-azul.svg', // Crie um ícone para a pizza se quiser
        dialogo: [
            { personagem: 'Mia', fala: 'Hi Sam! Are you hungry?', audio: 'mia1' },
            { personagem: 'Sam', fala: 'Yes, I am! What should we eat?', audio: 'sam1' },
            { personagem: 'Mia', fala: 'Let’s make a pizza! I have the dough and tomato sauce.' , audio: 'mia2' },
            { personagem: 'Sam', fala: 'Great idea! I have cheese and pepperoni.', audio: 'sam2' },
            { personagem: 'Mia', fala: 'Perfect! Let’s put the toppings on.', audio: 'mia3' },
            { personagem: 'Sam', fala: 'It looks so yummy! Let’s put it in the oven.', audio: 'sam3' },
            { personagem: 'Mia', fala: 'Ding! The pizza is ready. It smells delicious!', audio: 'mia4' },
            { personagem: 'Sam', fala: 'Hooray! Look at the melted cheese.', audio: 'sam4' },
            { personagem: 'Mia', fala: 'This pizza is so tasty!', audio: 'mia5' },
            { personagem: 'Sam', fala: ' Yes! Pizza time is the best time.', audio: 'sam5' },
    
        ],
        quiz: {
             perguntas: ['What toppings did they put on the pizza?', 'How does the pizza smell according to Mia?',
    'What is Sam’s final opinion about pizza time?'],
             alternativas: [ ['Cheese and pepperoni.', 'Mushrooms and olives.', 'Pineapple and ham.'],
                            ['It smells burnt.', 'It smells delicious!', 'It smells like cookies.'],
                            ['It is boring.', 'He is sleepy.', 'Pizza time is the best time.']],
             respostasCorretas: ['Cheese and pepperoni.', 'It smells delicious!', 'Pizza time is the best time.']
        }
    },
// 3. História: Baking a Cake
    {
        id: 'baking-a-cake',
        jogo_id: 5,
        titulo: 'Baking a Cake',
        personagens: 'Ana and Dad',
        imagem: '../assets/img/livro laranja.png',
        icone_header: '../assets/img/livro-laranja.svg',
        dialogo: [
            { personagem: 'Ana', fala: 'Dad, can we bake something today?', audio: 'ana1' },
            { personagem: 'Dad', fala: 'Of course, Ana! What should we bake?', audio: 'dad1' },
            { personagem: 'Ana', fala: 'A big chocolate cake!', audio: 'ana2' },
            { personagem: 'Dad', fala: 'Excellent choice! Let’s get the ingredients.', audio: 'dad2' },
            { personagem: 'Ana', fala: 'We need flour, sugar, eggs, and chocolate!', audio: 'ana3' },
            { tipo: 'acao', texto: '(Ana and Dad mix everything in a big bowl.)' },
            { personagem: 'Dad', fala: 'Now, into the oven it goes. It smells wonderful!', audio: 'dad3' },
            { tipo: 'acao', texto: '(They decorate the cake with colorful sprinkles.)' },
            { personagem: 'Ana', fala: 'Wow! It looks amazing. Let’s have a slice.', audio: 'ana4' },
            { personagem: 'Dad', fala: 'This is the most delicious cake ever!', audio: 'dad4' }
        ],
        quiz: {
            perguntas: [
                'What kind of cake did they bake?',
                'What did they use to decorate the cake?',
                'How did the cake smell to Dad while it was in the oven?'
            ],
            alternativas: [
                ['A vanilla cake.', 'A chocolate cake.', 'A strawberry cake.'],
                ['Icing and candles.', 'Fresh fruit.', 'Colorful sprinkles.'],
                ['It was burning.', 'It smelled wonderful.', 'It had no smell.']
            ],
            respostasCorretas: [
                'A chocolate cake.',
                'Colorful sprinkles.',
                'It smelled wonderful.'
            ]
        }
    },

    // 4. História: Ice Cream Day
    {
        id: 'ice-cream-day',
        jogo_id: 6,
        titulo: 'Ice Cream Day',
        personagens: 'Carlos and Sofia',
        imagem: '../assets/img/livro verde.png',
        icone_header: '../assets/img/liro-verde.svg',
        dialogo: [
            { personagem: 'Carlos', fala: 'Sofia, it’s such a hot day today!', audio: 'carlos1' },
            { personagem: 'Sofia', fala: 'It is! I know what would be perfect right now.', audio: 'sofia1' },
            { personagem: 'Carlos', fala: 'What is it? Let me guess... ice cream!', audio: 'carlos2' },
            { personagem: 'Sofia', fala: 'Exactly! Let’s go to the ice cream shop.', audio: 'sofia2' },
            { tipo: 'acao', texto: '(They walk to the ice cream shop on the corner.)' },
            { personagem: 'Carlos', fala: 'What flavor do you want? I will get chocolate.', audio: 'carlos3' },
            { personagem: 'Sofia', fala: 'I want strawberry, my favorite!', audio: 'sofia3' },
            { personagem: 'Carlos', fala: 'Mmm, my ice cream is so creamy and cold.', audio: 'carlos4' },
            { personagem: 'Sofia', fala: 'And mine is so sweet and refreshing!', audio: 'sofia4' },
            { personagem: 'Carlos', fala: 'Ice cream is the best treat for a sunny day.', audio: 'carlos5' }
        ],
        quiz: {
            perguntas: [
                'What flavor of ice cream did Sofia choose?',
                'Why did they decide to get ice cream?',
                'How did Carlos describe his chocolate ice cream?'
            ],
            alternativas: [
                ['Vanilla.', 'Chocolate.', 'Strawberry.'],
                ['Because it was raining.', 'Because it was a hot day.', 'Because they were hungry for dinner.'],
                ['Sweet and refreshing.', 'Creamy and cold.', 'Salty and warm.']
            ],
            respostasCorretas: [
                'Strawberry.',
                'Because it was a hot day.',
                'Creamy and cold.'
            ]
        }
    },

    // 5. História: Morning Smoothie
    {
        id: 'morning-smoothie',
        jogo_id: 7,
        titulo: 'Morning Smoothie',
        personagens: 'Lucas and Julia',
        imagem: '../assets/img/livro roxo.png',
        icone_header: '../assets/img/livro-roxo.svg',
        dialogo: [
            { personagem: 'Lucas', fala: 'I want a quick and healthy breakfast.', audio: 'lucas1' },
            { personagem: 'Julia', fala: 'Let’s make a smoothie! It’s super easy.', audio: 'julia1' },
            { personagem: 'Lucas', fala: 'Good idea! I have bananas and some yogurt.', audio: 'lucas2' },
            { personagem: 'Julia', fala: 'And I have strawberries and a little honey.', audio: 'julia2' },
            { tipo: 'acao', texto: '(They put all the ingredients in the blender and press the button.)' },
            { personagem: 'Lucas', fala: 'Listen to that sound! Whirrrr!', audio: 'lucas3' },
            { personagem: 'Julia', fala: 'It’s ready! Look at this beautiful pink color.', audio: 'julia3' },
            { personagem: 'Lucas', fala: 'Wow, this is delicious! It gives me so much energy.', audio: 'lucas4' },
            { personagem: 'Julia', fala: 'A perfect start to our day!', audio: 'julia4' }
        ],
        quiz: {
            perguntas: [
                'What fruits did they use in the smoothie?',
                'What did they put in the blender besides fruit?',
                'How did Lucas feel after drinking the smoothie?'
            ],
            alternativas: [
                ['Apples and oranges.', 'Bananas and strawberries.', 'Grapes and pineapple.'],
                ['Milk and sugar.', 'Ice cream and chocolate.', 'Yogurt and honey.'],
                ['It made him sleepy.', 'He was still hungry.', 'It gave him a lot of energy.']
            ],
            respostasCorretas: [
                'Bananas and strawberries.',
                'Yogurt and honey.',
                'It gave him a lot of energy.'
            ]
        }
    }
];
