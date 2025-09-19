import React, { useState, useEffect } from 'react';
import './App.css';

function ContadorCurtidas() {
  const [curtidas, setCurtidas] = useState(0);

  useEffect(() => {
    if (curtidas >= 5) {
      alert("Curtidas em alta!");
    }
  }, [curtidas]); 

  const incrementarCurtida = () => {
    setCurtidas(curtidas + 1);
  };

  return (
    <div>
      <p>Curtidas: {curtidas}</p>
      <button onClick={incrementarCurtida} class="btn btn-white btn-animate">Curtir</button>
    </div>
  );
}

export default ContadorCurtidas;
