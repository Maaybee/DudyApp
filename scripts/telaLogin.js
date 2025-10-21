// Acesso a 'subtitle' fora do DOMContentLoaded é aceitável,
// JÁ QUE SEU SCRIPT ESTÁ NO FINAL DO <body>.
// Se o script estivesse no <head>, esta linha também precisaria ser movida para dentro do DOMContentLoaded.
const subtitle = document.getElementById("subtitle");

// NOTA: A variável mostrarSenhaImg NÃO é mais declarada aqui.
// Ela será declarada e inicializada dentro do DOMContentLoaded.


if (subtitle) {
  subtitle.addEventListener("click", () => {
    window.location.href = "../telas/telaCadastro.html";
  });
}


document.addEventListener("DOMContentLoaded", () => {
  // TODAS as referências a elementos do DOM são feitas AQUI,
  // garantindo que os elementos já foram carregados e analisados pelo navegador.
  const mostrarSenhaImg = document.getElementById("mostrarSenha");
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("emailLogin");
  const senhaInput = document.getElementById("senhaLogin");
  const popupOverlay = document.getElementById("popupOverlay");
  const textmessage = document.getElementById("textmessage");


  // === Mostrar/esconder senha ===
  // Verificação de segurança, embora os IDs existam no HTML.
  if (mostrarSenhaImg && senhaInput) { 
    mostrarSenhaImg.addEventListener("click", () => {

      // ================================================================
      // INÍCIO DA CORREÇÃO: Salva e restaura o valor da senha
      // ================================================================

      // 1. Salva o valor atual do input ANTES de qualquer mudança.
      const valorSenha = senhaInput.value;

      // 2. Muda o tipo do input (e a imagem)
      const fundo = mostrarSenhaImg.src;
      if (fundo.includes("senhaFechado.svg")) {
        mostrarSenhaImg.src = "../assets/senhaAberto.svg";
        senhaInput.type = "text";
      } else {
        mostrarSenhaImg.src = "../assets/senhaFechado.svg";
        senhaInput.type = "password";
      }

      // 3. Restaura o valor no input.
      //    Isso corrige o "bug" em navegadores mobile que apagam
      //    o campo ao mudar o tipo de volta para 'password'.
      senhaInput.value = valorSenha;

      // 4. Devolve o foco ao campo (melhoria de UX)
      senhaInput.focus(); 

      // ================================================================
      // FIM DA CORREÇÃO
      // ================================================================
    });
  }


  // === Fechar popup clicando fora ===
  if (popupOverlay) {
    popupOverlay.addEventListener("click", (e) => {
      if (e.target === popupOverlay) {
        popupOverlay.classList.remove("active");
      }
    });
  }


  // === LOGIN ===
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = emailInput.value.trim();
      const password = senhaInput.value.trim();

      if (!email || !password) {
        if (popupOverlay && textmessage) {
            popupOverlay.classList.add("active");
            textmessage.textContent = "Preencha todos os campos!";
        }
        return;
      }

      try {
        // 1) Autentica (SUPABASE)
        // **ATENÇÃO: A variável 'supabaseClient' não foi definida neste trecho, 
        // assumo que ela é carregada pelo script 'supabaseConfig.js'.**
        const { data: authData, error: authError } =
          await supabaseClient.auth.signInWithPassword({
            email,
            password,
          });

        if (authError) throw authError;

        const user = authData.user;
        if (textmessage) {
            textmessage.style.color = "green";
            textmessage.textContent = "Login realizado com sucesso!";
        }
        if (popupOverlay) {
            popupOverlay.classList.add("active");
        }
        console.log("Usuário logado:", user);

        // 2) Busca perfil
        const { data: perfil, error: perfilError } = await supabaseClient
          .from("responsavel")
          .select("id")
          .eq("email", user.email);

        if (perfilError) throw perfilError;
        if (!perfil || perfil.length === 0) {
          if (popupOverlay && textmessage) {
            popupOverlay.classList.add("active");
            textmessage.style.color = "red";
            textmessage.textContent = "Perfil de responsável não encontrado!"; // Adicionei mensagem de erro mais clara
          }
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
          else if (count >= 1) // Simplificado, já que 'else if (count === 1)' e 'else if (count === 2)' levam ao mesmo lugar
            window.location.href = "../telas/telaCadKid_1.html";
        };

        setTimeout(redirecionar, 1000); // 1 segundo de delay
      } catch (err) {
        console.error("Erro inesperado:", err);
        let errorMessage = "Erro inesperado. Tente novamente.";

        // Tentativa de extrair mensagem de erro mais útil, se disponível
        if (err && err.message && err.message.includes("Invalid login credentials")) {
            errorMessage = "Usuário ou senha incorretos.";
        } else if (err && err.message) {
            errorMessage = err.message;
        }

        if (textmessage) {
            textmessage.style.color = "red";
            textmessage.textContent = errorMessage;
        }
        if (popupOverlay) {
            popupOverlay.classList.add("active");
        }
      }
    });
  }
});
