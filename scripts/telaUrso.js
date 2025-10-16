function home() { 
    
    console.log('Botão clicado, redirecionando...');

    window.location.href = '../telas/telaHome.html'; 
};
function urso() { 
    
    console.log('Botão clicado, redirecionando...');

    window.location.href = '../telas/tel.html'; 
};

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