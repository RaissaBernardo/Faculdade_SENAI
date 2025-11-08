import React from 'react';

export default function App() {
  // Função assíncrona para adicionar o usuário
  const addUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { //cabecalho
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: "Antônio Silva",
          email: "antonioS@email.com"
        })
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar usuário");
      }

      const data = await response.json();
      console.log("Usuário adicionado:", data);

    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div>
      <h1>Adicionar Usuário</h1>
      <button onClick={addUser}>Adicionar</button>
    </div>
  );
}
