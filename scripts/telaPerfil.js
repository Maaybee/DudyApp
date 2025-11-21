// scripts/telaperfil.js

// Pega o id da criança selecionada
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
    const nomeElem = document.getElementById("nomePerfil");
    if (nomeElem) nomeElem.textContent = crianca.nome ?? "Sem nome";

    const experienciaElem = document.getElementById("experiencia");
    // A experiência agora é o reflexo da pontuação total (Lições + Jogos)
    if (experienciaElem) experienciaElem.textContent = crianca.pontuacao_total ?? 0;

    const iconeElem = document.getElementById("fotoPerfil");
    if (iconeElem) {
      iconeElem.src = crianca.icone || "../assets/default-kid.png";
      iconeElem.alt = `Ícone de ${crianca.nome ?? "criança"}`;
    }

    const nivelElem = document.getElementById("nivel");
    if (nivelElem) nivelElem.textContent = crianca.nivel ?? "Iniciante";
    
    // ============================================================
    // CÁLCULO DA BARRA DE PROGRESSO (LIÇÕES + JOGOS)
    // ============================================================
    const pontuacaoTotal = crianca.pontuacao_total ?? 0;
    
    // META_PONTOS: Define quantos pontos são necessários para ter 100% do curso.
    // Se 1 Módulo (100pts) vale 5%, então o total é 2000.
    // O Jogo da Memória (~80pts) vai contribuir com aprox. 4% a cada vitória.
    const META_PONTOS = 4000; 

    const porcentagem = Math.min((pontuacaoTotal / META_PONTOS) * 100, 100); 

    const progressoElem = document.getElementById("progresso-preenchimento");
    const progressoText = document.getElementById("progresso");

    if (progressoElem) progressoElem.style.width = `${porcentagem}%`;
    if (progressoText) progressoText.textContent = `${Math.floor(porcentagem)}%`;

    // ============================================================

    // --- Palavras faladas ---
    const palavrasTotal = crianca.palavras_total ?? 0;
    const maxPalavras = 220;
    const palavrasText = document.getElementById("palavras-texto");
    if (palavrasText) palavrasText.textContent = `${palavrasTotal}/${maxPalavras}`;

    // --- Medalhas da semana ---
    const medalhasTotal = crianca.medalhas_total ?? 0;
    const maxMedalhas = 14;
    const medalhasText = document.getElementById("medalhas-texto");
    if (medalhasText) medalhasText.textContent = `${medalhasTotal}/${maxMedalhas}`;

  } catch (err) {
    console.error("Erro ao carregar criança:", err);
  }
}

// Executa quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  if (!idEstudante) {
    alert("Nenhuma criança selecionada. Volte à tela de seleção.");
    return;
  }

  carregarPerfil(idEstudante);
});

async function logout() {
  try {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;

    localStorage.clear();
    window.location.href = "../index.html";
  } catch (err) {
    console.error("Erro inesperado ao sair:", err);
    alert("Ocorreu um erro. Tente novamente.");
  }
}

function home() { 
    console.log('Botão clicado, redirecionando...');
    window.location.href = '../telas/telaHome.html'; 
};

function urso() { 
    console.log('Botão clicado, redirecionando...');
    window.location.href = '../telas/telaUrso.html'; 
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

function trocarPerfil (){ 
  window.location.href = "telaCadKid_1.html"
}