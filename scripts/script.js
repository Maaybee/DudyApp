const btnLogin = document.getElementById('bntlogin')
const btnCadastro = documen.getElementById('btncadastro')

function login () {
    window.location.href = 'telaLogin.html'
};

function cadastro () { 
    window.location.href = 'telaCadastro.html'
}


//atividade-individual 
document.getElementById('btnlogin').addEventListener('click', function() {
    // Aqui você poderia fazer outras coisas, como salvar dados...
    console.log('Botão clicado, redirecionando...');
    
    // E então, redirecionar o usuário
    window.location.href = 'index.html'; 
});

//atividade-individual 
document.getElementById('btnca').addEventListener('click', function() {
    // Aqui você poderia fazer outras coisas, como salvar dados...
    console.log('Botão clicado, redirecionando...');
    
    // E então, redirecionar o usuário
    window.location.href = 'index.html'; 
});

function perfil () { 
    document.addEventListener('click', function() {
        // Aqui você poderia fazer outras coisas, como salvar dados...
        console.log('Botão clicado, redirecionando...');

        // E então, redirecionar o usuário
        window.location.href = 'telaPerfil.html'; 
    });
};

