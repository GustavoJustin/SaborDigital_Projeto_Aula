const BASE_URL = "http://localhost:3000"

// 1. Buscar Produtos

async function buscarProdutos() {
    const response = await fetch(`${BASE_URL}/produtos`)
    const dados = await response.json()

    if(!response.ok) throw new Error(dados.erro || `Erro ${response.status}`)
        return dados.dados
}

// 2. Criar Pedido

async function criarPedido(cliente, itens) {
    const response = await fetch(`${BASE_URL}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify,
    })

    const dados = await response.json()

    if(!response.ok) throw new Error(dados.erro || `Erro ${response.status}`)
    
    return dados
}

// 3. Buscar Pedidos - (Foco para a cozinha ter acesso aos pedidos)

async function buscarPedidos() {
    const response = await fetch(`${BASE_URL}/pedidos`)
    const dados

    if(!response.ok) throw new Error(dados.erro || `Erro ${response.status}`)

    return dados
}

// 4. Deletar pedidos

async function deletarPedidos(id) {
    // Chama o Método DELETAR (apagar do banco de pedidos)
    const response = await fetch(`${BASE_URL}/pedidos/${id}`, {
        method: "DELETE"
    })

    const dados = await response.json()

    if(!response.ok) throw new Error(dados.erro || `Erro ${response.status}`)
    
    return dados
}

// 5. Atualizar Status do Pedido

async function atualizarPedido(id, status) {
    const response = await fetch(`${BASE_URL}/pedidos/${id}/status`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({status: novoStatus})
    })
}