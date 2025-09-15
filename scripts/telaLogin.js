// Arquivo: scripts/telaLogin.js (VERSÃO CORRIGIDA)

// URL e chave do Supabase (presumindo que está correto)
const SUPABASE_URL = "https://jqteyocpfokvjmsrdiea.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxdGV5b2NwZm9rdmptc3JkaWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MTQwNDIsImV4cCI6MjA3MTE5MDA0Mn0.SNBHJgmoXVIAx6d5uDIBU2OYfzIzyZMbqcigAuoSBtA";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("emailLogin");
    const senhaInput = document.getElementById("senhaLogin");
    const subtitle = document.getElementById("subtitle");
    const mostrarSenhaImg = document.getElementById("mostrarSenha");
    const popupOverlay = document.getElementById("popupOverlay");
    const textmessage = document.getElementById("textmessage");

    // Redireciona para a tela de cadastro
    if(subtitle) {
        subtitle.addEventListener("click", () => {
            window.location.href = "telaCadastro.html";
        });
    }

    // Mostrar/esconder senha
    if(mostrarSenhaImg) {
        mostrarSenhaImg.addEventListener("click", () => {
            if (senhaInput.type === "password") {
                mostrarSenhaImg.src = "../assets/senhaAberto.svg";
                senhaInput.type = "text";
            } else {
                mostrarSenhaImg.src = "../assets/senhaFechado.svg";
                senhaInput.type = "password";
            }
        });
    }

    // Fechar popup
    if(popupOverlay) {
        popupOverlay.addEventListener("click", (e) => {
            if (e.target === popupOverlay) {
                popupOverlay.classList.remove("active");
            }
        });
    }

    // Lógica do Login
    if(loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = emailInput.value.trim();
            const password = senhaInput.value.trim();

            if (!email || !password) {
                textmessage.textContent = "Preencha todos os campos!";
                textmessage.style.color = "red";
                popupOverlay.classList.add("active");
                return;
            }

            try {
                // 1) Autentica o usuário
                const { data: authData, error: authError } =
                    await supabaseClient.auth.signInWithPassword({
                        email,
                        password,
                    });

                if (authError) throw authError; // Joga o erro para o catch

                const user = authData.user;
                console.log("Usuário logado:", user);
                
                // Exibe mensagem de sucesso
                textmessage.style.color = "green";
                textmessage.textContent = "Login realizado com sucesso!";
                popupOverlay.classList.add("active");

                // 2) Busca o ID do perfil do responsável
                // Usando a tabela 'responsavel' (minúsculas)
                const { data: perfil, error: perfilError } = await supabaseClient
                    .from("responsavel")
                    .select("id")
                    .eq("id", user.id) // Busca pelo user.id que é a chave primária
                    .single(); // .single() é mais eficiente para buscar um único registro

                if (perfilError) throw perfilError;
                if (!perfil) {
                    throw new Error("Perfil do responsável não encontrado.");
                }

                const idResponsavel = perfil.id;
                localStorage.setItem("idResponsavel", idResponsavel); // Salva no localStorage

                // 3) Conta quantos estudantes estão associados a esse responsável
                const { count, error: countError } = await supabaseClient
                    .from("estudante")
                    .select('*', { count: 'exact', head: true })
                    .eq("idresponsavel", idResponsavel); // <-- CORRIGIDO AQUI

                if (countError) throw countError;

                console.log("Número de crianças encontradas:", count);

                // 4) Redireciona com base no número de estudantes
                setTimeout(() => {
                    if (count === 0) {
                        window.location.href = "telaCadKid.html";
                    } else {
                        // Se tiver 1 ou mais, vai para a tela principal
                        window.location.href = "telaHome.html";
                    }
                }, 1500); // 1.5 segundos de delay para o usuário ver a mensagem

            } catch (err) {
                console.error("Erro no processo de login:", err);
                textmessage.style.color = "red";
                textmessage.textContent = err.message || "Email ou senha inválidos.";
                popupOverlay.classList.add("active");
            }
        });
    }
});