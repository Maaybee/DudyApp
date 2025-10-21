const btnProx = document.getElementById('proxAtv');
const recordTxt = document.getElementById('recordTxt');
const pontuacaoTxt = document.getElementById('pontuacaoTxt')

btnProx.addEventListener('click', () => {
    window.location.href = '../telas/telaJogo_memoria.html';
});

const btnSair = document.getElementById('voltar');
btnSair.addEventListener('click', () => {
    window.location.href = '../telas/tela_escolhaJogos.html';
});

const idEstudante = localStorage.getItem('criancaSelecionada');
const ID_JOGO_MEMORIA = 8; // 🔹 Substitua pelo ID real do jogo memória

document.addEventListener('DOMContentLoaded', () => {
    const tempoFinal = localStorage.getItem('memoriaTime') || '00:00';
    const tempoElement = document.getElementById('tempoTxt');
    tempoElement.textContent = tempoFinal;
    carregarRecorde();
});

async function carregarRecorde() {
    if (!idEstudante) {
        console.error('ID do estudante não encontrado. Jogador será tratado como novo.');
        return;
    }

    try {
        const { data, error, status } = await supabaseClient
            .from('estudantejogos')
            .select('Record')
            .eq('idestudante', idEstudante)
            .eq('idjogos', ID_JOGO_MEMORIA)
            .single();

        if (error && status !== 406) throw error;

        if (data && data.Record) {
            recordTxt.textContent = data.Record;
            pontuacaoTxt.textContent = localStorage.getItem('pontuacaoMemoria');
            console.log(`✅ Recorde anterior carregado: ${data.Record}`);
            isNewPlayer = false;
        } 
    } catch (error) {
        console.error('❌ Erro ao carregar recorde do Supabase (Verifique o nome da TABELA/COLUNAS):', error.message || error);
        isNewPlayer = true;
    }
}
