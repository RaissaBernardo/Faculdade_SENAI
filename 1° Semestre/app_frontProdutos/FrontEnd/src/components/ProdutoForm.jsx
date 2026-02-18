import { useState } from "react";

export default function ProdutoForm({ onSubmit, produtoEditando }) {
    const [nome, setNome] = useState(produtoEditando?.nome || "");
    const [preco, setPreco] = useState(produtoEditando?.preco || "");
    const [categoriaId, setCategoriaId] = useState(produtoEditando?.categoria?.id || "");

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            nome,
            preco: Number(preco),
            categoria: categoriaId ? { id: Number(categoriaId) } : null
        });

        setNome("");
        setPreco("");
        setCategoriaId("");
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>{produtoEditando ? "Editar Produto" : "Novo Produto"}</h2>

            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
            />

            <input
                type="number"
                placeholder="Preço"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
            />

            <input
                type="number"
                placeholder="ID da categoria"
                value={categoriaId}
                onChange={(e) => setCategoriaId(e.target.value)}
                required
            />

            <button type="submit">
                {produtoEditando ? "Salvar" : "Adicionar"}
            </button>
        </form>
    );
}
