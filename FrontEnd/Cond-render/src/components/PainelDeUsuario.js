import React from "react";
//constante mensagem boas vindas
const MensagemDeBoasVindas = () => {
    return <h1>Bem-vindo ao Painel de Controle</h1>
}
//mensagem para fazer login
const MensagemDeLogin = () =>{
    return <p>Por favor, faça o login para continuar</p>
}

//Componente principal que usa rederização condicional

function PainelDeUsuario({estaLogado, mudaEstado}){
    //Exemplo 01: Operador Ternário

    const mensagem = estaLogado ? 'Você está logado' : 'Você não está logado';

    //Exemplo 02: Operador &&

    const BotaoDeLogout = () =>{
        return (estaLogado && <button onClick={()=>(mudaEstado(!estaLogado))}>Sair</button>)}

    //Exemplo 03: Componentes separador(melhor para a lógica mais complexa)
    const renderizarConteudo = () =>{
        if (estaLogado){
            return(
                <div>
                    <MensagemDeBoasVindas/>
                    <BotaoDeLogout/>
                </div>
            )
        }else{
            return(
                <div>
                   <MensagemDeLogin/>
                   <button onClick={()=>(mudaEstado(!estaLogado))}>Entrar</button>
                </div>
            )
        }
    }
    return (
        <div>

            <h2>Renderização Condicional</h2>
            <p>{mensagem}</p>
            {renderizarConteudo()}
        </div>
    )
}

export default PainelDeUsuario;