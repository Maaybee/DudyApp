
const subtitle = document.getElementById("subtitle");
const mostrarSenhaImg = document.getElementById("mostrarSenha");

subtitle.addEventListener("click", () => {
  window.location.href = "../telas/telaCadastro.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("emailLogin");
  const senhaInput = document.getElementById("senhaLogin");
  const popupOverlay = document.getElementById("popupOverlay");
  const textmessage = document.getElementById("textmessage");

  // Mostrar/esconder senha
  mostrarSenhaImg.addEventListener("click", () => {
    const fundo = mostrarSenhaImg.src;
    if (fundo.includes("senhaFechado.svg")) {
      mostrarSenhaImg.src = "../assets/senhaAberto.svg";
      senhaInput.type = "text";
    } else {
      mostrarSenhaImg.src = "../assets/senhaFechado.svg";
      senhaInput.type = "password";
    }
  });

  // Fechar popup clicando fora
  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) {
      popupOverlay.classList.remove("active");
    }
  });


  // LOGIN
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = senhaInput.value.trim();

    if (!email || !password) {
      popupOverlay.classList.add("active");
      textmessage.textContent = "Preencha todos os campos!";
      return;
    }

    try {
      // 1) Autentica
      const { data: authData, error: authError } =
        await supabaseClient.auth.signInWithPassword({
          email,
          password,
        });

      if (authError) throw authError;

      const user = authData.user;
      textmessage.style.color = "green";
      textmessage.textContent = "Login realizado com sucesso!";
      popupOverlay.classList.add("active");
      console.log("Usuário logado:", user);

      // 2) Busca perfil
      const { data: perfil, error: perfilError } = await supabaseClient
        .from("responsavel")
        .select("id")
        .eq("email", user.email);

      if (perfilError) throw perfilError;
      if (!perfil || perfil.length === 0) {
        popupOverlay.classList.add("active");
        textmessage.style.color = "red";

        return;
      }

      const idResponsavel = perfil[0].id;
      localStorage.setItem("id", idResponsavel);

      // 3) Conta crianças
      const { count, error: countError } = await supabaseClient
        .from("estudante")
        .select("idestudante", { count: "exact" })
        .eq("idresponsavel", idResponsavel);

      if (countError) throw countError;

      console.log("Número de crianças:", count);

      // Redirecionamento com delay
      const redirecionar = () => {
        if (count === 0) window.location.href = "../telas/telaCadKid.html";
        else if (count === 1)
          window.location.href = "../telas/telaCadKid_1.html";
        else if (count === 2)
          window.location.href = "../telas/telaCadKid_1.html";
        else window.location.href = "../telas/telaCadKid_1.html";
      };

      setTimeout(redirecionar, 1000); // 1 segundo de delay
    } catch (err) {
      console.error("Erro inesperado:", err);
      textmessage.style.color = "red";
      popupOverlay.classList.add("active");
      
    }
  });
});

