document.addEventListener('DOMContentLoaded', () => {
    const progressoPreenchimento = document.getElementById('progresso-preenchimento');
    const textoProgresso = document.getElementById('progresso');
    const nivelTexto = document.getElementById('nivel');

    // Função para atualizar o progresso
    function atualizarProgresso(porcentagem) {
        // Garante que a porcentagem esteja entre 0 e 100
        const progressoAtual = Math.min(100, Math.max(0, porcentagem));

        // Atualiza a largura do preenchimento da barra de progresso
        progressoPreenchimento.style.width = `${progressoAtual}%`;

        // Atualiza o texto da porcentagem
        textoProgresso.textContent = `${progressoAtual}%`;

        // Opcional: Atualizar o nível com base no progresso
        if (progressoAtual < 25) {
            nivelTexto.textContent = 'Iniciante';
        } else if (progressoAtual < 50) {
            nivelTexto.textContent = 'Básico';
        } else if (progressoAtual < 75) {
            nivelTexto.textContent = 'Intermediário';
        } else {
            nivelTexto.textContent = 'Avançado';
        }
    }

    // --- Exemplos de como você pode usar a função ---

    // Exemplo 1: Define um progresso inicial ao carregar a página (ex: 30%)
    atualizarProgresso(80);

   
});