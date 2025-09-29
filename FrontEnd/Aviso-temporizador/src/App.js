import React, { useState, useEffect } from "react";
import "./App.css";

function AvisoTemporizado() {
  const [visivel, setVisivel] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisivel(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return <div>{visivel && <h2>Bem-vindo!</h2>}</div>;
}

export default AvisoTemporizado;
