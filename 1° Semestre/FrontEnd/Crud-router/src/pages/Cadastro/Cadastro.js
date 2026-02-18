import React, { useState } from "react";
import "./Cadastro.css";

function Cadastro() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Cadastro realizado com sucesso!\nNome: ${form.nome}\nEmail: ${form.email}`);
    setForm({ nome: "", email: "", senha: "" });
  };

  return (
    <div className="cadastro-container">
      <h1>💖 Cadastro 💙</h1>
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
          name="senha"
          value={form.senha}
          onChange={handleChange}
          required
        />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;
