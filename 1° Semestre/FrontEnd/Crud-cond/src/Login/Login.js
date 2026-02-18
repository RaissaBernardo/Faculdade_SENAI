import React, {useState} from 'react';
import './Login.css';


function Login ({onLogin}){

    const [username, setUserName] =useState("");
    const[password, setPassword] = useState("");

    const handleSumbit = (e) =>{
        e.preventDefault()
        onLogin(username, password);
    }
    return(
        <div className="login-container">
            <form className="login-form" onSubmit={handleSumbit}>
                <h2>Agenda de Contatos</h2>
                <p>Faça login para continuar</p>
                
                    <input 
                    type="text"
                    placeholder="Usuário(Admin)"
                    value = {username}
                    onChange={(e) => setUserName(e.target.value)}
                 />
                
                <input 
                    type="password"
                    placeholder="Senha (123)"
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                 />
                 <button type="submit">Entrar</button>

            </form>

        </div>
    )

}export default Login;