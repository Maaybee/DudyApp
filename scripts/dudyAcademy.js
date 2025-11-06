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

    // --- FUNÇÃO CORRIGIDA PARA OBTER O PROGRESSO DO LOCALSTORAGE ---
    function getLessonProgress(lessonId) {
        // Tenta obter o progresso salvo para esta lição do localStorage
        let progress = localStorage.getItem(`lesson_${lessonId}_progress`);
        
        // Se não houver progresso salvo, retorna 0.
        // Caso contrário, converte para inteiro e garante que seja entre 0 e 100.
        return progress ? Math.max(0, Math.min(100, parseInt(progress, 10))) : 0;
    }

    // --- FUNÇÃO PARA SALVAR O PROGRESSO NO LOCALSTORAGE (GLOBALMENTE ACESSÍVEL) ---
    // Esta função é chamada do scriptAtividade.js
    window.saveLessonProgress = (lessonId, newProgress) => {
        // Converte para inteiro e garante que seja entre 0 e 100 antes de salvar
        newProgress = Math.max(0, Math.min(100, parseInt(newProgress, 10)));
        localStorage.setItem(`lesson_${lessonId}_progress`, newProgress);
        console.log(`Progresso da lição ${lessonId} salvo: ${newProgress}%`);
        
        // Opcional: Atualizar a exibição DO CARD ESPECÍFICO na tela de listagem
        // caso o usuário esteja nesta tela e o progresso seja atualizado por algum motivo
        // (ex: outra aba, ou uma função futura). Para o fluxo atual, o progresso
        // será lido ao CARREGAR a tela telaDudyAcademy.html.
        const cardToUpdate = document.querySelector(`.atividade-card[data-licao-id="${lessonId}"]`);
        if (cardToUpdate) {
            const progressoCircle = cardToUpdate.querySelector('.progresso-circle');
            const progressoPorcentagem = cardToUpdate.querySelector('.progresso-porcentagem');
            progressoCircle.style.setProperty('--progress', `${newProgress}%`);
            progressoPorcentagem.textContent = `${newProgress}%`;
        }
    };


    // --- Inicialização: Renderiza e adiciona eventos para CADA card de lição ---
    lessonCards.forEach(card => {
        const lessonId = card.dataset.licaoId;
        const progressoCircle = card.querySelector('.progresso-circle');
        const progressoPorcentagem = card.querySelector('.progresso-porcentagem');

        // 1. LÊ O PROGRESSO SALVO E ATUALIZA O VISUAL DO ANEL E TEXTO
        const currentProgress = getLessonProgress(lessonId);
        progressoCircle.style.setProperty('--progress', `${currentProgress}%`);
        progressoPorcentagem.textContent = `${currentProgress}%`;

        // 2. ADICIONA O EVENTO DE CLIQUE
        card.addEventListener('click', (event) => {
            window.location.href = `atividade.html?lessonId=${lessonId}`;
        });
    });

});