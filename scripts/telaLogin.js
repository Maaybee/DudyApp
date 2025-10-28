// Acesso a 'subtitle' fora do DOMContentLoaded é aceitável,
// JÁ QUE SEU SCRIPT ESTÁ NO FINAL DO <body>.
const subtitle = document.getElementById("subtitle");

if (subtitle) {
  subtitle.addEventListener("click", () => {
    window.location.href = "../telas/telaCadastro.html";
  });
}


document.addEventListener("DOMContentLoaded", () => {
  // TODAS as referências a elementos do DOM são feitas AQUI,
  // garantindo que os elementos já foram carregados e analisados pelo navegador.

  // const mostrarSenhaImg = document.getElementById("mostrarSenha"); // <-- LINHA REMOVIDA
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("emailLogin");
  const senhaInput = document.getElementById("senhaLogin");
  const popupOverlay = document.getElementById("popupOverlay");
  const textmessage = document.getElementById("textmessage");


  // ================================================================
  // O BLOCO DE CÓDIGO INTEIRO "=== Mostrar/esconder senha ==="
  // QUE ESTAVA AQUI FOI COMPLETAMENTE REMOVIDO.
  // ================================================================


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
            textmessage.textContent = "Perfil de responsável não encontrado!"; 
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
          else if (count >= 1) 
            window.location.href = "../telas/telaCadKid_1.html";
        };

        setTimeout(redirecionar, 1000); // 1 segundo de delay
      } catch (err) {
        console.error("Erro inesperado:", err);
        let errorMessage = "Erro inesperado. Tente novamente.";

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


  const toggleIcon = document.getElementById('toggleSenhaIcone');
    

  const iconeOlhoFechado = '../assets/senhaFechado.svg';
  const iconeOlhoAberto = '../assets/senhaAberto.svg';

  if (senhaInput && toggleIcon) {
      toggleIcon.addEventListener('click', () => {

          if (senhaInput.type === 'password') {
              // Se for senha, muda para texto (revela)
              senhaInput.type = 'text';
              toggleIcon.src = iconeOlhoAberto;
          } else {
              // Se for texto, muda para senha (oculta)
              senhaInput.type = 'password';
              toggleIcon.src = iconeOlhoFechado;
          }
      });
  }
});
