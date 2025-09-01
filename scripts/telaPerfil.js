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

    const iconeElem = document.getElementById("icone");
    if (iconeElem) {
      iconeElem.src = crianca.icone || "../assets/default-kid.png";
      iconeElem.alt = `Ícone de ${crianca.nome ?? "criança"}`;
    }

    const nivelElem = document.getElementById("nivel");
    if (nivelElem) nivelElem.textContent = crianca.nivel ?? "Iniciante";

    const progressoElem = document.getElementById("progresso-preenchimento");
    const progressoText = document.getElementById("progresso");
    const progresso = crianca.progresso ?? 0;
    if (progressoElem) progressoElem.style.width = `${progresso}%`;
    if (progressoText) progressoText.textContent = `${progresso}%`;

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

// Logout
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
