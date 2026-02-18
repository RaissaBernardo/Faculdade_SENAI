import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [users, setUsers] = useState([]); // Estado para armazenar os usuários

  // Função assíncrona para buscar os dados
  const getUsers = async () => {
    try {
      // quando não especificado, abre o get por padrão
      const response = await fetch("http://localhost:3000/users");
      // converte a resposta em JSON
      const data = await response.json();

      setUsers(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };
 //
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
      <h2>LISTA DE USUÁRIOS</h2>
      {users.length === 0 ?
      (<p className="Loading">loading ....</p>):
      (users.map((u) => (
        <p key={u.id}>
          {u.name} - {u.email}
        </p>
      )))}
    </div>
  );
}