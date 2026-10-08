const formCadastro = document.getElementById('form-cadastro');
const msgFeedback = document.getElementById('mensagem-feedback');

formCadastro.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que a página recarregue

    // 1. Coletar os dados do formulário usando FormData (necessário para Multer)
    const formData = new FormData(formCadastro);

    // 2. Pequena validação visual antes de enviar
    const btnEnviar = document.getElementById('btn-cadastrar');
    btnEnviar.disabled = true;
    btnEnviar.innerText = "Enviando...";

    try {
        // 3. Chamar a função de cadastro (implementada abaixo ou no api.js)
        await cadastrarProduto(formData);

        // 4. Feedback de sucesso
        exibirFeedback("Prato cadastrado com sucesso! Redirecionando...", "sucesso");

        // Limpa o formulário
        formCadastro.reset();

        // 5. Redirecionar para o cardápio após 2 segundos
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);

    } catch (error) {
        console.error("Erro ao cadastrar:", error);
        exibirFeedback("Erro ao cadastrar prato: " + error.message, "erro");
        btnEnviar.disabled = false;
        btnEnviar.innerText = "Cadastrar Prato";
    }
});

/**
 * Função para enviar os dados ao Back-end via POST /produtos
 * Como usamos Multer, NÃO definimos o Content-Type manualmente.
 * O navegador fará isso automaticamente como 'multipart/form-data'.
 */
async function cadastrarProduto(formData) {
    // BASE_URL vem do api.js (já carregado no HTML)
    const response = await fetch(`${BASE_URL}/produtos`, {
        method: "POST",
        body: formData // Enviamos o FormData diretamente
    });

    const dados = await response.json();

    if (!response.ok) {
        throw new Error(dados.erro || "Falha na comunicação com o servidor.");
    }

    return dados;
}

/**
 * Exibe mensagens de sucesso ou erro na tela
 */
function exibirFeedback(mensagem, tipo) {
    msgFeedback.innerText = mensagem;
    msgFeedback.className = tipo === "sucesso" ? "feedback-sucesso" : "feedback-erro";
}