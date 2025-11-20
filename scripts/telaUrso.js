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

const idEstudante = localStorage.getItem("criancaSelecionada");

async function carregarPerfil(idEstudante) {
  const idInt = parseInt(idEstudante, 10);
  if (isNaN(idInt)) {
    alert("ID da criança inválido.");
    return;
  }

  try {
    const { data: crianca, error } = await supabaseClient
      .from("estudante")
      .select("*")
      .eq("idestudante", idInt)
      .single();

    if (error) {
      console.error("Erro ao buscar criança:", error.message);
      return;
    }

    if (!crianca) {
      console.error("Nenhuma criança encontrada com esse ID.");
      return;
    }

    // Atualiza os elementos da página


    const iconeElem = document.getElementById("fotoPerfil");
    if (iconeElem) {
      iconeElem.src = crianca.icone || "../assets/default-kid.png";
      iconeElem.alt = `Ícone de ${crianca.nome ?? "criança"}`;
    }


  } catch (err) {
    console.error("Erro ao carregar criança:", err);
  }
}
