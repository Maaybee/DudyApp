

document.addEventListener("DOMContentLoaded", () => {
    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("emailLogin");
    const senhaInput = document.getElementById("senhaCadastro");
    const confirmarInput = document.getElementById("senha2");
    const mostrarSenhaImg = document.getElementById("mostrarSenha");
    const btnCadastro = document.getElementById("btnLogin");
    const subtitle = document.getElementById("subtitle");

    const popupOverlay = document.getElementById("popupOverlay");
    const textmessage = document.getElementById("textmessage");

    // Fecha popup ao clicar fora
    popupOverlay.addEventListener("click", (e) => {
        if (e.target === popupOverlay) popupOverlay.classList.remove("active");
    });

    // Mostrar/ocultar senha
    mostrarSenhaImg.addEventListener("click", () => {
        const show = senhaInput.type === "password";
        senhaInput.type = show ? "text" : "password";
        confirmarInput.type = show ? "text" : "password";
        mostrarSenhaImg.src = show ? "../assets/senhaAberto.svg" : "../assets/senhaFechado.svg";
    });

    subtitle.addEventListener("click", () => {
        window.location.href = "../telas/telaLogin.html";
    });

    btnCadastro.addEventListener("click", async (e) => {
        e.preventDefault();

        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const senha = senhaInput.value.trim();
        const confirmarSenha = confirmarInput.value.trim();

        if (!nome || !email || !senha || !confirmarSenha) {
            showPopup("Preencha todos os campos!", "gray");
            return;
        }
        if (senha !== confirmarSenha) {
            showPopup("As senhas não coincidem!", "red");
            return;
        }

        try {
            const { data: authData, error: authError } = await supabaseClient.auth.signUp({
                email,
                password: senha,
            });
            if (authError) throw authError;
            const userId = authData.user.id;

            const { data: respData, error: insertError } = await supabaseClient
                .from("responsavel")
                .insert([{ id: userId, nome, email }])
                .select("id")
                .single();
            if (insertError) throw insertError;

            localStorage.setItem("idResponsavel", respData.id);

            showPopup("Cadastro realizado! Verifique seu email.", "green");

            setTimeout(() => {
                window.location.href = "../telas/telaLogin.html";
            }, 2500);
        } catch (err) {
            console.error(err);
            showPopup("Erro: " + err.message, "red");
        }
    });

    function showPopup(msg, color) {
        textmessage.style.color = color;
        textmessage.style.fontSize = "20px";
        textmessage.textContent = msg;
        popupOverlay.classList.add("active");
    }
});
