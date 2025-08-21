// URL e chave do Supabase
const SUPABASE_URL = "https://jqteyocpfokvjmsrdiea.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxdGV5b2NwZm9rdmptc3JkaWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MTQwNDIsImV4cCI6MjA3MTE5MDA0Mn0.SNBHJgmoXVIAx6d5uDIBU2OYfzIzyZMbqcigAuoSBtA";

const subtitle = document.getElementById('subtitle'); 
const mostrarSenhaImg = document.getElementById('mostrarSenha');

// Redirecionamento para a tela de cadastro (funcionalidade existente) 
subtitle.addEventListener('click', function() { 
    console.log('Botão "Não tem cadastro?" clicado, redirecionando para cadastro...'); 
    window.location.href = '../telas/telaCadastro.html';
});

// Criação do cliente Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("emailLogin");
  const senhaInput = document.getElementById("senhaLogin");
  const message = document.getElementById("message");

  // Funcionalidade de mostrar/esconder senha 
    mostrarSenhaImg.addEventListener('click', function() { 
        const fundo = this.src; 
        if (fundo.includes('senhaFechado.svg')) { 
            this.src = '../app_login/assets/senhaAberto.svg'; 
            senhaInput.type = 'text'; 
        } else { 
            this.src = '../app_login/assets/senhaFechado.svg'; 
            senhaInput.type = 'password'; 
        } 
    });

  // Função de login
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = senhaInput.value.trim();

    if (!email || !password) {
      message.textContent = "Preencha todos os campos!";
      return;
    }

    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        message.textContent = "Erro: " + error.message;
        console.error(error);
      } else {
        message.style.color = "green";
        message.textContent = "Login realizado com sucesso!";

        console.log("Usuário logado:", data);

        // Exemplo: redirecionar após login
        setTimeout(() => {
          window.location.href = "../telas/telaHome.html"; // coloque sua página aqui
        }, 1500);
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      message.textContent = "Ocorreu um erro, tente novamente.";
    }
  });
});
