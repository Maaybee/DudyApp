// URL e chave do Supabase
// Use estas variáveis para inicializar o cliente.
const SUPABASE_URL = "https://jqteyocpfokvjmsrdiea.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxdGV5b2NwZm9rdmptc3JkaWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MTQwNDIsImV4cCI6MjA3MTE5MDA0Mn0.SNBHJgmoXVIAx6d5uDIBU2OYfzIzyZMbqcigAuoSBtA";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", () => {
    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("emailLogin");
    const senhaInput = document.getElementById("senhaCadastro");
    const confirmarInput = document.getElementById("senha2");
    const mostrarSenhaImg = document.getElementById("mostrarSenha");
    const btnCadastro = document.getElementById("btnLogin");
    const subtitle = document.getElementById("subtitle");

    

    // Criar mensagem dinâmica
    const popupOverlay = document.getElementById("popupOverlay");
    const textmessage = document.getElementById("textmessage");

      // Fechar popup clicando fora
    popupOverlay.addEventListener("click", (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.classList.remove("active");
        }
    });


    // Mostrar/esconder senha 👁️
    mostrarSenhaImg.addEventListener("click", () => {
        if (senhaInput.type === "password") {
            senhaInput.type = "text";
            confirmarInput.type = "text";
            mostrarSenhaImg.src = "../assets/senhaAberto.svg";
        } else {
            senhaInput.type = "password";
            confirmarInput.type = "password";
            mostrarSenhaImg.src = "../assets/senhaFechado.svg";
        }
    });

    // Redireciona para login
    subtitle.addEventListener("click", () => {
        window.location.href = "../telas/telaLogin.html";
    });

    // Lógica de Cadastro usando a autenticação do Supabase
    btnCadastro.addEventListener("click", async (e) => {
        e.preventDefault();

        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const senha = senhaInput.value.trim();
        const confirmarSenha = confirmarInput.value.trim();

        if (!nome || !email || !senha || !confirmarSenha) {
            textmessage.style.color = "gray";
            textmessage.style.fontSize = "20px"
            popupOverlay.classList.add("active");
            textmessage.textContent = "Preencha todos os campos!";
            return;
        }

        if (senha !== confirmarSenha) {
            textmessage.style.color = "red";
            popupOverlay.classList.add("active");
            textmessage.style.fontSize = "20px"
            textmessage.textContent = "As senhas não coincidem!";
            return;
        }

        try {
            // Usa o método signUp() para registrar o usuário
            const { data, error } = await supabaseClient.auth.signUp({
                email: email,
                password: senha,
                options: {
                    data: { nome: nome }, // Passa o nome para o trigger
                },
            });

            if (error) {

                textmessage.style.color = "red";
                popupOverlay.classList.add("active");
                textmessage.style.fontSize = "20px"
                textmessage.textContent = "Erro: " + error.message;
                console.error(error);
            } else {
                textmessage.style.color = "green";
                popupOverlay.classList.add("active");
                textmessage.textContent = "Cadastro realizado! Verifique seu email.";
                textmessage.style.fontSize = "20px"
                console.log("Usuário cadastrado:", data);

                // redireciona para tela de login
                setTimeout(() => {
                    window.location.href = "../telas/telaLogin.html";
                }, 2500);
            }
        } catch (err) {
            console.error("Erro inesperado:", err);
            textmessage.style.color = "red";
            popupOverlay.classList.add("active");
            textmessage.style.fontSize = "20px"
            textmessage.textContent = "Ocorreu um erro, tente novamente.";
        }
    });
});
