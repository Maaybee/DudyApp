// Arquivo: scripts/scriptMenuAtividade.js

document.addEventListener('DOMContentLoaded', () => {
    // Certifique-se que o DADOS_LICOES está carregado antes de usar
    if (typeof DADOS_LICOES === 'undefined') {
        console.error('DADOS_LICOES não foi encontrado. Verifique a ordem dos scripts.');
        // Opcional: Carregar dinamicamente ou mostrar um erro
        return;
    }

    const containerAtividades = document.getElementById('Atividades');
    if (!containerAtividades) {
        console.error("Container #Atividades não encontrado.");
        return;
    }
    
    // Adicionar botões para CADA LIÇÃO definida em DADOS_LICOES
    DADOS_LICOES.forEach(licao => {
        const botao = document.createElement('button');
        botao.className = 'circle'; // Use sua classe para estilização
        
        // Exemplo de imagem para a lição (pode pegar da primeira atividade da lição ou ter uma específica)
        let imagemSrc = '../assets/img/default-lesson.png'; // Imagem padrão
        if (licao.atividades.length > 0) {
            // Tenta pegar a imagem da primeira atividade da lição
            const primeiraAtividade = DADOS_ATIVIDADES.find(a => a.id === licao.atividades[0].id);
            if (primeiraAtividade && primeiraAtividade.opcoes && primeiraAtividade.opcoes[0]) {
                imagemSrc = primeiraAtividade.opcoes[0].imagem;
            } else if (primeiraAtividade && primeiraAtividade.tipo === 'traducao') {
                // Se for tradução, pode usar um ícone genérico ou do áudio
                imagemSrc = '/DudyApp/assets/img/som.png';
            }
        }
        
        const imagem = document.createElement('img');
        imagem.src = imagemSrc;
        imagem.className = 'icone'; // Sua classe para ícones
        
        const titulo = document.createElement('h2');
        titulo.textContent = licao.titulo;

        botao.appendChild(imagem);
        botao.appendChild(titulo);

        botao.addEventListener('click', () => {
            // Redireciona para a página de atividade, passando o ID da lição
            window.location.href = `atividade.html?licaoId=${licao.id}`;
        });
        
        containerAtividades.appendChild(botao);
    });

    // --- Lógica do botão SAIR (mantida) ---
    const sairImg = document.getElementById('sair');
    if (sairImg) {
        sairImg.addEventListener('click', function() {
            window.location.href = 'telaHome.html'; // Volta para a tela principal
        });
    } else {
        console.warn("Elemento com ID 'sair' não encontrado.");
    }
});