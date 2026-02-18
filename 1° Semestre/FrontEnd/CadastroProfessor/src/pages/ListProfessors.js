import { Link } from "react-router-dom";

export default function ListProfessors({ professores, setProfessores }) {
  const deleteProfessor = (id) => {
    const newList = professores.filter((p) => p.id !== id);
    setProfessores(newList);
  };

  return (
    <div className="container">
      <h2>Lista de Professores</h2>

      {professores.length === 0 && <p>Nenhum professor cadastrado.</p>}

      {professores.map((p) => (
        <div key={p.id} className="card">
          <h3>{p.nome}</h3>
          <p>CPF: {p.cpf}</p>
          <div className="actions">
            <Link to={`/view/${p.id}`} className="btn-view">Ver</Link>
            <Link to={`/edit/${p.id}`} className="btn-edit">Editar</Link>
            <button className="btn-delete" onClick={() => deleteProfessor(p.id)}>Excluir</button>
          </div>
        </div>
      ))}
    </div>
  );
}
