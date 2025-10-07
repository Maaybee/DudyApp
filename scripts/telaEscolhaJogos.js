const sairBtnPrincipal = document.getElementById('sair'); 

sairBtnPrincipal.addEventListener('click', () => {
    window.location.href = '../telas/telaHome.html';
});

const jogoMemoria = document.getElementById('jogo-memoria') 

jogoMemoria.addEventListener('click', () => { 
    window.location.href = 'telaJogo_memoria.html';
});
