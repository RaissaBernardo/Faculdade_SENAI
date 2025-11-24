export default function CategoriaList({ categorias, onEdit, onDelete }) {
    return (
        <div className="card">
            <h3 style={{ color: '#06264d' }}>Lista de Categorias</h3>
            <div className="list">
                {(!categorias || categorias.length === 0) && <div>Nenhuma categoria cadastrada.</div>}
                {categorias && categorias.map(cat => (
                    <div key={cat.id} className="item-card">
                        <div className="item-info">
                            <strong>{cat.nome}</strong>
                            <small>ID: {cat.id}</small>
                        </div>
                        <div className="item-actions">
                            <button className="small" onClick={() => onEdit(cat)}>Editar</button>
                            <button className="small danger" onClick={() => onDelete(cat.id)}>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
