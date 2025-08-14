document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const pontuacaoRecebida = params.get('pontuacao');
    const elementoPontuacao = document.getElementById('pontuacaoFinal')
    if (elementoPontuacao && pontuacaoRecebida !== null) {
        elementoPontuacao.textContent = pontuacaoRecebida;
    } else {
        elementoPontuacao.textContent = 'N/A'; // Caso a pontuação não seja encontrada
    }
});