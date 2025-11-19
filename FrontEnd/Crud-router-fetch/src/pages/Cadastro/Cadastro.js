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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoUsuario = {
      nome: form.nome,
      email: form.email,
      senha: form.senha
    };

    await fetch("http://localhost:3001/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoUsuario)
    });

    alert("Usuário cadastrado!");

    setForm({ nome: "", email: "", senha: "" });
  };

  return (
    <div className="cadastro-container">
      <h1>Cadastro 💙</h1>

      <form className="cadastro-form" onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Senha:</label>
        <input
          name="senha"
          type="password"
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
