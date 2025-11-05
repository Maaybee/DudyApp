// Arquivo: scripts/scriptDudyAcademy.js (VERSÃO FINAL E CORRIGIDA)

document.addEventListener('DOMContentLoaded', async () => {
    
    // 1. VERIFICA QUAL ALUNO ESTÁ LOGADO
    const idEstudanteAtivo = localStorage.getItem('idEstudanteAtivo');
    
    if (!idEstudanteAtivo) {
        console.warn('Nenhum estudante ativo. O progresso não será exibido.');
        // Opcional: Redirecionar para a tela de seleção de perfil se nenhum estudante estiver ativo
        // window.location.href = 'telaSelecaoKid.html';
        return;
    }

    // --- 2. BUSCA O PROGRESSO SALVO NO SUPABASE ---
    let progressoSalvo = [];
    try {
        const { data, error } = await supabaseClient
            .from('estudantejogos') // Nome da tabela em minúsculas (verifique o nome exato no Supabase)
            .select('idjogos, pontuacaoobtida')
            .eq('idestudante', idEstudanteAtivo);

        if (error) throw error;
        progressoSalvo = data;
        console.log('Progresso do estudante ativo (ID:', idEstudanteAtivo, '):', progressoSalvo);
    } catch (error) {
        console.error("Erro ao buscar progresso do estudante:", error);
    }

    // --- 3. ATUALIZA CADA CARD NA TELA ---
    const todosOsCards = document.querySelectorAll('.atividade-card');

    todosOsCards.forEach(card => {
        const licaoId = parseInt(card.dataset.licaoId);
        
        // Encontra a lição correspondente no "banco de dados" JS (dadosLicoes.js)
        const licaoInfo = DADOS_LICOES.find(l => l.id === licaoId);
        if (!licaoInfo) {
            console.warn(`Dados para a lição com ID ${licaoId} não encontrados em DADOS_LICOES.`);
            return;
        }

        // IDs que o Supabase usa para lições (ex: 101, 102...)
        // Assumindo que seu idjogos no Supabase é licaoId + 100
        const idLicaoNoSupabase = licaoId + 100; 
        const totalAtividades = licaoInfo.atividades.length;

        // Atualiza o número de lições no card (ex: "20 lições")
        const licoesTexto = card.querySelector('.atividade-licoes');
        if (licoesTexto) {
            licoesTexto.textContent = `${totalAtividades} lições`;
        }

        // Procura o registro de progresso para esta lição específica no que veio do Supabase
        const registro = progressoSalvo.find(p => p.idjogos === idLicaoNoSupabase);
        
        let pontuacao = 0;
        if (registro) {
            pontuacao = registro.pontuacaoobtida;
        }

        // --- 4. CALCULA A PORCENTAGEM REAL ---
        const percentual = totalAtividades > 0 ? (pontuacao / totalAtividades) * 100 : 0;
        let percentualArredondado = Math.round(percentual);

        // --- INÍCIO: PARA TESTAR MANUALMENTE O PROGRESSO DA BARRINHA ---
        // Você pode descomentar e ajustar os valores aqui para ver o efeito.
         //Lembre-se de comentar/remover para usar os dados reais do Supabase.
        
        if (licaoId === 1) { // Para a lição "Comidas"
            percentualArredondado = 50; 
        } else if (licaoId === 2) { // Para a lição "Animais"
            percentualArredondado = 75;
        } else if (licaoId === 3) { // Para a lição "Família"
            percentualArredondado = 10;
        } else if (licaoId === 4) { // Para a lição "Escola"
            percentualArredondado = 90;
        } else if (licaoId === 5) { // Para a lição "Viagens"
            percentualArredondado = 25;
        }
    
        // --- FIM: PARA TESTAR MANUALMENTE ---


        // --- 5. ATUALIZA OS ELEMENTOS VISUAIS NO CARD ---
        const porcentagemTexto = card.querySelector('.progresso-porcentagem');
        const circuloProgresso = card.querySelector('.progresso-circle');

        if (porcentagemTexto) {
            porcentagemTexto.textContent = `${percentualArredondado}%`;
        }
        if (circuloProgresso) {
            // A CORREÇÃO CRUCIAL: Adicionamos o "%" ao valor da variável CSS
            circuloProgresso.style.setProperty('--progress', `${percentualArredondado}%`);
        }
    });

    // --- 6. ADICIONA LÓGICA DE CLIQUE AOS CARDS ---
    todosOsCards.forEach(card => {
        card.addEventListener('click', () => {
            const licaoId = card.dataset.licaoId;
            // Redireciona para o mapa de atividades dessa lição/categoria
            window.location.href = `telaMapaAtividades.html?licaoId=${licaoId}`;
        });
    });

    // Lógica do botão de voltar
    const btnVoltar = document.querySelector('.btn-voltar');
    if(btnVoltar) {
        btnVoltar.addEventListener('click', () => {
            window.history.back(); // Volta para a página anterior
        });
    }
});
