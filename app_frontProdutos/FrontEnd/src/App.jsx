import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProdutoForm from "./components/ProdutoForm";
import ProdutoList from "./components/ProdutoList";

import {
    getProdutos,
    criarProduto,
    atualizarProduto,
    deletarProduto
} from "./api/api";

import "./App.css";

export default function App() {
    const [produtos, setProdutos] = useState([]);
    const [produtoEditando, setProdutoEditando] = useState(null);

    const carregar = async () => {
        const dados = await getProdutos();
        setProdutos(dados);
    };

    useEffect(() => {
        carregar();
    }, []);

    const handleCriar = async (produto) => {
        await criarProduto(produto);
        carregar();
    };

    const handleAtualizar = async (produto) => {
        await atualizarProduto(produtoEditando.id, produto);
        setProdutoEditando(null);
        carregar();
    };

    const handleDelete = async (id) => {
        await deletarProduto(id);
        carregar();
    };

    return (
        <div>
            <Navbar />

            <div className="container">
                <ProdutoForm
                    onSubmit={produtoEditando ? handleAtualizar : handleCriar}
                    produtoEditando={produtoEditando}
                />

                <ProdutoList
                    produtos={produtos}
                    onEdit={setProdutoEditando}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
}
