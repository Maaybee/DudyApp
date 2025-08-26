// telaLogin.js

// URL e chave do Supabase
const SUPABASE_URL = "https://jqteyocpfokvjmsrdiea.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxdGV5b2NwZm9rdmptc3JkaWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MTQwNDIsImV4cCI6MjA3MTE5MDA0Mn0.SNBHJgmoXVIAx6d5uDIBU2OYfzIzyZMbqcigAuoSBtA";

// Criação do cliente Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const subtitle = document.getElementById('subtitle');
const mostrarSenhaImg = document.getElementById('mostrarSenha');

subtitle.addEventListener('click', () => {
  window.location.href = '../telas/telaCadastro.html';
});

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("emailLogin");
  const senhaInput = document.getElementById("senhaLogin");
  const message = document.getElementById("message");

  // Mostrar/esconder senha
  mostrarSenhaImg.addEventListener('click', () => {
    const fundo = mostrarSenhaImg.src;
    if (fundo.includes('senhaFechado.svg')) {
      mostrarSenhaImg.src = '../app_login/assets/senhaAberto.svg';
      senhaInput.type = 'text';
    } else {
      mostrarSenhaImg.src = '../app_login/assets/senhaFechado.svg';
      senhaInput.type = 'password';
    }
  });

  // LOGIN
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = senhaInput.value.trim();

    if (!email || !password) {
      message.textContent = "Preencha todos os campos!";
      return;
    }

    try {
      // 1) Autentica
      const { data: authData, error: authError } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      const user = authData.user;
      message.style.color = "green";
      message.textContent = "Login realizado com sucesso!";
      console.log("Usuário logado:", user);

      // 2) Busca perfil
      const { data: perfil, error: perfilError } = await supabaseClient
        .from("responsavel")
        .select("id")
        .eq("email", user.email);

      if (perfilError) throw perfilError;
      if (!perfil || perfil.length === 0) {
        message.textContent = "Perfil não encontrado. Complete seu cadastro.";
        return;
      }

      const idResponsavel = perfil[0].id;
      localStorage.setItem("id", idResponsavel);

      // 3) Conta crianças
      const { count, error: countError } = await supabaseClient
        .from("estudante")
        .select("idestudante", { count: "exact" })
        .eq("id", idResponsavel);

      if (countError) throw countError;

      console.log("Número de crianças:", count);

      // Redirecionamento com delay
      const redirecionar = () => {
        if (count === 0) window.location.href = '../telas/telaCadKid.html';
        else if (count === 1) window.location.href = '../telas/telaCadKid_1.html';
        else if (count === 2) window.location.href = '../telas/telaCadKid_1.html';
        else window.location.href = '../telas/telaCadKid_1.html';
      };
      
      setTimeout(redirecionar, 1000); // 1 segundo de delay

    } catch (err) {
      console.error("Erro inesperado:", err);
      message.textContent = "Ocorreu um erro, tente novamente.";
    }
  });
});


