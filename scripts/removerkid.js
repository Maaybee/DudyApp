// Recupera o UUID do responsável do login
const idResponsavel = localStorage.getItem("id");

// Referência à div que vai conter os perfis
const listaCriancasDiv = document.getElementById("listaCriancas");
const popupOverlay = document.getElementById("popupOverlay");

// --------------------------
// Carregar perfis cadastrados
// --------------------------
async function carregarCriancas() {
  if (!idResponsavel) {
    alert("Não foi possível identificar o responsável. Faça login novamente.");
    return;
  }

  try {
    // Busca todas as crianças do responsável
    const { data: crianças, error } = await supabaseClient
      .from("estudante")
      .select("idestudante, nome, icone")
      .eq("id", idResponsavel);

    if (error) throw error;

    listaCrianças.innerHTML = crianças.length === 0
      ? "<p>Nenhuma criança cadastrada.</p>"
      : "";

    crianças.forEach(crianca => {
      const perfilDiv = document.createElement("div");
      perfilDiv.classList.add("perfil_kid");
      perfilDiv.dataset.id = crianca.idestudante;

      const img = document.createElement("img");
      img.src = crianca.icone || "../assets/default-kid.png";
      img.alt = `Ícone de ${crianca.nome}`;

      const nomeH1 = document.createElement("h1");
      nomeH1.textContent = crianca.nome.split(" ")[0];

      const iconeDiv = document.createElement("div");
      iconeDiv.classList.add("icone");
      iconeDiv.appendChild(img);

      const nomeDiv = document.createElement("div");
      nomeDiv.classList.add("nome_kid");
      nomeDiv.appendChild(nomeH1);

      perfilDiv.appendChild(iconeDiv);
      perfilDiv.appendChild(nomeDiv);

      // Quando clica no perfil
      perfilDiv.addEventListener("click", () => {
        // Remove destaque de todos os ícones
        document.querySelectorAll('.perfil_kid img').forEach(img => {
          img.classList.remove('selecionado');
        });

        // Adiciona destaque apenas ao ícone da criança clicada
        img.classList.add('selecionado');

        // Salva o ID da criança no localStorage
        localStorage.setItem("criancaSelecionadaId", String(crianca.idestudante));
        console.log("Criança selecionada:", crianca.idestudante);
      });

      listaCrianças.appendChild(perfilDiv);
    });

  } catch (err) {
    console.error("Erro ao buscar crianças:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  carregarCriancas();

  const btnConfirmar = document.getElementById("btnConfirmar");
  const btnCancelar = document.getElementById("btnCancelar");
  const btnExcluir = document.getElementById("btnExcluirKid");
  const popupOverlay = document.getElementById("popupOverlay");

  btnExcluir.addEventListener("click", () => {
    popupOverlay.classList.add("active")
  });


  btnConfirmar.addEventListener("click", () =>{

    // --------------------------
    // Função para apagar criança
    // --------------------------

    async function apagarKid() {
      const idSelecionada = localStorage.getItem("criancaSelecionadaId");
      if (!idSelecionada) {
        console.error("Nenhuma criança selecionada (localStorage vazio)");
        alert("Nenhuma criança selecionada para deletar.");
        return;
      } else{
        console.log("Tentando apagar estudante com idestudante =", idSelecionada);
      }
    try {
      const { error } = await supabaseClient
        .from("estudante")
        .delete()
        .eq("idestudante", idSelecionada); 
      if (error) throw error;
        localStorage.removeItem("criancaSelecionadaId");
        window.location = '../telas/telaCadKid_1.html';
      }catch (err) {
        console.error("Erro ao apagar criança:", err);
    };
  };

  apagarKid().catch((err) => {
    console.error("Erro ao apagar criança:", err);
  });

  });

  btnCancelar.addEventListener("click", () => {
    popupOverlay.classList.remove("active")
    window.location = '../telas/telaCadKid_1.html';
  });
});
