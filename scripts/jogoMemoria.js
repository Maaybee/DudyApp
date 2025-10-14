
const popupOverlay = document.getElementById('popupOverlay'); 
const sairBtnPrincipal = document.getElementById('sair'); 
const regressivaContainer = document.getElementById('container'); 
const timeRegressivaElement = document.getElementById('regressiva'); 
const cronometroElement = document.getElementById('time'); 


let contagemAtual = 3;
let segundosJogo = 0;
let cronometroIntervalo; 


function formatarTempo(segundos) {
    const minutos = String(Math.floor(segundos / 60)).padStart(2, '0');
    const secs = String(segundos % 60).padStart(2, '0');
    return `${minutos}:${secs}`;
}

function iniciarCronometroJogo() {
    regressivaContainer.style.display = 'none'; 

    cronometroIntervalo = setInterval(() => {
        segundosJogo++;
        cronometroElement.textContent = formatarTempo(segundosJogo);
    }, 1000);
}


sairBtnPrincipal.addEventListener('click', () => {

    clearInterval(cronometroIntervalo); 
    popupOverlay.classList.add('active');
});

popupOverlay.querySelector('#btnSair').addEventListener('click', () => {

    window.location.href = '../telas/tela_escolhaJogos.html';
});

popupOverlay.querySelector('#btnVoltar').addEventListener('click', () => {

    iniciarCronometroJogo();
    popupOverlay.classList.remove('active');
});




document.addEventListener('DOMContentLoaded', () => { 




    const regressivaIntervalo = setInterval(() => {
        contagemAtual--;
        timeRegressivaElement.textContent = contagemAtual;
        
        if (contagemAtual <= 0) {
            clearInterval(regressivaIntervalo);

            setTimeout(() => {
                iniciarCronometroJogo();
            }, 500); 
        }

    }, 1000); 

});
