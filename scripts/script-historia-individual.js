// Variáveis Globais
let historiaAtual = null;
let indiceDialogo = 0;
let indicePergunta = 0;

// Elementos do DOM
const containerDialogos = document.getElementById('container-dialogos');
const containerQuiz = document.getElementById('quiz-area');
const btnProximo = document.getElementById('btnProximo');
const btnAnterior = document.getElementById('btnAnterior');
const audioPlayer = document.getElementById('player'); 

document.addEventListener('DOMContentLoaded', () => {
    // Pegando parâmetros da URL ou usando padrão
    const urlParams = new URLSearchParams(window.location.search);
    const idHistoria = urlParams.get('id') || 'picnic'; 
    
    historiaAtual = DADOS_HISTORIAS.find(h => h.id === idHistoria);

    if (!historiaAtual) {
        console.error("História não encontrada!");
        return;
    }

    carregarCabecalho();

    // INÍCIO AUTOMÁTICO
    renderizarProximaFala(); 

    // Botão Continuar
    btnProximo.addEventListener('click', () => {
        if (indiceDialogo < historiaAtual.dialogo.length) {
            renderizarProximaFala();
        } else {
            iniciarQuiz();
        }
    });
  
    // Botão Anterior 
    btnAnterior.addEventListener('click', () => {
        if (indiceDialogo > 0) {
            if (containerDialogos.lastChild) {
                containerDialogos.removeChild(containerDialogos.lastChild);
            }
            indiceDialogo--;
            atualizarEstadoBotoes();
        }
    });

    // Configurações de Sair
    document.getElementById('sair').addEventListener('click', () => document.getElementById('popupOverlay').classList.add('active'));
    document.getElementById('btnVoltar').addEventListener('click', () => document.getElementById('popupOverlay').classList.remove('active'));
    document.getElementById('btnSair').addEventListener('click', () => window.location.href = 'indexCentroHistorias.html');

    // Fecha tooltip ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.classList.contains('palavra-dica')) removerTooltips();
    });
});

function carregarCabecalho() {
    document.getElementById('titulo-historia').textContent = historiaAtual.titulo;
    document.getElementById('img-header').src = historiaAtual.icone_header;
    document.getElementById('lista-personagens').textContent = historiaAtual.personagens;
}

// --- LÓGICA DA HISTÓRIA ---

function renderizarProximaFala() {
    const linha = historiaAtual.dialogo[indiceDialogo];
    
    const divLinha = document.createElement('div');
    
    if (linha.tipo === 'acao') {
        // Linha de narração/ação
        divLinha.className = 'acao-row';
        divLinha.textContent = linha.texto;
    } else {
        // Balão de diálogo
        divLinha.className = 'fala-row';
        const bubble = document.createElement('div');
        bubble.className = 'fala-bubble';
        
        const textoComDicas = processarTexto(linha.fala);
        
        // --- MUDANÇA 1: HTML SEM ÍCONE DE ÁUDIO ---
        bubble.innerHTML = `
            <strong style="color:${historiaAtual.color_text}">${linha.personagem}:</strong><br>
            ${textoComDicas}
        `;
        
        // --- MUDANÇA 2: CLIQUE NO BALÃO TOCA O ÁUDIO ---
        bubble.addEventListener('click', () => {
            if (linha.audio) {
                tocarAudio(linha.audio);
            }
        });
        
        divLinha.appendChild(bubble);
        adicionarEventosDica(bubble);

        // Toca o áudio automaticamente ao aparecer
        if (linha.audio) {
            tocarAudio(linha.audio);
        }
    }

    containerDialogos.appendChild(divLinha);
    
    const scrollArea = document.querySelector('.content-scroll-area');
    // Pequeno delay para garantir scroll suave
    setTimeout(() => {
        scrollArea.scrollTo({ top: scrollArea.scrollHeight, behavior: 'smooth' });
    }, 100);

    indiceDialogo++;
    atualizarEstadoBotoes();
}

// --- FUNÇÃO DE ÁUDIO ---
function tocarAudio(nomeAudio) {
    if (!nomeAudio) return;

    const caminho = `../audios/${nomeAudio}.mp3`; 

    audioPlayer.src = caminho;
    audioPlayer.play().catch(e => {
        console.warn("Aguardando interação do usuário para tocar áudio.");
    });
}

function processarTexto(texto) {
    const palavras = texto.split(/(\s+|[.,!?])/); 
    const vocabulario = historiaAtual.vocabulario || {}; 

    return palavras.map(palavra => {
        const limpa = palavra.toLowerCase().replace(/[.,!?]/g, '').trim();
        const traducao = vocabulario[limpa];

        if (traducao) {
            return `<span class="palavra-dica" data-traducao="${traducao}">${palavra}</span>`;
        }
        return palavra;
    }).join('');
}

function adicionarEventosDica(elemento) {
    elemento.querySelectorAll('.palavra-dica').forEach(span => {
        span.addEventListener('click', (e) => {
            // --- IMPORTANTE: Impede que o clique na palavra toque o áudio do balão ---
            e.stopPropagation();
            
            removerTooltips();
            
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip-box';
            tooltip.textContent = span.dataset.traducao;
            span.appendChild(tooltip);
        });
    });
}

function removerTooltips() {
    document.querySelectorAll('.tooltip-box').forEach(t => t.remove());
}

function atualizarEstadoBotoes() {
    btnAnterior.disabled = (indiceDialogo === 0);
    
    if (indiceDialogo >= historiaAtual.dialogo.length) {
        btnProximo.textContent = "IR PARA O QUIZ";
    } else {
        btnProximo.textContent = "CONTINUAR";
    }
}

// --- LÓGICA DO QUIZ ---

function iniciarQuiz() {
    containerDialogos.style.display = 'none';
    document.getElementById('quiz-area').classList.remove('hidden');
    
    btnAnterior.style.display = 'none'; 
    btnProximo.style.display = 'none';  
    
    renderizarPergunta();
}

function renderizarPergunta() {
    if (indicePergunta >= historiaAtual.quiz.perguntas.length) {
        finalizarTudo();
        return;
    }

    const perguntaTexto = historiaAtual.quiz.perguntas[indicePergunta];
    const alternativas = historiaAtual.quiz.alternativas[indicePergunta];
    
    document.getElementById('pergunta').textContent = perguntaTexto;
    const containerBotoes = document.getElementById('botoes-container');
    containerBotoes.innerHTML = '';

    alternativas.forEach(alt => {
        const btn = document.createElement('button');
        btn.className = 'quiz-btn';
        btn.textContent = alt;
        btn.onclick = () => verificarResposta(btn, alt);
        containerBotoes.appendChild(btn);
    });
}

function verificarResposta(btnElement, respostaEscolhida) {
    const respostaCerta = historiaAtual.quiz.respostasCorretas[indicePergunta];
    
    const todosBtns = document.querySelectorAll('.quiz-btn');
    todosBtns.forEach(b => b.disabled = true);

    if (respostaEscolhida === respostaCerta) {
        btnElement.classList.add('correto');
        setTimeout(() => {
            indicePergunta++;
            renderizarPergunta();
        }, 1500);
    } else {
        btnElement.classList.add('errado');
        todosBtns.forEach(b => {
            if (b.textContent === respostaCerta) b.classList.add('correto');
        });
        setTimeout(() => {
            alert("Ops! Tente novamente.");
            todosBtns.forEach(b => {
                b.disabled = false;
                b.classList.remove('errado', 'correto');
            });
        }, 1000);
    }
}

// ========================================================
// FINALIZAÇÃO E SALVAMENTO (PADRÃO ATIVIDADES)
// ========================================================

async function finalizarTudo() {
    // Apenas chama a função de salvar, que cuidará de tudo (banco e modal)
    await salvarHistoriaNoBanco();
}

async function salvarHistoriaNoBanco() {
    // 1. Garante que pegamos o ID do localStorage (igual ao seu sistema usa)
    const idEstudante = localStorage.getItem("criancaSelecionada");

    if (!idEstudante) {
        console.error("Erro: Nenhum estudante selecionado no localStorage.");
        alert("Erro: Estudante não identificado. Volte ao menu.");
        return;
    }

    // CONFIGURAÇÕES DA RECOMPENSA DA HISTÓRIA
    const PONTOS_GANHOS = 20; // Histórias geralmente valem mais
    const PALAVRAS_NOVAS = 5; // Histórias têm vocabulário rico
    
    // Tenta pegar o ID do jogo definido na história, ou usa 999 como fallback
    const idJogoNumerico = (historiaAtual && historiaAtual.jogo_id) ? historiaAtual.jogo_id : 999;

    // Elementos de UI para feedback visual enquanto carrega
    const btnOpcoes = document.querySelectorAll('.quiz-btn');
    btnOpcoes.forEach(b => b.disabled = true); // Bloqueia cliques extras

    try {
        // ---------------------------------------------------------
        // PASSO 1: Salva no histórico (tabela estudantejogos)
        // ---------------------------------------------------------
        const { error: errorInsert } = await supabaseClient
            .from('estudantejogos')
            .insert({
                idestudante: parseInt(idEstudante),
                idjogos: parseInt(idJogoNumerico), 
                pontuacaoobtida: PONTOS_GANHOS,
                datarealizacao: new Date().toISOString()
            });

        if (errorInsert) throw errorInsert;

        // ---------------------------------------------------------
        // PASSO 2: Busca dados atuais do aluno
        // ---------------------------------------------------------
        const { data: estudanteData, error: errorSelect } = await supabaseClient
            .from('estudante')
            .select('pontuacao_total, palavras_total, medalhas_total')
            .eq('idestudante', parseInt(idEstudante))
            .single();

        if (errorSelect) throw errorSelect;

        // ---------------------------------------------------------
        // PASSO 3: Calcula novos totais
        // ---------------------------------------------------------
        const novaPontuacao = (estudanteData.pontuacao_total || 0) + PONTOS_GANHOS;
        const novasPalavras = (estudanteData.palavras_total || 0) + PALAVRAS_NOVAS;
        
        // LÓGICA DA MEDALHA NA HISTÓRIA
        // Você pode definir se histórias dão medalhas. 
        // Aqui deixei configurado para dar medalha se for uma "história especial" ou você pode mudar a regra.
        let novasMedalhas = estudanteData.medalhas_total || 0;
        let ganhouMedalha = false;

        // Exemplo: Se a história tiver uma flag "vale_medalha" nos dados dela
        if (historiaAtual.vale_medalha === true) {
            novasMedalhas += 1;
            ganhouMedalha = true;
        }

        // ---------------------------------------------------------
        // PASSO 4: Atualiza o perfil do aluno
        // ---------------------------------------------------------
        const { error: errorUpdate } = await supabaseClient
            .from('estudante')
            .update({ 
                pontuacao_total: novaPontuacao,
                palavras_total: novasPalavras,
                medalhas_total: novasMedalhas
            })
            .eq('idestudante', parseInt(idEstudante));

        if (errorUpdate) throw errorUpdate;

        console.log(`Sucesso! Pontos: ${novaPontuacao}, Medalhas: ${novasMedalhas}`);
        
        // Chama o modal visual com os dados atualizados
        atualizarModalSucesso(novaPontuacao, novasPalavras, ganhouMedalha, PONTOS_GANHOS);

    } catch (error) {
        console.error("Erro ao salvar dados:", error);
        // Fallback: Se der erro no banco, mostra o modal de conclusão mesmo assim para não travar a criança
        atualizarModalSucesso(0, 0, false, PONTOS_GANHOS);
    }
}

function atualizarModalSucesso(pontosTotais, palavrasTotais, ganhouMedalha, pontosGanhos) {
    const modal = document.getElementById('historia-concluida-modal'); // Certifique-se que o ID do seu modal no HTML é esse
    const conteudoModal = modal.querySelector('.modal-conteudo');
    
    // Monta o HTML com a mesma estrutura visual das Atividades
    let htmlContent = `
        <video class="video-conclusao" autoplay loop playsinline muted style="max-width: 200px; border-radius: 20px; margin-bottom: 10px;">
            <source src="../assets/video/conclusao.mp4" type="video/mp4">
            Seu navegador não suporta vídeo.
        </video>

        <h2 id="conclusao-titulo">História Completa! 📚</h2>

        <div class="conclusao-pontos" style="font-size: 24px; color: #58cc02; background: #eaffea; padding: 10px 20px; border-radius: 15px; display: inline-block; margin: 10px 0;">
            +${pontosGanhos} Pontos! ✨
        </div>
    `;

    // Se ganhou medalha, adiciona o visual
    if (ganhouMedalha) {
        htmlContent += `
            <div style="color: #ff9600; font-weight: bold; font-size: 18px; animation: popIn 0.5s infinite alternate; margin-top: 10px;">
                🏅 VOCÊ GANHOU UMA MEDALHA!
            </div>
        `;
    }

    // Detalhes finais e botão
    htmlContent += `
        <div class="conclusao-detalhes" style="margin-top: 15px; color: #666;">
            <strong>+5 Palavras novas!</strong><br>
            Total acumulado: ${palavrasTotais || '...'} palavras
        </div>

        <button id="btn-finalizar-novo" class="btn-principal-modal" style="background-color: #00BEFF; box-shadow: 0 6px 0 #0056b3; width:100%; color:white; border-radius: 25px; padding: 15px; font-size: 20px; border: none; font-weight:bold; cursor: pointer; margin-top: 20px;">
            CONCLUIR
        </button>
    `;

    // Injeta o HTML no modal
    conteudoModal.innerHTML = htmlContent;

    // Mostra o modal
    modal.classList.add('visivel');
    modal.style.display = 'flex';

    // Adiciona evento ao botão recém-criado
    document.getElementById('btn-finalizar-novo').addEventListener('click', () => {
        window.location.href = 'indexCentrohistorias.html';
    });
}