import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>Sistema de Professores</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/create">Cadastrar</Link>
        <Link to="/list">Listar</Link>
      </div>
    </nav>
  );
}
