import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProdutoForm from "./components/ProdutoForm";
import ProdutoList from "./components/ProdutoList";
import CategoriaForm from "./components/CategoriaForm";
import CategoriaList from "./components/CategoriaList";

import {
    getProdutos,
    criarProduto,
    atualizarProduto,
    deletarProduto,
    getCategorias,
    criarCategoria,
    atualizarCategoria,
    deletarCategoria,
    getProdutoPorId
} from "./api/api";

import "./App.css";

export default function App() {
    const [produtos, setProdutos] = useState([]);
    const [produtoEditando, setProdutoEditando] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [categoriaEditando, setCategoriaEditando] = useState(null);
    const [buscaId, setBuscaId] = useState("");

    const carregar = async () => {
        const dados = await getProdutos();
        setProdutos(dados || []);
        const cats = await getCategorias();
        setCategorias(cats || []);
    };

    useEffect(() => {
        const init = async () => {
            await carregar();
        };
        init();
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

    // Categorias handlers
    const handleCriarCategoria = async (categoria) => {
        await criarCategoria(categoria);
        carregar();
    };

    const handleAtualizarCategoria = async (categoria) => {
        await atualizarCategoria(categoriaEditando.id, categoria);
        setCategoriaEditando(null);
        carregar();
    };

    const handleDeleteCategoria = async (id) => {
        await deletarCategoria(id);
        carregar();
    };

    const handleBuscarPorId = async () => {
        if (!buscaId) return carregar();
        try {
            const p = await getProdutoPorId(buscaId);
            setProdutos(p ? [p] : []);
        } catch {
            setProdutos([]);
        }
    };

    return (
        <div>
            <Navbar />

            <div className="container">
                <div className="card form-card">
                    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                        <input placeholder="Buscar produto por ID" value={buscaId} onChange={e => setBuscaId(e.target.value)} />
                        <button onClick={handleBuscarPorId}>Buscar</button>
                        <button onClick={carregar} className="secondary">Limpar</button>
                    </div>

                    <div className="form-area">
                        <div className="form-card">
                            <ProdutoForm
                                onSubmit={produtoEditando ? handleAtualizar : handleCriar}
                                produtoEditando={produtoEditando}
                                categorias={categorias}
                            />
                        </div>

                        {/* Categoria form/list */}
                        <div className="list-card">
                            <h3 style={{ color: '#06264d' }}>Categorias</h3>
                            <CategoriaForm
                                key={categoriaEditando ? categoriaEditando.id : 'nova-categoria'}
                                onSubmit={categoriaEditando ? handleAtualizarCategoria : handleCriarCategoria}
                                categoriaEditando={categoriaEditando}
                            />
                        </div>
                    </div>
                </div>

                <ProdutoList
                    produtos={produtos}
                    onEdit={setProdutoEditando}
                    onDelete={handleDelete}
                />

                <CategoriaList
                    categorias={categorias}
                    onEdit={setCategoriaEditando}
                    onDelete={handleDeleteCategoria}
                />

            </div>
        </div>
    );
}
