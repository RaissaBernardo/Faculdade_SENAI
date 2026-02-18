import React from 'react';
import './App.css';

const { useState, useEffect } = React;
//todo front
const App = () => {
  const [activeTab, setActiveTab] = useState('produtos');
  const [cart, setCart] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [cliente, setCliente] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    endereco: {
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      complemento: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);

  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [adminTab, setAdminTab] = useState('clientes');
  const [clientes, setClientes] = useState([]);
  const [enderecos, setEnderecos] = useState([]);
  const [compras, setCompras] = useState([]);
  const [lastPurchase, setLastPurchase] = useState(null);

  const mostrarAba = (aba) => {
    setActiveTab(aba);
    if (aba === 'admin') {
      carregarDadosAdmin();
    }
  };

  const adicionarAoCarrinho = (produto) => {
    setCart([...cart, produto]);
    setTotalValue(totalValue + produto.preco);
  };

const finalizarCompra = async () => {
  try {
    const clienteResp = await fetch("http://localhost:4567/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: cliente.nome,
        cpf: cliente.cpf,
        telefone: cliente.telefone,
        email: cliente.email
      })
    });

    const clienteCriado = await clienteResp.json();
    const idCliente = clienteCriado.idCliente;

    await fetch("http://localhost:4567/enderecos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_cliente: idCliente,
        cep: cliente.endereco.cep,
        rua: cliente.endereco.rua,
        num: cliente.endereco.numero,
        bairro: cliente.endereco.bairro,
        complemento: cliente.endereco.complemento
      })
    });

    for (let item of cart) {
      const compraObj = {
        dataCompra: new Date().toISOString(),
        dataEntrega: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        idProduto: item.id,
        idCliente: idCliente,
        quantidade: 1,
        valorTotal: item.preco
      };

      await fetch("http://localhost:4567/compras", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(compraObj)
      });
    }

    const novaCompra = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      total: totalValue,
      itemsCount: cart.length,
      clienteName: cliente.nome || 'Cliente',
      items: cart
    };

    // salvar resumo para mostrar na aba de sucesso antes de limpar estado
    setLastPurchase(novaCompra);
    setPurchaseHistory([novaCompra, ...purchaseHistory]);
    setCart([]);
    setTotalValue(0);
    setActiveTab("sucesso");

  } catch (err) {
    alert("Erro ao finalizar compra!");
    console.error(err);
  }
};

  const voltarParaProdutos = () => {
    setActiveTab('produtos');
  };

  const aplicarFiltros = () => {
  const busca = document.getElementById("buscaInput").value.toLowerCase();
  const genero = document.getElementById("filtroGenero").value;
  const marca = document.getElementById("filtroMarca").value;

  let filtrados = produtos;

  if (busca) {
    filtrados = filtrados.filter(p =>
      p.nome.toLowerCase().includes(busca)
    );
  }

  if (genero !== "todos") {
    filtrados = filtrados.filter(p => p.genero === genero);
  }

  if (marca !== "todos") {
    filtrados = filtrados.filter(p => p.marca === marca);
  }

  setProdutosFiltrados(filtrados);
};

  useEffect(() => {
  if (activeTab === "produtos") {
    carregarProdutos();
  }
}, [activeTab]);

const carregarProdutos = async () => {
  setLoading(true);
  try {
    const resp = await fetch("http://localhost:4567/produtos");
    const data = await resp.json();
    setProdutos(data);
    setProdutosFiltrados(data);
  } catch (err) {
    console.error("Erro ao carregar produtos:", err);
  }
  setLoading(false);
};

// ===== CRUD CLIENTES =====
const carregarClientes = async () => {
  try {
    const resp = await fetch("http://localhost:4567/clientes");
    const data = await resp.json();
    setClientes(data);
  } catch (err) {
    console.error("Erro ao carregar clientes:", err);
  }
};

const buscarClientePorCpf = async (cpf) => {
  try {
    const resp = await fetch(`http://localhost:4567/clientes/${cpf}`);
    if (resp.status === 404) {
      alert("Cliente não encontrado");
      return null;
    }
    return await resp.json();
  } catch (err) {
    console.error("Erro ao buscar cliente:", err);
    return null;
  }
};

const atualizarCliente = async (cpf, clienteData) => {
  try {
    const resp = await fetch(`http://localhost:4567/clientes/${cpf}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clienteData)
    });
    const data = await resp.json();
    alert("Cliente atualizado com sucesso!");
    carregarClientes();
    return data;
  } catch (err) {
    console.error("Erro ao atualizar cliente:", err);
    alert("Erro ao atualizar cliente!");
  }
};

const deletarCliente = async (cpf) => {
  if (!window.confirm("Deseja realmente deletar este cliente?")) return;
  try {
    await fetch(`http://localhost:4567/clientes/${cpf}`, {
      method: "DELETE"
    });
    alert("Cliente deletado com sucesso!");
    carregarClientes();
  } catch (err) {
    console.error("Erro ao deletar cliente:", err);
    alert("Erro ao deletar cliente!");
  }
};

// ===== CRUD ENDEREÇOS =====
const carregarEnderecos = async () => {
  try {
    const resp = await fetch("http://localhost:4567/enderecos");
    const data = await resp.json();
    setEnderecos(data);
  } catch (err) {
    console.error("Erro ao carregar endereços:", err);
  }
};

const buscarEnderecoPorId = async (id) => {
  try {
    const resp = await fetch(`http://localhost:4567/enderecos/${id}`);
    if (resp.status === 404) {
      alert("Endereço não encontrado");
      return null;
    }
    return await resp.json();
  } catch (err) {
    console.error("Erro ao buscar endereço:", err);
    return null;
  }
};

const criarEndereco = async (enderecoData) => {
  try {
    const resp = await fetch("http://localhost:4567/enderecos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enderecoData)
    });
    const data = await resp.json();
    alert("Endereço criado com sucesso!");
    carregarEnderecos();
    return data;
  } catch (err) {
    console.error("Erro ao criar endereço:", err);
    alert("Erro ao criar endereço!");
  }
};

const atualizarEndereco = async (id, enderecoData) => {
  try {
    const resp = await fetch(`http://localhost:4567/enderecos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enderecoData)
    });
    const data = await resp.json();
    alert("Endereço atualizado com sucesso!");
    carregarEnderecos();
    return data;
  } catch (err) {
    console.error("Erro ao atualizar endereço:", err);
    alert("Erro ao atualizar endereço!");
  }
};

const deletarEndereco = async (id) => {
  if (!window.confirm("Deseja realmente deletar este endereço?")) return;
  try {
    await fetch(`http://localhost:4567/enderecos/${id}`, {
      method: "DELETE"
    });
    alert("Endereço deletado com sucesso!");
    carregarEnderecos();
  } catch (err) {
    console.error("Erro ao deletar endereço:", err);
    alert("Erro ao deletar endereço!");
  }
};

// ===== CRUD PRODUTOS =====
const buscarProdutoPorId = async (id) => {
  try {
    const resp = await fetch(`http://localhost:4567/produtos/${id}`);
    if (resp.status === 404) {
      alert("Produto não encontrado");
      return null;
    }
    return await resp.json();
  } catch (err) {
    console.error("Erro ao buscar produto:", err);
    return null;
  }
};

const criarProduto = async (produtoData) => {
  try {
    const resp = await fetch("http://localhost:4567/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produtoData)
    });
    const data = await resp.json();
    alert("Produto criado com sucesso!");
    carregarProdutos();
    return data;
  } catch (err) {
    console.error("Erro ao criar produto:", err);
    alert("Erro ao criar produto!");
  }
};

const atualizarProduto = async (id, produtoData) => {
  try {
    const resp = await fetch(`http://localhost:4567/produtos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produtoData)
    });
    const data = await resp.json();
    alert("Produto atualizado com sucesso!");
    carregarProdutos();
    return data;
  } catch (err) {
    console.error("Erro ao atualizar produto:", err);
    alert("Erro ao atualizar produto!");
  }
};

const deletarProduto = async (id) => {
  if (!window.confirm("Deseja realmente deletar este produto?")) return;
  try {
    await fetch(`http://localhost:4567/produtos/${id}`, {
      method: "DELETE"
    });
    alert("Produto deletado com sucesso!");
    carregarProdutos();
  } catch (err) {
    console.error("Erro ao deletar produto:", err);
    alert("Erro ao deletar produto!");
  }
};

// ===== CRUD COMPRAS =====
const carregarCompras = async () => {
  try {
    const resp = await fetch("http://localhost:4567/compras");
    const data = await resp.json();
    setCompras(data); // Atualiza o estado com as compras recebidas
  } catch (err) {
    console.error("Erro ao carregar compras:", err);
  }
};

const buscarCompraPorId = async (id) => {
  try {
    const resp = await fetch(`http://localhost:4567/compras/${id}`);
    if (resp.status === 404) {
      alert("Compra não encontrada");
      return null;
    }
    return await resp.json();
  } catch (err) {
    console.error("Erro ao buscar compra:", err);
    return null;
  }
};

const deletarCompra = async (id) => {
  if (!window.confirm("Deseja realmente deletar esta compra?")) return;
  try {
    await fetch(`http://localhost:4567/compras/${id}`, {
      method: "DELETE"
    });
    alert("Compra deletada com sucesso!");
    carregarCompras();
  } catch (err) {
    console.error("Erro ao deletar compra:", err);
    alert("Erro ao deletar compra!");
  }
};

const carregarDadosAdmin = () => {
  carregarClientes();
  carregarEnderecos();
  carregarProdutos();
  carregarCompras();
};

  return (
    <div>
      <header>
        <div className="container">
          <div className="header-content">
            <h1>E-Commerce </h1>
            <button className="cart-btn" onClick={() => mostrarAba('carrinho')}>
              Carrinho
              <span className="cart-badge">{cart.length}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === 'produtos' ? 'active' : ''}`}
            onClick={() => mostrarAba('produtos')}
          >
            Produtos
          </button>
          <button
            className={`tab-btn ${activeTab === 'carrinho' ? 'active' : ''}`}
            onClick={() => mostrarAba('carrinho')}
          >
            Carrinho
          </button>
          <button
            className={`tab-btn ${activeTab === 'checkout' ? 'active' : ''}`}
            onClick={() => mostrarAba('checkout')}
          >
            Checkout
          </button>
          <button
            className={`tab-btn ${activeTab === 'entrega' ? 'active' : ''}`}
            onClick={() => mostrarAba('entrega')}
          >
            Entrega / Histórico
          </button>
          <button
            className={`tab-btn ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => mostrarAba('admin')}
          >
            Admin (CRUD)
          </button>
        </div>

        {activeTab === 'produtos' && (
      <div id="abaProdutos" className="tab-content">

        <div className="filters">
          <div className="filter-grid">
            <input
              type="text"
              id="buscaInput"
              className="filter-input"
              placeholder="Buscar produtos..."
              onKeyUp={aplicarFiltros}
            />

            <select
              id="filtroGenero"
              className="filter-select"
              onChange={aplicarFiltros}
            >
              <option value="todos">Todos os Gêneros</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Unissex">Unissex</option>
            </select>

            <select
              id="filtroMarca"
              className="filter-select"
              onChange={aplicarFiltros}
            >
              <option value="todos">Todas as Marcas</option>
              {[...new Set(produtos.map(p => p.marca))].map((m, idx) => (
                <option key={idx} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        {loading && (
          <div id="loading" className="loading">
            <div className="spinner"></div>
            <p>Carregando produtos...</p>
          </div>
        )}

        <div id="productsGrid" className="products-grid">
          {produtosFiltrados.length > 0 &&
            produtosFiltrados.map((produto) => (
              <div key={produto.id} className="product-card">
                <h3>{produto.nome}</h3>
                <p className="brand">{produto.marca}</p>
                <p className="gender">{produto.genero}</p>
                <p className="price">R$ {produto.preco.toFixed(2)}</p>

                <button
                  className="add-btn"
                  onClick={() => adicionarAoCarrinho(produto)}
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            ))}
        </div>

        {produtosFiltrados.length === 0 && !loading && (
          <div id="emptyProducts" className="empty-message">
            <h2>Nenhum produto encontrado</h2>
            <p>Tente ajustar os filtros de busca</p>
          </div>
        )}
      </div>
    )}

        {activeTab === 'carrinho' && (
          <div id="abaCarrinho" className="tab-content">
            {cart.length === 0 ? (
              <div id="carrinhoVazio" className="empty-cart">
                <h2>Carrinho Vazio</h2>
                <p>Adicione produtos ao carrinho para continuar</p>
                <button className="btn-primary" onClick={() => mostrarAba('produtos')}>
                  Ver Produtos
                </button>
              </div>
            ) : (
              <div id="carrinhoItens" className="cart-items">
                {cart.map((item, idx) => (
                  <div key={idx} className="cart-item">
                    <div className="cart-item-name">{item.nome || 'Produto'}</div>
                    <div className="cart-item-price">{`R$ ${item.preco?.toFixed?.(2) ?? item.preco}`}</div>
                  </div>
                ))}
              </div>
            )}

            <div id="carrinhoTotal" className="cart-total">
              <div className="total-box">
                <div className="total-label">Total:</div>
                <div className="total-value">{`R$ ${totalValue.toFixed(2)}`}</div>
              </div>
              <button
                className="btn-success btn-large"
                onClick={() => mostrarAba('checkout')}
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        )}

        {activeTab === 'checkout' && (
          <div id="abaCheckout" className="tab-content">
            <div className="checkout-grid">
              <div className="forms-section">
                <div className="form-card">
                  <h2>Dados do Cliente</h2>
                  <div className="form-group">
                    <input
                      type="text"
                      id="clienteNome"
                      placeholder="Nome Completo"
                      required
                      value={cliente.nome}
                      onChange={(e) =>
                        setCliente({ ...cliente, nome: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="clienteCpf"
                      placeholder="CPF"
                      required
                      value={cliente.cpf}
                      onChange={(e) =>
                        setCliente({ ...cliente, cpf: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      id="clienteTelefone"
                      placeholder="Telefone"
                      value={cliente.telefone}
                      onChange={(e) =>
                        setCliente({ ...cliente, telefone: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      id="clienteEmail"
                      placeholder="E-mail"
                      required
                      value={cliente.email}
                      onChange={(e) =>
                        setCliente({ ...cliente, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-card">
                  <h2>Endereço de Entrega</h2>
                  <div className="form-group">
                    <input
                      type="text"
                      id="enderecoCep"
                      placeholder="CEP"
                      required
                      value={cliente.endereco.cep}
                      onChange={(e) =>
                        setCliente({
                          ...cliente,
                          endereco: { ...cliente.endereco, cep: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="enderecoRua"
                      placeholder="Rua"
                      required
                      value={cliente.endereco.rua}
                      onChange={(e) =>
                        setCliente({
                          ...cliente,
                          endereco: { ...cliente.endereco, rua: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input
                        type="text"
                        id="enderecoNum"
                        placeholder="Número"
                        required
                        value={cliente.endereco.numero}
                        onChange={(e) =>
                          setCliente({
                            ...cliente,
                            endereco: {
                              ...cliente.endereco,
                              numero: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        id="enderecoBairro"
                        placeholder="Bairro"
                        value={cliente.endereco.bairro}
                        onChange={(e) =>
                          setCliente({
                            ...cliente,
                            endereco: {
                              ...cliente.endereco,
                              bairro: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="enderecoComplemento"
                      placeholder="Complemento"
                      value={cliente.endereco.complemento}
                      onChange={(e) =>
                        setCliente({
                          ...cliente,
                          endereco: {
                            ...cliente.endereco,
                            complemento: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="summary-section">
                <div className="form-card summary-card">
                  <h2>Resumo do Pedido</h2>
                  <div id="resumoPedido" className="order-summary">
                    {cart.length === 0 ? (
                      <div className="empty-message small">Nenhum item no resumo</div>
                    ) : (
                      cart.map((item, i) => (
                        <div key={i} className="order-item">
                          <span>{item.nome || 'Produto'}</span>
                          <span>{`R$ ${item.preco?.toFixed?.(2) ?? item.preco}`}</span>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="summary-total">
                    <span>Total:</span>
                    <span className="summary-total-value">
                      {`R$ ${totalValue.toFixed(2)}`}
                    </span>
                  </div>
                  <button
                    className="btn-success btn-large"
                    onClick={finalizarCompra}
                    id="btnFinalizar"
                  >
                    Confirmar Pedido
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'entrega' && (
          <div id="abaEntrega" className="tab-content">
            <div className="form-card">
              <h2>Histórico de Entregas / Compras</h2>
              {purchaseHistory.length === 0 ? (
                <div className="empty-message">
                  <h3>Nenhuma entrega encontrada</h3>
                  <p>Aqui aparecerão suas compras finalizadas.</p>
                </div>
              ) : (
                <div className="history-list">
                  {purchaseHistory.map((p) => (
                    <div className="history-item" key={p.id}>
                      <div className="history-meta">
                        <div className="history-date">{p.date}</div>
                        <div className="history-client">{p.clienteName}</div>
                      </div>
                      <div className="history-info">
                        <div>{p.itemsCount} itens</div>
                        <div className="history-total">{`R$ ${p.total.toFixed(2)}`}</div>
                      </div>
                      <details className="history-details">
                        <summary>Ver itens</summary>
                        <ul>
                          {p.items.map((it, idx) => (
                            <li key={idx}>{`${it.nome || 'Produto'} - R$ ${it.preco?.toFixed?.(2) ?? it.preco}`}</li>
                          ))}
                        </ul>
                      </details>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'sucesso' && (
          <div id="abaSucesso" className="tab-content">
            <div className="success-card">
              <div className="success-icon"></div>
              <h1>Compra Realizada com Sucesso!</h1>
              <p className="success-message">
                Obrigado pela sua compra, <span id="successClienteName">{lastPurchase?.clienteName ?? cliente.nome}</span>!
              </p>

              <div className="success-details">
                <div className="success-detail-item">
                  <div className="detail-label">Total Pago</div>
                  <div className="detail-value success-total">
                    {`R$ ${Number(lastPurchase?.total ?? totalValue).toFixed(2)}`}
                  </div>
                </div>
                <div className="success-detail-item">
                  <div className="detail-label">Itens Comprados</div>
                  <div className="detail-value success-items">
                    {lastPurchase?.itemsCount ?? cart.length}
                  </div>
                </div>
              </div>

              <button className="btn-primary btn-large" onClick={voltarParaProdutos}>
                Continuar Comprando
              </button>
            </div>
          </div>
        )}

        {activeTab === 'admin' && (
          <div id="abaAdmin" className="tab-content">
            <div className="admin-panel">
              <h2>Painel Administrativo</h2>
              
              <div className="admin-tabs">
                <button
                  className={`admin-tab-btn ${adminTab === 'clientes' ? 'active' : ''}`}
                  onClick={() => setAdminTab('clientes')}
                >
                  Clientes
                </button>
                <button
                  className={`admin-tab-btn ${adminTab === 'enderecos' ? 'active' : ''}`}
                  onClick={() => setAdminTab('enderecos')}
                >
                  Endereços
                </button>
                <button
                  className={`admin-tab-btn ${adminTab === 'produtos' ? 'active' : ''}`}
                  onClick={() => setAdminTab('produtos')}
                >
                  Produtos
                </button>
                <button
                  className={`admin-tab-btn ${adminTab === 'compras' ? 'active' : ''}`}
                  onClick={() => setAdminTab('compras')}
                >
                  Compras
                </button>
              </div>

              {adminTab === 'clientes' && (
                <div className="admin-section">
                  <h3>Gerenciar Clientes</h3>
                  <div style={{display:'flex', gap:8, marginBottom:8}}>
                    <button className="btn-primary" onClick={carregarClientes}>Atualizar Lista</button>
                    <button
                      className="btn-primary"
                      onClick={async () => {
                        const cpf = prompt("CPF para buscar:");
                        if (!cpf) return;
                        const res = await buscarClientePorCpf(cpf);
                        if (res) {
                          alert(`Cliente:\nNome: ${res.nome}\nCPF: ${res.cpf}\nEmail: ${res.email}\nTel: ${res.telefone}`);
                        }
                      }}
                    >
                      Buscar por CPF
                    </button>
                  </div>
                  <div className="admin-list">
                    {clientes.map((cli) => (
                      <div key={cli.cpf} className="admin-item">
                        <div className="admin-item-info">
                          <strong>{cli.nome}</strong>
                          <p>CPF: {cli.cpf}</p>
                          <p>Email: {cli.email}</p>
                          <p>Telefone: {cli.telefone}</p>
                        </div>
                        <div className="admin-item-actions">
                          <button
                            className="btn-edit"
                            onClick={async () => {
                              const nome = prompt("Novo nome:", cli.nome);
                              const email = prompt("Novo email:", cli.email);
                              const telefone = prompt("Novo telefone:", cli.telefone);
                              if (nome && email) {
                                await atualizarCliente(cli.cpf, {
                                  nome,
                                  cpf: cli.cpf,
                                  email,
                                  telefone: telefone || cli.telefone
                                });
                              }
                            }}
                          >
                            Editar
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => deletarCliente(cli.cpf)}
                          >
                            Deletar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {adminTab === 'enderecos' && (
                <div className="admin-section">
                  <h3>Gerenciar Endereços</h3>
                  <div style={{display:'flex', gap:8, marginBottom:8}}>
                    <button className="btn-primary" onClick={carregarEnderecos}>Atualizar Lista</button>
                    <button
                      className="btn-primary"
                      onClick={async () => {
                        // criar endereço via prompt simples
                        const id_cliente = prompt("ID do cliente:");
                        const cep = prompt("CEP:");
                        const rua = prompt("Rua:");
                        const num = prompt("Número:");
                        const bairro = prompt("Bairro:");
                        const complemento = prompt("Complemento:");
                        if (!id_cliente || !cep || !rua) { alert("Campos mínimos obrigatórios."); return; }
                        await criarEndereco({ id_cliente, cep, rua, num, bairro, complemento });
                      }}
                    >
                      Criar Endereço
                    </button>
                    <button
                      className="btn-primary"
                      onClick={async () => {
                        const id = prompt("ID do endereço:");
                        if (!id) return;
                        const res = await buscarEnderecoPorId(id);
                        if (res) alert(JSON.stringify(res, null, 2));
                      }}
                    >
                      Buscar por ID
                    </button>
                  </div>

                  <div className="admin-list">
                    {enderecos.map((end) => (
                      <div key={end.id} className="admin-item">
                        <div className="admin-item-info">
                          <strong>ID: {end.id}</strong>
                          <p>Cliente ID: {end.id_cliente}</p>
                          <p>Rua: {end.rua}</p>
                          <p>CEP: {end.cep}</p>
                          <p>Número: {end.num ?? end.numero}</p>
                          <p>Bairro: {end.bairro}</p>
                          <p>Complemento: {end.complemento}</p>
                        </div>
                        <div className="admin-item-actions">
                          <button
                            className="btn-edit"
                            onClick={async () => {
                              const cep = prompt("Novo CEP:", end.cep);
                              const rua = prompt("Nova rua:", end.rua);
                              const num = prompt("Novo número:", end.num ?? end.numero);
                              const bairro = prompt("Novo bairro:", end.bairro);
                              const complemento = prompt("Novo complemento:", end.complemento || "");
                              if (cep && rua) {
                                await atualizarEndereco(end.id, {
                                  id_cliente: end.id_cliente,
                                  cep,
                                  rua,
                                  num,
                                  bairro,
                                  complemento
                                });
                              }
                            }}
                          >
                            Editar
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => deletarEndereco(end.id)}
                          >
                            Deletar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {adminTab === 'produtos' && (
                <div className="admin-section">
                  <h3>Gerenciar Produtos</h3>
                  <div style={{display:'flex', gap:8, marginBottom:8}}>
                    <button className="btn-primary" onClick={carregarProdutos}>Atualizar Lista</button>
                    <button
                      className="btn-primary"
                      onClick={async () => {
                        // criar produto via prompt simples
                        const nome = prompt("Nome do produto:");
                        const marca = prompt("Marca:");
                        const genero = prompt("Gênero:");
                        const precoStr = prompt("Preço (use ponto):");
                        const estoqueStr = prompt("Estoque (inteiro):", "0");
                        const preco = parseFloat(precoStr);
                        const estoque = parseInt(estoqueStr, 10) || 0;
                        if (!nome || !marca || isNaN(preco)) { alert("Dados inválidos."); return; }
                        await criarProduto({ nome, marca, genero, preco, estoque });
                      }}
                    >
                      Criar Produto
                    </button>
                    <button
                      className="btn-primary"
                      onClick={async () => {
                        const id = prompt("ID do produto:");
                        if (!id) return;
                        const res = await buscarProdutoPorId(id);
                        if (res) alert(JSON.stringify(res, null, 2));
                      }}
                    >
                      Buscar por ID
                    </button>
                  </div>

                  <div className="admin-list">
                    {produtos.map((prod) => (
                      <div key={prod.id} className="admin-item">
                        <div className="admin-item-info">
                          <strong>{prod.nome}</strong>
                          <p>Marca: {prod.marca}</p>
                          <p>Gênero: {prod.genero}</p>
                          <p>Preço: R$ {Number(prod.preco).toFixed(2)}</p>
+                         <p>Estoque: {prod.estoque ?? prod.quantidade ?? prod.stock ?? prod.qtd ?? 0}</p>
                        </div>
                        <div className="admin-item-actions">
                          <button
                            className="btn-edit"
                            onClick={async () => {
                              const nome = prompt("Novo nome:", prod.nome);
                              const marca = prompt("Nova marca:", prod.marca);
                              const genero = prompt("Novo gênero:", prod.genero);
                              const precoStr = prompt("Novo preço (use ponto):", String(prod.preco));
                              const preco = parseFloat(precoStr);
                              if (nome && marca && !isNaN(preco)) {
                                await atualizarProduto(prod.id, {
                                  nome,
                                  marca,
                                  genero,
                                  preco
                                });
                              } else {
                                alert("Dados inválidos. Atualização cancelada.");
                              }
                            }}
                          >
                            Editar
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => deletarProduto(prod.id)}
                          >
                            Deletar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {adminTab === 'compras' && (
                <div className="admin-section">
                  <h3>Gerenciar Compras</h3>
                  <div style={{display:'flex', gap:8, marginBottom:8}}>
                    <button className="btn-primary" onClick={carregarCompras}>Atualizar Lista</button>
                    <button
                      className="btn-primary"
                      onClick={async () => {
                        const id = prompt("ID da compra:");
                        if (!id) return;
                        const res = await buscarCompraPorId(id);
                        if (res) alert(JSON.stringify(res, null, 2));
                      }}
                    >
                      Buscar por ID
                    </button>
                  </div>

                  <div className="admin-list">
                    {compras.map((c) => (
                      <div key={c.id} className="admin-item">
                        <div className="admin-item-info">
                          <strong>ID Compra: {c.id}</strong>
                          <p>Data: {c.dataCompra ?? c.data ?? c.createdAt}</p>
                          <p>Cliente ID: {c.idCliente ?? c.id_cliente}</p>
                          <p>Valor Total: R$ {Number(c.valorTotal ?? c.total ?? 0).toFixed(2)}</p>
                        </div>
                        <div className="admin-item-actions">
                          <button
                            className="btn-delete"
                            onClick={() => deletarCompra(c.id)}
                          >
                            Deletar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default App;