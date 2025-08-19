//atividade-individual 
document.getElementById('icone').addEventListener('click', function() {
    // Aqui você poderia fazer outras coisas, como salvar dados...
    console.log('Botão clicado, redirecionando...');
    
    // E então, redirecionar o usuário
    window.location.href = '/index.html'; 

});

document.getElementById('sair').addEventListener('click',function (){ 

    console.log ("botão de sair clicado...redirecionando") 
    window.location.href = "../telas/telaHome.html"
});

