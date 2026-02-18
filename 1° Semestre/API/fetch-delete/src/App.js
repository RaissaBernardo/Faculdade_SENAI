import React from 'react';

export default function App() {
  // Função assíncrona para deletar um usuário
  const deleteUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/f27e", {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Erro ao deletar usuário");
      }
      
      console.log("Usuário deletado com sucesso!");
    } catch (error) {
      console.error("Erro:", error);
    }
  };
  return (
    <div>
      <h1>Deletar Usuário</h1>
      <button onClick={deleteUser}>Deletar</button>
    </div>
  );
}
