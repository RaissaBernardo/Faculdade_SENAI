import { useState } from "react";

export default function CategoriaForm({ onSubmit, categoriaEditando }) {
    // inicializa a partir da prop para evitar setState dentro de useEffect
    const [nome, setNome] = useState(() => categoriaEditando ? (categoriaEditando.nome || "") : "");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nome.trim()) return;
        onSubmit({ nome: nome.trim() });
        setNome("");
    };

    return (
        <form onSubmit={handleSubmit} className="form-group">
            <label className="label">Nome</label>
            <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome da categoria" />
            <div style={{ display: 'flex', gap: 8 }}>
                <button type="submit">{categoriaEditando ? 'Atualizar' : 'Criar'}</button>
                <button type="button" className="secondary" onClick={() => setNome("")}>Limpar</button>
            </div>
        </form>
    );
}
