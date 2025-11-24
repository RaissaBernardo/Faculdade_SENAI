export default function ProdutoList({ produtos, onEdit, onDelete }) {
    return (
        <div className="lista">
            <h2>Produtos cadastrados</h2>

            {produtos.length === 0 && <p>Nenhum produto cadastrado.</p>}

            {produtos.map((p) => (
                <div key={p.id} className="card">
                    <strong>{p.nome}</strong>
                    <span>Preço: R$ {p.preco}</span>
                    <span>Categoria: {p.categoriaId}</span>

                    <div className="botoes">
                        <button className="edit" onClick={() => onEdit(p)}>Editar</button>
                        <button className="delete" onClick={() => onDelete(p.id)}>Excluir</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
