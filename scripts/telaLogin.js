// URL e chave do Supabase
const SUPABASE_URL = "https://jqteyocpfokvjmsrdiea.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxdGV5b2NwZm9rdmptc3JkaWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MTQwNDIsImV4cCI6MjA3MTE5MDA0Mn0.SNBHJgmoXVIAx6d5uDIBU2OYfzIzyZMbqcigAuoSBtA";

// Criação do cliente Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const subtitle = document.getElementById('subtitle'); 
const mostrarSenhaImg = document.getElementById('mostrarSenha');

// Redireciona para o cadastro
subtitle.addEventListener('click', function() { 
  window.location.href = '../telas/telaCadastro.html';
});

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("emailLogin");
  const senhaInput = document.getElementById("senhaLogin");
  const message = document.getElementById("message");

  // Mostrar/esconder senha
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
      // 1) Autentica no Auth
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        message.textContent = "Erro: " + error.message;
        console.error(error);
        return;
      }

      const user = data.user;
      message.style.color = "green";
      message.textContent = "Login realizado com sucesso!";
      console.log("Usuário logado:", user);

      // 2) Busca na tabela responsavel pelo auth_id
      let { data: perfil, error: perfilError } = await supabaseClient
        .from("responsavel")
        .select("idresponsavel, nome, email, auth_id")
        .eq("auth_id", user.id)
        .single();

      // 3) Se não existir, cria agora (primeiro login)
      if (perfilError && perfilError.code === "PGRST116") {
        // PGRST116 = not found em .single()
        const nomeDoMeta = (user.user_metadata && user.user_metadata.nome) || "";
        const { data: criado, error: insertError } = await supabaseClient
          .from("responsavel")
          .insert([{
            auth_id: user.id,
            nome: nomeDoMeta,
            email: user.email
          }])
          .select("idresponsavel, nome, email, auth_id")
          .single();

        if (insertError) {
          console.error("Erro ao criar responsavel:", insertError);
        } else {
          perfil = criado;
        }
      } else if (perfilError) {
        console.error("Erro ao buscar responsavel:", perfilError);
      }

      // 4) Guarda localmente (se quiser)
      if (perfil) {
        localStorage.setItem("perfil", JSON.stringify(perfil));
      }

      // 5) Redireciona
      setTimeout(() => {
        window.location.href = "../telas/telaHome.html";
      }, 1500);

    } catch (err) {
      console.error("Erro inesperado:", err);
      message.textContent = "Ocorreu um erro, tente novamente.";
    }
  });
});
