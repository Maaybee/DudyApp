// Arquivo: scripts/scriptMapaAtividades.js (VERSÃO FINAL COM CÁLCULO DE ALTURA)

document.addEventListener('DOMContentLoaded', () => {
    const licoesContainer = document.getElementById('licoes-container');
    const mapaContainer = document.querySelector('.mapa-container');
    const btnVoltar = document.querySelector('.btn-voltar');
    const mapaBackgroundImages = document.querySelector('.mapa-background-images');
    const imagensFundo = mapaBackgroundImages.querySelectorAll('.mapa-caminho-parte');

    // --- POSIÇÕES DAS LIÇÕES (AJUSTE AQUI!) ---
    // Você ainda precisará ajustar estes valores após a tela ficar com a rolagem correta.
    const posicoes = [
        { top: '10%', left: '50%' },   // Posição da Lição 1
        { top: '25%', left: '50%' },   // Posição da Lição 2
        { top: '40%', left: '50%' },   // Posição da Lição 3
        { top: '55%', left: '80%' },   // Posição da Lição 4
        { top: '70%', left: '50%' },   // Posição da Lição 5
        // ... adicione as posições para as suas 20 lições aqui
    ];

    const coresBotoes = ['cor-1', 'cor-2', 'cor-3', 'cor-4'];

    // Função para criar e posicionar os botões
    const criarLicoes = () => {
        // Limpa o container antes de adicionar, caso seja chamado múltiplas vezes
        licoesContainer.innerHTML = ''; 

        DADOS_LICOES.forEach((licao, index) => {
            if (!posicoes[index]) return; 

            const botao = document.createElement('button');
            botao.className = `licao-ponto ${coresBotoes[index % coresBotoes.length]}`;
            botao.dataset.licaoId = licao.id;

            const pos = posicoes[index];
            botao.style.top = pos.top;
            botao.style.left = pos.left;
            botao.style.transform = 'translateX(-50%)';

            const icone = document.createElement('img');
            icone.src = licao.icone;
            icone.className = 'icone-licao';
            
            const titulo = document.createElement('p');
            titulo.textContent = licao.titulo;

            botao.appendChild(icone);
            botao.appendChild(titulo);

            botao.addEventListener('click', () => {
                window.location.href = `atividade.html?licaoId=${licao.id}`;
            });
            
            licoesContainer.appendChild(botao);
        });
    };

    // Função para ajustar a altura dos containers após o carregamento das imagens
    const ajustarAlturaDoMapa = () => {
        let totalHeight = 0;
        imagensFundo.forEach(img => {
            totalHeight += img.offsetHeight; // Soma a altura de cada imagem
        });

        // Aplica a altura total ao .mapa-container e #licoes-container
        mapaContainer.style.height = `${totalHeight}px`;
        licoesContainer.style.height = `${totalHeight}px`;
        console.log(`Altura total do mapa ajustada para: ${totalHeight}px`);

        // Agora que a altura está correta, crie as lições
        criarLicoes();
    };

    // Garante que a altura seja ajustada APÓS TODAS as imagens carregarem
    let imagensCarregadas = 0;
    imagensFundo.forEach(img => {
        if (img.complete) { // Se a imagem já estiver carregada (cache)
            imagensCarregadas++;
        } else {
            img.addEventListener('load', () => {
                imagensCarregadas++;
                if (imagensCarregadas === imagensFundo.length) {
                    ajustarAlturaDoMapa();
                }
            });
            img.addEventListener('error', () => {
                console.error(`Erro ao carregar imagem: ${img.src}`);
                imagensCarregadas++;
                if (imagensCarregadas === imagensFundo.length) {
                    ajustarAlturaDoMapa();
                }
            });
        }
    });

    // Se todas as imagens já estiverem carregadas antes mesmo do DOMContentLoaded
    if (imagensCarregadas === imagensFundo.length) {
        ajustarAlturaDoMapa();
    }

    if (btnVoltar) {
        btnVoltar.addEventListener('click', () => { window.history.back(); });
    }
});