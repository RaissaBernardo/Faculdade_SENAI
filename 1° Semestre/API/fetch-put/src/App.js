import React from 'react';

export default function App() {
  // Função assíncrona para atualizar um usuário
  const updateUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/f27e", { 
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: "Antônio Silva Atualizado",
          email: "antonioS_novo@email.com"
        })
      });
      const data = await response.json();
      console.log("Usuário atualizado:", data);

    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div>
      <h1>Atualizar Usuário</h1>
      <button onClick={updateUser}>Atualizar</button>
    </div>
  );
}
