import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function NavBar({ onLogout }) {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/cadastro">Cadastro</Link>
      <Link to="/lista">Lista</Link>
      <button onClick={onLogout}>Sair</button>
    </nav>
  );
}

export default NavBar;
