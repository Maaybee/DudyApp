document.addEventListener('DOMContentLoaded', () => {
    // --- INICIALIZAÇÃO DO SUPABASE ---
    const SUPABASE_URL = "https://jqteyocpfokvjmsrdiea.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxdGV5b2NwZm9rdmptc3JkaWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MTQwNDIsImV4cCI6MjA3MTE5MDA0Mn0.SNBHJgmoXVIAx6d5uDIBU2OYfzIzyZMbqcigAuoSBtA";
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const urlParams = new URLSearchParams(window.location.search);
    const licaoId = parseInt(urlParams.get('licaoId'));
    
    const licaoAtual = DADOS_LICOES.find(l => l.id === licaoId);

    if (!licaoAtual) {
        document.body.innerHTML = "<h1>Erro: Lição não encontrada.</h1>";
        return;
    }

    // --- VARIÁVEIS DE ESTADO DA LIÇÃO ---
    const atividadesOriginais = [...licaoAtual.atividades];
    let atividadesRestantes = [...licaoAtual.atividades];
    let currentIndex = 0;
    let atividadesErradas = [];
    let atividadesCorretasUnicas = [];
    let licaoFinalizada = false;

    // --- ELEMENTOS DA PÁGINA ---
    const feedbackEl = document.getElementById('feedback');
    const btnVerificar = document.getElementById('btnVerificar');
    const progressoAtualEl = document.getElementById('progresso-atual');
    const licaoConcluidaModal = document.getElementById('licao-concluida-modal');
    const btnVoltarMenu = document.getElementById('btnVoltarMenu');
    const atividadeWrapper = document.querySelector('.atividade-wrapper');
    const acoesRodape = document.querySelector('.acoes-rodape');
    const progressoHeader = document.querySelector('.progresso-header');

    // --- FUNÇÕES PRINCIPAIS ---

    function atualizarProgresso() {
        const totalAtividades = atividadesOriginais.length;
        const percentual = (atividadesCorretasUnicas.length / totalAtividades) * 100;
        progressoAtualEl.style.width = `${percentual}%`;
    }

    async function carregarProximaAtividade() {
        if (licaoFinalizada) return;

        feedbackEl.className = '';
        feedbackEl.textContent = '';
        document.getElementById('exercicio-associacao').style.display = 'none';
        document.getElementById('exercicio-traducao').style.display = 'none';
        btnVerificar.disabled = true;

        if (currentIndex >= atividadesRestantes.length) {
            if (atividadesErradas.length > 0) {
                atividadesRestantes = atividadesErradas;
                atividadesErradas = [];
                currentIndex = 0;
            } else {
                licaoFinalizada = true;
                await salvarProgressoDaLicao();
                
                atividadeWrapper.style.display = 'none';
                acoesRodape.style.display = 'none';
                progressoHeader.style.display = 'none';
                licaoConcluidaModal.style.display = 'flex';
                btnVoltarMenu.onclick = () => { window.location.href = 'telaAtividade.html'; };
                return;
            }
        }

        const idDaProximaAtividade = atividadesRestantes[currentIndex];
        const atividadeCompleta = DADOS_ATIVIDADES.find(a => a.id === idDaProximaAtividade);

        if (!atividadeCompleta) {
            console.error('Detalhes da atividade não encontrados para o ID:', idDaProximaAtividade);
            return;
        }

        if (atividadeCompleta.tipo === 'associacao_imagem') {
            document.getElementById('exercicio-associacao').style.display = 'block';
            carregarExercicioAssociacao(atividadeCompleta);
        } else if (atividadeCompleta.tipo === 'traducao') {
            document.getElementById('exercicio-traducao').style.display = 'block';
            carregarExercicioTraducao(atividadeCompleta);
        }
        
        atualizarProgresso();
    }

    function verificarResposta(isCorreta, atividadeRespondida) {
        if (licaoFinalizada) return;
        btnVerificar.disabled = true;

        if (isCorreta) {
            feedbackEl.textContent = 'Correto!';
            feedbackEl.className = 'feedback correto';
            
            const jaAcertou = atividadesCorretasUnicas.includes(atividadeRespondida.id);
            if (!jaAcertou) {
                atividadesCorretasUnicas.push(atividadeRespondida.id);
                atualizarProgresso();
            }
        } else {
            feedbackEl.textContent = `Incorreto! A resposta era: ${atividadeRespondida.respostaCorreta}`;
            feedbackEl.className = 'feedback incorreto';
            
            const jaErrou = atividadesErradas.includes(atividadesRestantes[currentIndex]);
            if (!jaErrou) {
                atividadesErradas.push(atividadesRestantes[currentIndex]);
            }
        }
        
        currentIndex++;
        setTimeout(carregarProximaAtividade, 1500); 
    }

    async function salvarProgressoDaLicao() {
        const idEstudanteLogado = 1; // VALOR FIXO PARA TESTE
        const pontuacaoFinal = atividadesCorretasUnicas.length;
        // Usando um ID de jogo fictício para representar a lição
        const idDaLicaoComoJogo = licaoAtual.id + 100;

        const { data, error } = await supabaseClient
            .from('estudanteJogos')
            .insert([{ 
                idEstudante: idEstudanteLogado, 
                idJogos: idDaLicaoComoJogo,
                pontuacaoObtida: pontuacaoFinal,
                dataRealizacao: new Date() 
            }]);

        if (error) {
            console.error('Erro ao salvar progresso da lição:', error);
        } else {
            console.log('Progresso da lição salvo com sucesso!', data);
        }
    }

    // --- FUNÇÕES DE CARREGAMENTO DE EXERCÍCIOS ---

    function carregarExercicioAssociacao(dados) {
        const perguntaEl = document.getElementById('pergunta-associacao');
        const opcoesContainer = document.getElementById('opcoes-imagem');
        let respostaSelecionada = null;

        perguntaEl.innerHTML = dados.pergunta;
        opcoesContainer.innerHTML = '';

        dados.opcoes.forEach(opcao => {
            const card = document.createElement('div');
            card.className = 'card-imagem';
            card.dataset.resposta = opcao.id;
            
            const img = document.createElement('img');
            img.src = opcao.imagem;
            
            const p = document.createElement('p');
            p.textContent = opcao.texto;

            card.appendChild(img);
            card.appendChild(p);
            opcoesContainer.appendChild(card);

            card.addEventListener('click', () => {
                document.querySelectorAll('.card-imagem').forEach(c => c.classList.remove('selecionado'));
                card.classList.add('selecionado');
                respostaSelecionada = card.dataset.resposta;
                btnVerificar.disabled = false;
            });
        });

        btnVerificar.onclick = () => {
            verificarResposta(respostaSelecionada === dados.respostaCorreta, dados);
        };
    }

    function carregarExercicioTraducao(dados) {
        const perguntaEl = document.getElementById('pergunta-traducao');
        const btnAudio = document.getElementById('btnAudio');
        const spanPalavra = document.getElementById('palavra-audio');
        const inputResposta = document.getElementById('inputResposta');
        const imgContainer = document.getElementById('imagem-principal-container');
        const imgEl = document.getElementById('imagem-principal');

        perguntaEl.textContent = dados.pergunta;
        spanPalavra.textContent = dados.palavraOriginal;
        inputResposta.value = '';
        
        if (dados.imagemPrincipal) {
            imgContainer.style.display = 'flex';
            imgEl.src = dados.imagemPrincipal;
        } else {
            imgContainer.style.display = 'none';
        }
        
        btnAudio.onclick = () => { new Audio(dados.audio).play(); };

        inputResposta.addEventListener('input', () => {
            btnVerificar.disabled = inputResposta.value.trim() === '';
        });

        btnVerificar.onclick = () => {
            const respostaUsuario = inputResposta.value.trim().toLowerCase();
            const respostaCorreta = dados.respostaCorreta.trim().toLowerCase();
            verificarResposta(respostaUsuario === respostaCorreta, dados);
        };
    }

    // Inicia a primeira atividade da lição
    carregarProximaAtividade();
});