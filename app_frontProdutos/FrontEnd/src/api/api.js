const API_URL = "http://localhost:4567";

export const getProdutos = async () => {
    const res = await fetch(`${API_URL}/produtos`);
    return res.json();
};

export const criarProduto = async (produto) => {
    const res = await fetch(`${API_URL}/produtos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto)
    });
    return res.json();
};

export const atualizarProduto = async (id, produto) => {
    const res = await fetch(`${API_URL}/produtos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto)
    });
    return res.json();
};

export const deletarProduto = async (id) => {
    return await fetch(`${API_URL}/produtos/${id}`, {
        method: "DELETE"
    });
};
