
const icones = ['../assets/icones/perfil_alce.svg','../assets/icones/perfil_cachorro.svg','../assets/icones/perfil_elefante.svg','../assets/icones/perfil_gato.svg','../assets/icones/perfil_giraffa.svg',
    '../assets/icones/perfil_ovelha.svg', '../assets/icones/perfil_panda.svg', '../assets/icones/perfil_passaro.svg','../assets/icones/perfil_sapo.svg','../assets/icones/perfil_urso.svg'
]

// Corrigindo a variável. getElementsByClassName retorna uma HTMLCollection, não um elemento único.
const icones_escolhidos = document.getElementsByClassName('icone-escolha');

const icone_area = document.getElementById('icone_area');

// Agora, vamos criar a função que realmente faz o trabalho
function escolherIcone(event) {
    // A propriedade `event.target` pega o elemento HTML que foi clicado.
    const iconeClicado = event.target;
    // O src do ícone clicado será o src que queremos exibir
    const srcIcone = iconeClicado.src;

    // Criamos um novo elemento <img> para colocar na área de exibição
    const imgElemento = document.createElement('img');
    imgElemento.src = srcIcone;
    imgElemento.alt = "Ícone de perfil selecionado"; // Boa prática de acessibilidade

    // Limpamos o conteúdo atual da área para evitar que se acumulem ícones
    icone_area.innerHTML = '';
    
    // Adicionamos o novo elemento <img> à div 'icone_area'
    icone_area.appendChild(imgElemento);
}

// Adicionamos um event listener de 'click' a cada ícone
// Usamos um loop `for...of` para iterar sobre a coleção de elementos
for (const icone of icones_escolhidos) {
    icone.addEventListener('click', escolherIcone);
}

// Opcional: Para começar, mostre um ícone padrão.
// Aqui, estou pegando o primeiro da lista.
if (icone_area) {
    const imgElementoPadrao = document.createElement('img');
    imgElementoPadrao.src = icones[0];
    icone_area.appendChild(imgElementoPadrao);
}

// Função chamada pelo botão
async function enviar_dados() {
  const nome = document.getElementById("nome").value.trim();
  const dataNasc = document.getElementById("dataNasc").value.trim();

  // Pega o ícone atualmente exibido
  const iconeImg = icone_area.querySelector("img");
  const icone = iconeImg ? iconeImg.src : null;

  const idResponsavel = localStorage.getItem("id");

  if (!nome || !dataNasc || !icone) {
    alert("Preencha todos os campos e selecione um ícone!");
    return;
  }

  if (!idResponsavel) {
    alert("Não foi possível identificar o responsável. Faça login novamente.");
    return;
  }

  try {
    const { data, error } = await supabaseClient
      .from("estudante")
      .insert([{
        id: idResponsavel,
        nome: nome,
        datanasc: dataNasc,
        icone: icone,
      }]);

    if (error) {
      console.error("Erro ao cadastrar criança:", error);
      alert("Erro ao cadastrar: " + error.message);
      return;
    }

    console.log("Registro inserido:", data);
    window.location.href = "../telas/telaCadKid_1.html";

  } catch (err) {
    console.error("Erro inesperado:", err);
    alert("Erro inesperado.");
  }
}

