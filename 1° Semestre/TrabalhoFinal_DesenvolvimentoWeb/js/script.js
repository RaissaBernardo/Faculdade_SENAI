function buscarNaPagina() {
  const termo = document.getElementById('campoBusca').value.toLowerCase();
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const textoCard = card.textContent.toLowerCase();
    card.style.display = textoCard.includes(termo) ? 'block' : 'none';
  });
}

// Criação do botão "Mais informações"
function adicionarBotaoModal(card) {
  const botao = document.createElement('button');
  botao.className = 'btn-modal';
  botao.textContent = 'Mais informações';
  botao.onclick = () => abrirModal(botao);
  card.appendChild(botao);
}

function criarCardEvento(evento) {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <img src="${evento.imagem}" alt="${evento.titulo}">
    <h3>${evento.titulo}</h3>
    <p><strong>Data:</strong> ${evento.data}</p>
    <p><strong>Local:</strong> ${evento.local}</p>
    <div class="detalhes-completos" style="display: none;">
      <p class="hora">${evento.hora}</p>
      <p class="descricao">${evento.descricao}</p>
      <p class="categoria">${evento.categoria}</p>
    </div>
  `;

  adicionarBotaoModal(card);

  const cardsContainer = document.querySelector('.cards') || document.getElementById('eventos-destaque');
  cardsContainer.appendChild(card);
}

function abrirModal(botao) {
  const card = botao.closest('.card');

  const titulo = card.querySelector('h3').textContent;
  const data = card.querySelector('p:nth-of-type(1)').textContent;
  const local = card.querySelector('p:nth-of-type(2)').textContent;

  const detalhes = card.querySelector('.detalhes-completos');
  const hora = detalhes.querySelector('.hora').textContent;
  const descricao = detalhes.querySelector('.descricao').textContent;
  const categoria = detalhes.querySelector('.categoria').textContent;

  document.getElementById('modalTitulo').textContent = titulo;
  document.getElementById('modalDataHora').textContent = `${data} | ${hora}`;
  document.getElementById('modalLocal').textContent = local;
  document.getElementById('modalDescricao').textContent = descricao;
  document.getElementById('modalCategoria').textContent = categoria;

  document.getElementById('modal').style.display = 'block';
}

function fecharModal() {
  document.getElementById('modal').style.display = 'none';
}

window.onclick = function (event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    fecharModal();
  }
};

// Parte do Rafa

// Lista de eventos
const eventos = [
  {
    titulo: "Workshop de Introdução ao JavaScript",
    data: "2025-07-15",
    hora: "19:00",
    local: "Auditório Principal - Centro de Tecnologia",
    descricao: "Aprenda os fundamentos do JavaScript, a linguagem essencial para o desenvolvimento web. Ideal para iniciantes!",
    categoria: "Workshop",
    imagem: "Img/cursojs.jpg"
  },
  {
    titulo: "Meetup: Boas Práticas em HTML e CSS",
    data: "2025-07-22",
    hora: "18:30",
    local: "Sala de Eventos A - Coworking Tech",
    descricao: "Um bate-papo descontraído sobre como escrever HTML semântico e CSS eficiente para seus projetos web.",
    categoria: "Meetup",
    imagem: "Img/boaspraticashtmlcss.jpg"
  },
  {
    titulo: "Palestra: Carreira em Desenvolvimento Front-end",
    data: "2025-08-05",
    hora: "19:30",
    local: "Auditório Principal - Centro de Tecnologia",
    descricao: "Descubra os caminhos e desafios da carreira em desenvolvimento front-end, com dicas de quem já está na área.",
    categoria: "Palestra",
    imagem: "Img/projetointegrador.jpg"
  },
  {
    titulo: "Coding Dojo: Resolvendo Problemas com Python",
    data: "2025-08-18",
    hora: "18:00",
    local: "Laboratório de Inovação - Universidade Local",
    descricao: "Pratique suas habilidades de programação em Python resolvendo desafios em grupo. Traga seu notebook!",
    categoria: "Coding Dojo",
    imagem: "Img/codingdojo.jpg"
  },
  {
    titulo: "Webinar: Ferramentas Essenciais para Desenvolvedores",
    data: "2025-09-01",
    hora: "20:00",
    local: "Online (Link será enviado por e-mail)",
    descricao: "Explore as ferramentas e softwares que todo desenvolvedor web deveria conhecer para otimizar seu fluxo de trabalho.",
    categoria: "Webinar",
    imagem: "Img/webinar.png"
  }
];

function ordenarPorData(a, b) {
  return new Date(a.data) - new Date(b.data);
}

function renderizarEventos(listaEventos) {
  const container = document.querySelector('.cards') || document.getElementById('eventos-destaque');
  if (!container) return;
  container.innerHTML = ""; // limpa

  listaEventos.forEach(evento => criarCardEvento(evento));
}

// Detecta a página atual
const pagina = window.location.pathname;

// Index: mostra os 3 próximos eventos
if (pagina.includes('index.html') || pagina === '/' || pagina === '/index.html') {
  const eventosSalvos = JSON.parse(localStorage.getItem('eventosSalvos')) || [];

  // Junta os eventos fixos com os do localStorage
  const todosEventos = [...eventosSalvos, ...eventos];

  // Data de hoje sem hora
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  // Filtra eventos cuja data é igual ou posterior a hoje
  const eventosFuturos = todosEventos.filter(e => {
    const dataEvento = new Date(e.data);
    dataEvento.setHours(0, 0, 0, 0);
    return dataEvento >= hoje;
  });

  // Ordena por data
  const eventosOrdenados = eventosFuturos.sort((a, b) => {
    const dataA = new Date(a.data);
    const dataB = new Date(b.data);
    return dataA - dataB;
  });

  // Pega os 3 mais próximos
  const eventosProximos = eventosOrdenados.slice(0, 3);

  renderizarEventos(eventosProximos);
}



// Eventos: mostra todos
 else if (pagina.includes('eventos.html')) {
  const eventosSalvos = JSON.parse(localStorage.getItem('eventosSalvos')) || [];

  // Junta os eventos fixos (do código) com os do localStorage
  const todosEventos = [...eventosSalvos, ...eventos];

  // Ordena por data
  const eventosOrdenados = todosEventos.sort(ordenarPorData);

  renderizarEventos(eventosOrdenados);
}


// Parte da Karen de Cadastro
const form = document.getElementById("cadastroEvento");

if (form) {
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const leitorImagem = new FileReader();
    const arquivoImagem = document.getElementById("imagemEvento").files[0];

    leitorImagem.onload = function () {
      const imagemBase64 = leitorImagem.result;

      const novoEvento = {
        titulo: document.getElementById("nomeEvento").value,
        data: document.getElementById("dataEvento").value,
        hora: document.getElementById("horaEvento").value,
        local: document.getElementById("localEvento").value,
        descricao: document.getElementById("descricaoEvento").value,
        categoria: document.getElementById("categoria").value,
        imagem: imagemBase64 || "img/default.jpg"
      };

      const eventosSalvos = JSON.parse(localStorage.getItem('eventosSalvos')) || [];
      eventosSalvos.push(novoEvento);
      localStorage.setItem('eventosSalvos', JSON.stringify(eventosSalvos));

      window.location.href = "eventos.html";
    };

    if (arquivoImagem) {
      leitorImagem.readAsDataURL(arquivoImagem);
    } else {
      leitorImagem.onload();
    }
  });
}