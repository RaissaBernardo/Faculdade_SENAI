import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProfessor({ professores, setProfessores }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const professor = professores.find((p) => p.id === id);

  const [form, setForm] = useState({ ...professor });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updated = professores.map((p) =>
      p.id === id ? { ...form } : p
    );

    setProfessores(updated);
    navigate("/list");
  };

  return (
    <div className="container">
      <h2>Editar Professor</h2>

      <form onSubmit={handleSubmit} className="form">
        <input name="nome" value={form.nome} onChange={handleChange} />
        <input name="cpf" value={form.cpf} onChange={handleChange} />
        <input name="matricula" value={form.matricula} onChange={handleChange} />

        <select name="formacao" value={form.formacao} onChange={handleChange}>
          <option value="Matemática">Matemática</option>
          <option value="Português">Português</option>
          <option value="Biologia">Biologia</option>
        </select>

        <input name="email" value={form.email} onChange={handleChange} />
        <input name="telefone" value={form.telefone} onChange={handleChange} />
        <input name="cidade" value={form.cidade} onChange={handleChange} />

        <button type="submit" className="btn-save">Salvar Alterações</button>
      </form>
    </div>
  );
}
