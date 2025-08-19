document.getElementById('btnLogin').addEventListener('click', function() {

    console.log('Botão clicado, redirecionando...');
    
    window.location.href = '../telas/telaLogin.html'; // se login feito com sucesso
});


//------- não mexer --------
document.getElementById('subtitle').addEventListener('click', function() {

    console.log('Botão clicado, redirecionando...');

    window.location.href = '../telas/telaLogin.html'; 
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('mostrarSenha').addEventListener('click', function() {
        const fundo = this.src;
        const senhaInput = document.getElementById('senha2');
        if (fundo.includes('../assets/senhaFechado.svg')) {
            this.src = 'assets/senhaAberto.svg';
            // Altera o tipo do input
            senhaInput.type = 'text'; // Isso mudará de 'password' para 'text', revelando a senha
        } else {
            this.src = '../assets/senhaFechado.svg';
            senhaInput.type = 'password'; // Isso mudará de 'password' para 'text', revelando a senha
        }
    });

});

document.addEventListener('DOMContentLoaded', () => {
    // Pegando os elementos do formulário pelos seus IDs
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('emailLogin');
    const senhaInput = document.getElementById('senhaCadastro');
    const senha2Input = document.getElementById('senha2');
    const btnCadastro = document.getElementById('btnLogin'); // O botão "Cadastre-se"

    // Verifica se o botão foi encontrado antes de adicionar o evento
    if (btnCadastro) {
        btnCadastro.addEventListener('click', () => {
            // 1. Validação dos dados do formulário
            const nomeResponsavel = nomeInput.value.trim();
            const email = emailInput.value.trim();
            const senha = senhaInput.value;
            const senha2 = senha2Input.value;

            if (!nomeResponsavel || !email || !senha || !senha2) {
                alert('Por favor, preencha todos os campos.');
                return; // Para a execução se algo estiver faltando
            }

            if (senha !== senha2) {
                alert('As senhas não coincidem!');
                return; // Para a execução se as senhas forem diferentes
            }

            // 2. Criando o objeto com os dados para enviar ao PHP
            const dadosCadastro = {
                nomeResponsavel: nomeResponsavel,
                emailResponsavel: email,
                senhaResponsavel: senha
            };

            console.log("Enviando dados do responsável para o PHP:", dadosCadastro);

            // 3. Enviando os dados para a API PHP via fetch
            fetch('api/cadastrar.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosCadastro)
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'sucesso') {
                    // Pega o ID que o PHP retornou
                    const idResponsavel = data.idResponsavel;
                    // Redireciona para a tela de cadastro da criança, passando o ID na URL
                    alert('Responsável cadastrado com sucesso! Agora, cadastre a criança.');
                    window.location.href = `telaCadKid.html?resp_id=${idResponsavel}`;
                } else {
                    // Mostra a mensagem de erro vinda do PHP (ex: "email já existe")
                    alert('Erro no cadastro: ' + data.mensagem);
                }
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
                alert('Ocorreu um erro de comunicação. Verifique o console (F12) para mais detalhes.');
            });
        });
    } else {
        console.error('Botão de cadastro (ID: btnLogin) não foi encontrado na página.');
    }
});
