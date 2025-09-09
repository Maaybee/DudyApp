// Recupera o UUID do responsável do login
const idResponsavel = localStorage.getItem("id");

// Referência à div que vai conter os perfis
const listaCriançasDiv = document.getElementById("listaCrianças");

async function carregarCrianças() {
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

    listaCriançasDiv.innerHTML = crianças.length === 0
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

      // Salva id correto da criança no clique
      perfilDiv.addEventListener("click", () => {
        console.log("Criança selecionada:", crianca.idestudante);
        localStorage.setItem("criancaSelecionada", crianca.idestudante);
        
        
      });

      listaCriançasDiv.appendChild(perfilDiv);
    });

  } catch (err) {
    console.error("Erro ao buscar crianças:", err);
  }
}

document.addEventListener("DOMContentLoaded", carregarCrianças);

// Funções auxiliares
function cadastrar_redirecionamento() { 
  window.location.href = "../telas/telaCadKid.html";
}


