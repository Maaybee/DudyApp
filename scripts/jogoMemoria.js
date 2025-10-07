const sairBtnPrincipal = document.getElementById('sair'); 

sairBtnPrincipal.addEventListener('click', () => {
    popupOverlay.classList.add('active');
});
popupOverlay.querySelector('#btnSair').addEventListener('click', () => {
    window.location.href = '../telas/tela_escolhaJogos.html';
});
popupOverlay.querySelector('#btnVoltar').addEventListener('click', () => {
    popupOverlay.classList.remove('active');
});

