// Arquivo: scripts/scriptDudyAcademy.js (VERSÃO FINAL E CORRIGIDA)

document.addEventListener('DOMContentLoaded', async () => {
    
    // 1. VERIFICA QUAL ALUNO ESTÁ LOGADO
    // Pega o ID do estudante que foi salvo na tela de seleção de perfil
    const idEstudanteAtivo = localStorage.getItem('idEstudanteAtivo');
    
    if (!idEstudanteAtivo) {
        console.warn('Nenhum estudante ativo. O progresso não será exibido.');
        // Se não houver estudante ativo, o script para aqui e as barras ficam em 0%.
        return;
    }

    // --- 2. BUSCA O PROGRESSO SALVO NO SUPABASE ---
    let progressoSalvo = [];
    try {
        const { data, error } = await supabaseClient
            .from('estudantejogos') // Nome da tabela em minúsculas
            .select('idjogos, pontuacaoobtida')
            .eq('idestudante', idEstudanteAtivo); // Filtra pelo ID do estudante selecionado

        if (error) throw error;
        progressoSalvo = data;

    } catch (error) {
        console.error("Erro ao buscar progresso do estudante:", error);
    }

    // --- 3. ATUALIZA CADA CARD NA TELA ---
    const todosOsCards = document.querySelectorAll('.atividade-card');

    todosOsCards.forEach(card => {
        const licaoId = parseInt(card.dataset.licaoId);
        const licaoInfo = DADOS_LICOES.find(l => l.id === licaoId);
        if (!licaoInfo) return;

        const idLicaoNoSupabase = licaoId + 100;
        const totalAtividades = licaoInfo.atividades.length;

        const licoesTexto = card.querySelector('.atividade-licoes');
        if (licoesTexto) {
            licoesTexto.textContent = `${totalAtividades} lições`;
        }

        const registro = progressoSalvo.find(p => p.idjogos === idLicaoNoSupabase);
        
        let pontuacao = 0;
        if (registro) {
            pontuacao = registro.pontuacaoobtida;
        }

        // --- 4. CALCULA A PORCENTAGEM REAL ---
        const percentual = totalAtividades > 0 ? (pontuacao / totalAtividades) * 100 : 0;
        const percentualArredondado = Math.round(percentual);

        // --- 5. ATUALIZA O HTML COM OS VALORES VARIÁVEIS ---
        const porcentagemTexto = card.querySelector('.progresso-porcentagem');
        const circuloProgresso = card.querySelector('.progresso-circle');

        if (porcentagemTexto) {
            porcentagemTexto.textContent = `${percentualArredondado}%`;
        }
        if (circuloProgresso) {
            circuloProgresso.style.setProperty('--progress', `${percentualArredondado}%`);
        }
    });

    // --- 6. ADICIONA CLIQUES AOS CARDS ---
    todosOsCards.forEach(card => {
        card.addEventListener('click', () => {
            const licaoId = card.dataset.licaoId;
            window.location.href = `atividade.html?licaoId=${licaoId}`;
        });
    });

    // Lógica do botão de voltar
    const btnVoltar = document.querySelector('.btn-voltar');
    if(btnVoltar) {
        btnVoltar.addEventListener('click', () => {
            window.history.back();
        });
    }
});