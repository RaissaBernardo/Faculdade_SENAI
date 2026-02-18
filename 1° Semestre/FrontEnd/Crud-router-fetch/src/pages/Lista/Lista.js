import React, { useState, useEffect } from "react";
import "./Lista.css";

function Lista() {
  const [contatos, setContatos] = useState([]);
  const [novoContato, setNovoContato] = useState("");
  const [editando, setEditando] = useState(null);
  const [nomeEditado, setNomeEditado] = useState("");

  const carregarContatos = async () => {
    const resp = await fetch("http://localhost:3001/contatos");
    const data = await resp.json();
    setContatos(data);
  };

  useEffect(() => {
    carregarContatos();
  }, []);

  const adicionarContato = async () => {
    if (novoContato.trim() === "") return alert("Digite um nome!");

    const novo = { nome: novoContato };

    await fetch("http://localhost:3001/contatos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novo)
    });

    setNovoContato("");
    carregarContatos();
  };

  const removerContato = async (id) => {
    await fetch(`http://localhost:3001/contatos/${id}`, {
      method: "DELETE"
    });

    carregarContatos();
  };

  const salvarEdicao = async () => {
    await fetch(`http://localhost:3001/contatos/${editando}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: nomeEditado })
    });

    setEditando(null);
    setNomeEditado("");
    carregarContatos();
  };

  return (
    <div className="lista-container">
      <h1>💖 Lista de Contatos 💙</h1>

      <div className="lista-input">
        <input
          type="text"
          placeholder="Digite um contato"
          value={novoContato}
          onChange={(e) => setNovoContato(e.target.value)}
        />
        <button onClick={adicionarContato}>Adicionar</button>
      </div>

      {contatos.length === 0 ? (
        <p className="vazio">Nenhum contato cadastrado.</p>
      ) : (
        <ul className="lista">
          {contatos.map((c) => (
            <li key={c.id} className="item-lista">

              {editando === c.id ? (
                <>
                  <input
                    value={nomeEditado}
                    onChange={(e) => setNomeEditado(e.target.value)}
                  />
                  <button onClick={salvarEdicao}>Salvar</button>
                </>
              ) : (
                <>
                  <span>{c.nome}</span>

                  <button
                    className="editar"
                    onClick={() => {
                      setEditando(c.id);
                      setNomeEditado(c.nome);
                    }}
                  >
                    Editar
                  </button>

                  <button
                    className="remover"
                    onClick={() => removerContato(c.id)}
                  >
                    Remover
                  </button>
                </>
              )}

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Lista;
