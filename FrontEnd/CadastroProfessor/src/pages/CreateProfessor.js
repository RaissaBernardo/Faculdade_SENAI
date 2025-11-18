import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateProfessor({ professores, setProfessores }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    matricula: "",
    formacao: "",
    email: "",
    telefone: "",
    logradouro: "",
    numero: "",
    complemento: "",
    cidade: "",
    cep: "",
    uf: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfessores([...professores, { id: Date.now(), ...form }]);
    navigate("/list");
  };

  return (
    <div className="container">
      <h2>Cadastrar Professor</h2>
      <form onSubmit={handleSubmit} className="form">

        <input name="nome" placeholder="Nome Completo" onChange={handleChange} required />

        <input name="cpf" placeholder="CPF" onChange={handleChange} required />

        <input name="matricula" placeholder="Matrícula" onChange={handleChange} required />

        <select name="formacao" onChange={handleChange} required>
          <option value="">Selecione a formação</option>
          <option value="Matemática">Matemática</option>
          <option value="Português">Português</option>
          <option value="Biologia">Biologia</option>
        </select>

        <input name="email" placeholder="Email Institucional" onChange={handleChange} required />

        <input name="telefone" placeholder="Telefone" onChange={handleChange} required />

        <input name="logradouro" placeholder="Logradouro" onChange={handleChange} required />

        <input name="numero" placeholder="Número" onChange={handleChange} required />

        <input name="complemento" placeholder="Complemento (Opcional)" onChange={handleChange} />

        <input name="cidade" placeholder="Cidade" onChange={handleChange} required />

        <input name="cep" placeholder="CEP" onChange={handleChange} required />

        <select name="uf" onChange={handleChange} required>
          <option value="">UF</option>
          <option value="SP">SP</option>
          <option value="RJ">RJ</option>
          <option value="MG">MG</option>
        </select>

        <button type="submit" className="btn-save">Salvar</button>
      </form>
    </div>
  );
}
