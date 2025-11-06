// scripts/dudyAcademy.js

document.addEventListener('DOMContentLoaded', () => {
    const lessonCards = document.querySelectorAll('.atividade-card');

    // Mantenho a definição das lições para referência.
    // Usaremos o `id` para buscar o progresso.
    const lessonsData = [
        { id: 1, name: 'Comidas', totalActivities: 4, progress: 0, iconColor: '#ffb3b3' },
        { id: 2, name: 'Animais', totalActivities: 4, progress: 0, iconColor: '#a0d8ff' },
        { id: 3, name: 'Família', totalActivities: 4, progress: 0, iconColor: '#e0b0ff' },
        { id: 4, name: 'Escola', totalActivities: 4, progress: 0, iconColor: '#d1ffb7' },
    ];

    // Função para carregar o progresso de uma lição (simulado por enquanto)
    function getLessonProgress(lessonId) {
        // Exemplo de como você pode armazenar e recuperar do localStorage:
        // let progress = localStorage.getItem(`lesson_${lessonId}_progress`);
        // return progress ? parseInt(progress, 10) : 0;

        // Por enquanto, vamos retornar um progresso fixo para cada lição para fins de demonstração
        // Para testes, vamos dar um progresso diferente para cada lição:
        if (lessonId === "1") return 25; // Comidas com 25%
        if (lessonId === "2") return 50; // Animais com 50%
        if (lessonId === "3") return 75; // Família com 75%
        if (lessonId === "4") return 100; // Escola com 100%
        return 0; // Padrão para 0%
    }

    // Adiciona o evento de clique e ATUALIZA O PROGRESSO para cada card de lição
    lessonCards.forEach(card => {
        const lessonId = card.dataset.licaoId;
        const progressoCircle = card.querySelector('.progresso-circle');
        const progressoPorcentagem = card.querySelector('.progresso-porcentagem');

        // 1. ATUALIZA O PROGRESSO VISUAL DO ANEL E TEXTO
        const currentProgress = getLessonProgress(lessonId);
        progressoCircle.style.setProperty('--progress', `${currentProgress}%`);
        progressoPorcentagem.textContent = `${currentProgress}%`;

        // 2. ADICIONA O EVENTO DE CLIQUE
        card.addEventListener('click', (event) => {
            // O lessonId já foi obtido acima
            window.location.href = `atividade.html?lessonId=${lessonId}`;
        });
    });

    // Função para salvar o progresso (será chamada de `scriptAtividade.js` ao completar uma atividade/lição)
    // Exportamos essa função para que `scriptAtividade.js` possa usá-la.
    window.saveLessonProgress = (lessonId, newProgress) => {
        localStorage.setItem(`lesson_${lessonId}_progress`, newProgress);
        // Opcional: Re-renderizar os cards na tela Dudy Academy se o usuário voltar para ela
        // (Isso é mais complexo, por enquanto, o usuário verá o progresso atualizado ao RECARREGAR a tela)
    };
});