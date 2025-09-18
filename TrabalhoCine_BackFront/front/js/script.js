document.addEventListener("DOMContentLoaded", () => {
  const filmesContainer = document.getElementById("filmes-container");

  async function fetchFilmes() {
    try {
      const response = await fetch("http://localhost:8080/filmes");

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const filmes = await response.json();
      displayFilmes(filmes);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      filmesContainer.innerHTML =
        "<p>Não foi possível carregar os filmes. Tente novamente mais tarde.</p>";
    }
  }

  function displayFilmes(filmes) {
    if (filmes.length === 0) {
      filmesContainer.innerHTML = "<p>Nenhum filme encontrado no catálogo.</p>";
      return;
    }

    filmesContainer.innerHTML = "";

    filmes.forEach((filme) => {
      const filmeCard = document.createElement("div");
      filmeCard.classList.add("filme-card");

      // Cria um elemento <a> para tornar a imagem e o título clicáveis
      const filmeLink = document.createElement("a");
      // Define o href com a URL do trailer vinda do banco de dados
      filmeLink.href = filme.trailerUrl;
      // Abre o link em uma nova aba/janela
      filmeLink.target = "_blank"; 
      
      const imagemFilme = document.createElement("img");
      imagemFilme.src = filme.imagemUrl;
      imagemFilme.alt = `Capa do filme ${filme.titulo}`;

      const tituloFilme = document.createElement("h3");
      tituloFilme.textContent = filme.titulo;

      // Anexa a imagem e o título ao link
      filmeLink.appendChild(imagemFilme);
      filmeLink.appendChild(tituloFilme);

      // Anexa o link (que agora contém imagem e título) ao cartão do filme
      filmeCard.appendChild(filmeLink);

      filmesContainer.appendChild(filmeCard);
    });
  }

  fetchFilmes();
});