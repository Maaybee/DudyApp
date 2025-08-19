const btnLogin = document.getElementById('bntlogin')
const btnCadastro = documen.getElementById('btncadastro')

function login () {
    window.location.href = './telas/telaLogin.html'
};

function cadastro () { 
    window.location.href = './telas/telaCadastro.html'
}


//atividade-individual 
document.getElementById('btnlogin').addEventListener('click', function() {
    // Aqui você poderia fazer outras coisas, como salvar dados...
    console.log('Botão clicado, redirecionando...');
    
    // E então, redirecionar o usuário
    window.location.href = '/index.html'; 
});

//atividade-individual 
document.getElementById('btnca').addEventListener('click', function() {
    // Aqui você poderia fazer outras coisas, como salvar dados...
    console.log('Botão clicado, redirecionando...');
    
    // E então, redirecionar o usuário
    window.location.href = '/index.html'; 
});

function perfil () { 
    
    console.log('Botão clicado, redirecionando...');

    window.location.href = '../telas/telaPerfil.html'; 
};

function atividade () { 
    console.log('Botão clicado, redirecionando...');

    window.location.href = '../telas/telaAtividade.html'; 
}



