const API_URL = "http://localhost:4567";

const parseJson = async (res) => {
    // tenta transformar em JSON, mas retorna null se não houver corpo (ex.: 204)
    if (!res) return null;
    const text = await res.text();
    if (!text) return null;
    try {
        return JSON.parse(text);
    } catch {
        return null;
    }
};

export const getProdutos = async () => {
    const res = await fetch(`${API_URL}/produtos`);
    return await parseJson(res);
};

export const getProdutoPorId = async (id) => {
    const res = await fetch(`${API_URL}/produtos/${id}`);
    if (!res.ok) throw new Error(`Erro ao buscar produto: ${res.status}`);
    return await parseJson(res);
};

export const criarProduto = async (produto) => {
    const res = await fetch(`${API_URL}/produtos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto)
    });
    if (!res.ok) throw new Error(`Erro ao criar produto: ${res.status}`);
    return await parseJson(res);
};

export const atualizarProduto = async (id, produto) => {
    const res = await fetch(`${API_URL}/produtos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto)
    });
    if (!res.ok) throw new Error(`Erro ao atualizar produto: ${res.status}`);
    return await parseJson(res);
};

export const deletarProduto = async (id) => {
    const res = await fetch(`${API_URL}/produtos/${id}`, {
        method: "DELETE"
    });
    return res.ok;
};

// --- Endpoints para Categorias (CRUD) ---
export const getCategorias = async () => {
    const res = await fetch(`${API_URL}/categorias`);
    return await parseJson(res);
};

export const getCategoriaPorId = async (id) => {
    const res = await fetch(`${API_URL}/categorias/${id}`);
    if (!res.ok) throw new Error(`Erro ao buscar categoria: ${res.status}`);
    return await parseJson(res);
};

export const criarCategoria = async (categoria) => {
    const res = await fetch(`${API_URL}/categorias`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoria)
    });
    if (!res.ok) throw new Error(`Erro ao criar categoria: ${res.status}`);
    return await parseJson(res);
};

export const atualizarCategoria = async (id, categoria) => {
    const res = await fetch(`${API_URL}/categorias/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoria)
    });
    if (!res.ok) throw new Error(`Erro ao atualizar categoria: ${res.status}`);
    return await parseJson(res);
};

export const deletarCategoria = async (id) => {
    const res = await fetch(`${API_URL}/categorias/${id}`, {
        method: "DELETE"
    });
    return res.ok;
};
