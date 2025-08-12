document.getElementById('btnLogin').addEventListener('click', function() {

    console.log('Botão clicado, redirecionando...');
    
    window.location.href = 'telaLogin.html'; // se login feito com sucesso
});


//------- não mexer --------
document.getElementById('subtitle').addEventListener('click', function() {

    console.log('Botão clicado, redirecionando...');

    window.location.href = 'telaLogin.html'; 
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('mostrarSenha').addEventListener('click', function() {
        const fundo = this.src;
        const senhaInput = document.getElementById('senha2');
        if (fundo.includes('senhaFechado.svg')) {
            this.src = 'assets/senhaAberto.svg';
            // Altera o tipo do input
            senhaInput.type = 'text'; // Isso mudará de 'password' para 'text', revelando a senha
        } else {
            this.src = 'assets/senhaFechado.svg';
            senhaInput.type = 'password'; // Isso mudará de 'password' para 'text', revelando a senha
        }
    });
});