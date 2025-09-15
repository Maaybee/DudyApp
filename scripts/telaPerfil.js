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
    if (experienciaElem) experienciaElem.textContent = crianca.experiencia ?? 0;

    const iconeElem = document.getElementById("fotoPerfil");
    if (iconeElem) {
      iconeElem.src = crianca.icone || "../assets/default-kid.png";
      iconeElem.alt = `Ícone de ${crianca.nome ?? "criança"}`;
    }

    const nivelElem = document.getElementById("nivel");
    if (nivelElem) nivelElem.textContent = crianca.nivel ?? "Iniciante";
    
// --- NOVO: calcula a porcentagem com base na pontuação total ---
    const pontuacaoTotal = crianca.pontuacao_total ?? 0;
    const porcentagem = Math.min((pontuacaoTotal / 3000) * 100, 100); // garante max 100%

    const progressoElem = document.getElementById("progresso-preenchimento");
    const progressoText = document.getElementById("progresso");

    if (progressoElem) progressoElem.style.width = `${porcentagem}%`;
    if (progressoText) progressoText.textContent = `${Math.round(porcentagem)}%`;

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

function abrirMenu() {
  const menu = document.getElementById("menu");
  if (menu.style.display === "none") { 
    menu.style.display = "block";
  } else { 
    menu.style.display = "none";
  }
}

function fecharMenu() {
  document.getElementById("menu").style.display = "none";
}

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

function trocarPerfil (){ 
  
}
