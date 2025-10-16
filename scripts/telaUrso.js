// telaUrso.js

function home() { 
    console.log('Botão Pratica clicado, redirecionando para telaHome.html...');
    window.location.href = '../telas/telaHome.html'; 
}

function perfil() { 
    console.log('Botão Perfil clicado, redirecionando para telaPerfil.html...');
    window.location.href = '../telas/telaPerfil.html'; 
}

function urso() { 
    console.log('Botão Toy Toy clicado, redirecionando para tel.html...');
    window.location.href = '../telas/telaUrso.html'; // Corrigido para telaUrso.html se for a própria página
}

// As funções abrirMenu e fecharMenu não são usadas neste layout, podem ser removidas ou mantidas se forem para outro propósito.
function abrirMenu() {
    const menu = document.getElementById("menu");
    if (menu.style.display === "block") { 
        menu.style.display = "none";
    } else { 
        menu.style.display = "block";
    }
}

function fecharMenu() {
    document.getElementById("menu").style.display = "none";
}