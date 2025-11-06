import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importação das páginas
import Login from "./pages/Login/Login";
import Cadastro from './pages/Cadastro/Cadastro';
import Lista from "./pages/Lista/Lista";
import Home from "./pages/Home/Home";

// Componente de navegação
import NavBar from "./components/Navbar/Navbar";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  // função de autenticação
  const handleLogin = (username, password) => {
    if (username === "admin" && password === "123") {
      setAuthenticated(true);
    } else {
      alert("Usuário ou senha inválidos!");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <Router>
      {isAuthenticated && <NavBar onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
        />

        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Login onLogin={handleLogin} />}
        />

        <Route
          path="/cadastro"
          element={isAuthenticated ? <Cadastro /> : <Login onLogin={handleLogin} />}
        />

        <Route
          path="/lista"
          element={isAuthenticated ? <Lista /> : <Login onLogin={handleLogin} />}
        />

        <Route
          path="*"
          element={<Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
