document.addEventListener('DOMContentLoaded', () => {
    const cadastroFilmeForm = document.getElementById('cadastroFilmeForm');
    const nomeFilmeInput = document.getElementById('nomeFilme');
    const urlImagemInput = document.getElementById('urlImagem');
    const trailerUrlInput = document.getElementById('trailerUrl'); 
    const mensagemDiv = document.getElementById('mensagem');

    cadastroFilmeForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        const titulo = nomeFilmeInput.value.trim();
        const imagemUrl = urlImagemInput.value.trim();
        const trailerUrl = trailerUrlInput.value.trim(); 

        if (!titulo || !imagemUrl || !trailerUrl) { 
            exibirMensagem('Por favor, preencha todos os campos.', 'erro');
            return;
        }

        try {
            const backendUrl = 'http://localhost:8080/filmes'; 

            const response = await fetch(backendUrl, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ titulo, imagemUrl, trailerUrl }) 
            });

            if (!response.ok) {
                const errorData = await response.json(); 
                throw new Error(errorData.message || `Erro HTTP! Status: ${response.status}`);
            }

            const data = await response.json(); 
            exibirMensagem(`Filme "${data.titulo}" cadastrado com sucesso! ID: ${data.id}`, 'sucesso');

            nomeFilmeInput.value = '';
            urlImagemInput.value = '';
            trailerUrlInput.value = ''; 
        } catch (error) {
            console.error('Erro ao cadastrar filme:', error); 
            exibirMensagem(`Erro ao cadastrar filme: ${error.message}`, 'erro');
        }
    });

    function exibirMensagem(texto, tipo) {
        mensagemDiv.textContent = texto;
        mensagemDiv.className = `mensagem ${tipo}`;
        mensagemDiv.style.display = 'block';

        setTimeout(() => {
            mensagemDiv.style.display = 'none';
        }, 5000); 
    }
});