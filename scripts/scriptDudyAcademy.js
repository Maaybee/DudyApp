// Arquivo: scripts/scriptDudyAcademy.js (VERSÃO COMPLETA)

document.addEventListener('DOMContentLoaded', async () => {
    
    // 1. VERIFICA QUAL ALUNO ESTÁ LOGADO
    const idEstudanteAtivo = localStorage.getItem('criancaSelecionada'); 
    
    if (!idEstudanteAtivo) {
        console.warn('Nenhum estudante ativo. O progresso não será exibido.');
    }

    // --- 2. BUSCA O PROGRESSO SALVO NO SUPABASE ---
    let progressoSalvo = [];
    if (idEstudanteAtivo) { 
        try {
            const { data, error } = await supabaseClient
                .from('estudantejogos') 
                .select('idjogos, pontuacaoobtida')
                .eq('idestudante', idEstudanteAtivo);

            if (error) throw error;
            progressoSalvo = data;
        } catch (error) {
            console.error("Erro ao buscar progresso:", error);
        }
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
        if (licoesTexto) licoesTexto.textContent = `${totalAtividades} lições`;

        const registro = progressoSalvo.find(p => p.idjogos === idLicaoNoSupabase);
        let pontuacao = 0;
        if (registro) pontuacao = registro.pontuacaoobtida;

        const percentual = totalAtividades > 0 ? (pontuacao / totalAtividades) * 100 : 0;
        const percentualArredondado = Math.round(percentual);

        const porcentagemTexto = card.querySelector('.progresso-porcentagem');
        if (porcentagemTexto) porcentagemTexto.textContent = `${percentualArredondado}%`;

        const circuloProgresso = card.querySelector('.progresso-circle');
        if (circuloProgresso) circuloProgresso.style.setProperty('--progress', `${percentualArredondado}%`);
    });

    // --- 4. ADICIONA CLIQUES AOS CARDS ---
    todosOsCards.forEach(card => {
        card.addEventListener('click', () => {
            if (!idEstudanteAtivo) {
                alert("Por favor, selecione um perfil de criança antes de iniciar as atividades!");
                window.location.href = '../telas/telacadastrokid.html'; 
                return;
            }
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