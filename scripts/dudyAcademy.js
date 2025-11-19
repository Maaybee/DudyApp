document.addEventListener('DOMContentLoaded', () => {
    const lessonCards = document.querySelectorAll('.atividade-card');

    // Configuração: Quantos níveis existem por módulo e quanto vale cada um?
    const TOTAL_LEVELS = 5;
    const PERCENT_PER_LEVEL = 100 / TOTAL_LEVELS; // 20%

    // --- FUNÇÃO PARA OBTER O PROGRESSO (Segura contra erros) ---
    function getLessonProgress(lessonId) {
        let progress = localStorage.getItem(`lesson_${lessonId}_progress`);
        return progress ? Math.max(0, Math.min(100, parseInt(progress, 10))) : 0;
    }

    // --- FUNÇÃO GLOBAL PARA SALVAR (Usada pelo scriptAtividade.js) ---
    window.saveLessonProgress = (lessonId, newProgress) => {
        newProgress = Math.max(0, Math.min(100, parseInt(newProgress, 10)));
        localStorage.setItem(`lesson_${lessonId}_progress`, newProgress);
        console.log(`Progresso da lição ${lessonId} salvo: ${newProgress}%`);
    };

    // --- Inicialização dos Cards ---
    if (lessonCards.length > 0) {
        lessonCards.forEach(card => {
            const lessonId = card.dataset.licaoId; // ID do Módulo (ex: "1")
            const progressoCircle = card.querySelector('.progresso-circle');
            const progressoPorcentagem = card.querySelector('.progresso-porcentagem');
            const textoLicoes = card.querySelector('.atividade-licoes'); // Para mostrar "Nível 1/5"

            if (lessonId && progressoCircle && progressoPorcentagem) {
                // 1. Ler Progresso Atual
                const currentProgress = getLessonProgress(lessonId);
                
                // 2. Atualizar Visual (Barra Circular)
                progressoCircle.style.setProperty('--progress', `${currentProgress}%`);
                progressoPorcentagem.textContent = `${currentProgress}%`;

                // 3. Calcular qual nível o usuário está
                // Se tem 0%, nivel atual é 1. Se tem 20%, nivel atual é 2.
                // Math.floor(20 / 20) = 1 + 1 = 2.
                let currentLevel = Math.floor(currentProgress / PERCENT_PER_LEVEL) + 1;
                if (currentLevel > TOTAL_LEVELS) currentLevel = TOTAL_LEVELS; // Trava no último se já acabou

                // Atualiza o textozinho "4 lições" para mostrar o nível atual
                if(textoLicoes) {
                    if (currentProgress === 100) textoLicoes.textContent = "Concluído!";
                    else textoLicoes.textContent = `Nível ${currentLevel} de ${TOTAL_LEVELS}`;
                }

                // 4. Evento de Clique Inteligente
                card.addEventListener('click', () => {
                    if (currentProgress === 100) {
                        if(confirm("Você já completou este módulo! Quer refazer o último nível?")) {
                             window.location.href = `atividade.html?moduleId=${lessonId}&level=${TOTAL_LEVELS}`;
                        }
                    } else {
                        // Manda para a atividade com o ID do módulo E o nível calculado
                        window.location.href = `atividade.html?moduleId=${lessonId}&level=${currentLevel}`;
                    }
                });
            }
        });
    }
});
