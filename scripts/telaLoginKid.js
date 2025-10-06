
const listaCriancasDiv = document.getElementById("listaCrianças");

async function carregarCriancas() {
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
        alert("Não foi possível identificar o responsável. Faça login novamente.");
        return;
    }

    // o user.id é o mesmo que responsavel.id
    const idResponsavel = user.id;

    try {
        const { data: criancas, error } = await supabaseClient
            .from("estudante")
            .select("idestudante, nome, icone")
            .eq("idresponsavel", idResponsavel);

        if (error) throw error;

        listaCriancasDiv.innerHTML =
            criancas.length === 0 ? "<p>Nenhuma criança cadastrada.</p>" : "";

        criancas.forEach((crianca) => {
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

            perfilDiv.addEventListener("click", () => {
                localStorage.setItem("criancaSelecionada", crianca.idestudante);
                window.location.href = "../telas/telaPerfil.html";
            });

            listaCriancasDiv.appendChild(perfilDiv);
        });
    } catch (err) {
        console.error("Erro ao buscar crianças:", err);
    }
}

document.addEventListener("DOMContentLoaded", carregarCriancas);

function cadastrar_redirecionamento() {
    window.location.href = "../telas/telaCadKid.html";
}

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

async function logout() {
    try {
        const { error } = await supabaseClient.auth.signOut();
        if (error) throw error;
        localStorage.clear();
        window.location.href = "../index.html";
    } catch (err) {
        console.error("Erro ao sair:", err);
        alert("Ocorreu um erro. Tente novamente.");
    }
}

function direcRemoverKid() {
    window.location.href = "../telas/removerKid.html";
}
