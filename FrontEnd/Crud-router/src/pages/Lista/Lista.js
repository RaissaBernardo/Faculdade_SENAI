import React, { useState } from "react";
import "./Lista.css";

function Lista() {
  const [contatos, setContatos] = useState([]);
  const [novoContato, setNovoContato] = useState("");

  const adicionarContato = () => {
    if (novoContato.trim() === "") {
      alert("Digite um nome antes de adicionar!");
      return;
    }
    setContatos([...contatos, novoContato]);
    setNovoContato("");
  };

  const removerContato = (index) => {
    const novaLista = contatos.filter((_, i) => i !== index);
    setContatos(novaLista);
  };

  return (
    <div className="lista-container">
      <h1>💖 Lista de Contatos 💙</h1>
      <div className="lista-input">
        <input
          type="text"
          placeholder="Digite o nome do contato"
          value={novoContato}
          onChange={(e) => setNovoContato(e.target.value)}
        />
        <button onClick={adicionarContato}>Adicionar</button>
      </div>

      {contatos.length === 0 ? (
        <p className="vazio">Nenhum contato adicionado ainda.</p>
      ) : (
        <ul className="lista">
          {contatos.map((contato, index) => (
            <li key={index} className="item-lista">
              <span>{contato}</span>
              <button
                className="remover"
                onClick={() => removerContato(index)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Lista;
