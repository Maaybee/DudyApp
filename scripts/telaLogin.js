
document.addEventListener("DOMContentLoaded", () => {
    // --- ELEMENTOS DA PÁGINA ---
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("emailLogin");
    const senhaInput = document.getElementById("senhaLogin");
    const subtitle = document.getElementById("subtitle"); // Link para cadastro
    const mostrarSenhaImg = document.getElementById("mostrarSenha"); // Ícone de olho
    const popupOverlay = document.getElementById("popupOverlay"); // Overlay do pop-up
    const textmessage = document.getElementById("textmessage"); // Mensagem dentro do pop-up

    // --- NAVEGAÇÃO PARA TELA DE CADASTRO ---
    if(subtitle) {
        subtitle.addEventListener("click", () => {
            window.location.href = "telaCadastro.html"; // Redireciona para a tela de cadastro
        });
    }

    // --- FUNCIONALIDADE MOSTRAR/ESCONDER SENHA ---
    if(mostrarSenhaImg && senhaInput) { // Verifica se os elementos existem
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

    // --- FECHAR POP-UP CLICANDO FORA ---
    if(popupOverlay) {
        popupOverlay.addEventListener("click", (e) => {
            if (e.target === popupOverlay) { // Só fecha se clicar no overlay, não no conteúdo do pop-up
                popupOverlay.classList.remove("active");
            }
        });
    }

    // --- LÓGICA PRINCIPAL DE LOGIN ---
    if(loginForm) { // Garante que o formulário de login existe
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault(); // Impede o recarregamento da página

            const email = emailInput.value.trim();
            const password = senhaInput.value.trim();

            // Validação básica dos campos
            if (!email || !password) {
                textmessage.textContent = "Preencha todos os campos!";
                textmessage.style.color = "red";
                popupOverlay.classList.add("active");
                return;
            }

            try {
                // 1) Autentica o usuário no Supabase
                const { data: authData, error: authError } =
                    await supabaseClient.auth.signInWithPassword({
                        email,
                        password,
                    });

                if (authError) {
                    // Se houver erro de autenticação (ex: senha errada), lança para o catch
                    throw new Error(authError.message || "Erro de autenticação.");
                }

                const user = authData.user;
                console.log("Usuário logado no Supabase:", user);
                
                // Exibe mensagem de sucesso de login
                textmessage.style.color = "green";
                textmessage.textContent = "Login realizado com sucesso!";
                popupOverlay.classList.add("active");

                // 2) Busca o ID do perfil do responsável na sua tabela 'responsavel'
                // Usa o ID do usuário autenticado para garantir que busca o perfil correto
                const { data: perfil, error: perfilError } = await supabaseClient
                    .from("responsavel")
                    .select("id")
                    .eq("id", user.id) // Busca pelo ID do usuário Supabase na tabela 'responsavel'
                    .single(); // Espera um único resultado

                if (perfilError) {
                    throw new Error(perfilError.message || "Erro ao buscar perfil do responsável.");
                }
                if (!perfil) {
                    // Isso não deveria acontecer se o trigger funcionou corretamente no cadastro
                    throw new Error("Perfil do responsável não encontrado na base de dados. Recadastre-se.");
                }

                const idResponsavel = perfil.id;
                // Salva o ID do responsável no localStorage para uso futuro em outras telas
                localStorage.setItem("idResponsavel", idResponsavel); 

                // 3) Conta quantos estudantes estão associados a este responsável
                const { count, error: countError } = await supabaseClient
                    .from("estudante")
                    .select('*', { count: 'exact', head: true }) // Conta apenas, sem retornar dados completos
                    .eq("idresponsavel", idResponsavel); // CORREÇÃO: Usa 'idresponsavel' (minúsculas)

                if (countError) {
                    throw new Error(countError.message || "Erro ao contar estudantes.");
                }

                console.log("Número de crianças encontradas para este responsável:", count);

                // 4) Redireciona com base no número de estudantes
                setTimeout(() => {
                  if (count === 0) window.location.href = "../telas/telaCadKid.html";
                  else if (count === 1)
                    window.location.href = "../telas/telaCadKid_1.html";
                  else if (count === 2)
                    window.location.href = "../telas/telaCadKid_1.html";
                  else window.location.href = "../telas/telaCadKid_1.html";
                },1500); // Dá um tempo para o usuário ver a mensagem de sucesso

            } catch (err) {
                console.error("Erro no processo de login:", err);
                textmessage.style.color = "red";
                // Mensagens de erro mais amigáveis para o usuário
                if (err.message.includes("AuthApiError: Invalid login credentials")) {
                    textmessage.textContent = "Email ou senha inválidos.";
                } else if (err.message.includes("Perfil do responsável não encontrado")) {
                    textmessage.textContent = "Seu perfil de responsável não foi encontrado. Por favor, tente se recadastrar.";
                } else {
                    textmessage.textContent = err.message || "Ocorreu um erro inesperado. Tente novamente.";
                }
                popupOverlay.classList.add("active");
            }
        });
    }
});
