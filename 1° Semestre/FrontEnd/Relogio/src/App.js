import { useState, useEffect } from "react";

function Relogio(){
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const idInterval = setInterval(() => {
      console.log("Atualizando o relógio...");
      setHora(new Date());
    }, 1000)

    return() => {
      clearInterval(idInterval);
      console.log("Relógio parado. Interval removido");
    }
  }, [])

  //o q vai retornar na tela do relógio
  return (
    <div>
      <h2>Relógio Digital</h2>
      <p>A hora atual é {hora.toLocaleTimeString()}</p>

    </div>
  )

}
export default Relogio;