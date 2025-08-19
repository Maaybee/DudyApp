// Arquivo: scripts/telaCadKid.js (NOVO)

document.addEventListener('DOMContentLoaded', () => {
    // 1. PEGAR O ID DO RESPONSÁVEL DA URL
    const urlParams = new URLSearchParams(window.location.search);
    const idResponsavel = urlParams.get('resp_id');

    // Se não encontrou o ID, é um erro. Volta para o início.
    if (!idResponsavel) {
        alert('Erro: ID do responsável não encontrado. Por favor, comece o cadastro novamente.');
        window.location.href = 'telaCadastro.html';
        return;
    }

    // Pegando os elementos do formulário da criança
    const nomeInput = document.getElementById('nome');
    const dataNascInput = document.getElementById('dataNasc');
    const btnCadastrarKid = document.getElementById('btnLogin');

    btnCadastrarKid.addEventListener('click', () => {
        const nomeCrianca = nomeInput.value.trim();
        const dataNascCrianca = dataNascInput.value;

        if (!nomeCrianca || !dataNascCrianca) {
            alert('Por favor, preencha todos os campos da criança.');
            return;
        }

        // 2. MONTAR O OBJETO COM OS DADOS DA CRIANÇA E O ID DO RESPONSÁVEL
        const dadosKid = {
            nomeCrianca: nomeCrianca,
            dataNascCrianca: dataNascCrianca,
            idResponsavel: idResponsavel // O ID que pegamos da URL!
        };

        // 3. ENVIAR PARA A NOVA API PHP
        fetch('api/cadastrar_kid.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosKid)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'sucesso') {
                alert(data.mensagem);
                // Deu tudo certo! Redireciona para o login ou para a home.
                window.location.href = 'telaLogin.html';
            } else {
                alert('Erro no cadastro: ' + data.mensagem);
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            alert('Ocorreu um erro de comunicação. Tente novamente.');
        });
    });
});