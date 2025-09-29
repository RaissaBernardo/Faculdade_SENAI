import PainelDeUsuario from"./components/PainelDeUsuario";
import { useState } from "react";

export default function App(){
  const [estaLogado, setEstaLogado] = useState(true);

  //função que chama o setEstaLogado
  function mudaEstado(estado){
    setEstaLogado(estado);
  }
  return(
    <PainelDeUsuario estaLogado={estaLogado} mudaEstado={mudaEstado}/>
    
  )
}