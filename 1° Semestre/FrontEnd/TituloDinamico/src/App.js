import React, { useState, useEffect } from 'react';
import './App.css';

function TituloDinamico() {
  const [titulo, setTitulo] = useState('');

  useEffect(() => {
    document.title = titulo === '' ? 'Título Dinâmico' : titulo;
  }, [titulo]);

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h1>Título Dinâmico</h1>
      <input
        type="text"
        placeholder="Digite algo..."
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        style={{ padding: 8, width: 250 }}
      />
      <p>Texto digitado: {titulo}</p>
    </div>
  );
}

export default TituloDinamico;
