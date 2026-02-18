import { useParams } from "react-router-dom";

export default function ViewProfessor({ professores }) {
  const { id } = useParams();
  const professor = professores.find((p) => p.id === id);

  if (!professor) return <p>Professor não encontrado.</p>;

  return (
    <div className="container">
      <h2>Detalhes do Professor</h2>
      <p><b>Nome:</b> {professor.nome}</p>
      <p><b>CPF:</b> {professor.cpf}</p>
      <p><b>Matrícula:</b> {professor.matricula}</p>
      <p><b>Email:</b> {professor.email}</p>
      <p><b>Telefone:</b> {professor.telefone}</p>
      <p><b>Cidade:</b> {professor.cidade}</p>
      <p><b>UF:</b> {professor.uf}</p>
    </div>
  );
}
