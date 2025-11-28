import React, { useState } from 'react';
import './App.css';

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

  // Novo: histórico de entregas/compras
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  const mostrarAba = (aba) => {
    setActiveTab(aba);
  };

  const adicionarAoCarrinho = (produto) => {
    setCart([...cart, produto]);
    setTotalValue(totalValue + produto.preco);
  };

  const finalizarCompra = () => {
    // Salva compra no histórico
    const novaCompra = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      total: totalValue,
      itemsCount: cart.length,
      clienteName: cliente.nome || 'Cliente',
      items: cart
    };
    setPurchaseHistory([novaCompra, ...purchaseHistory]);

    // Limpa carrinho e total
    setCart([]);
    setTotalValue(0);

    // Vai para tela de sucesso
    setActiveTab('sucesso');
  };

  const voltarParaProdutos = () => {
    setActiveTab('produtos');
  };

  const aplicarFiltros = () => {
    // Função para aplicar filtros de busca
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      {/* Header */}
      <header>
        <div className="container">
          <div className="header-content">
            {/* remove emoji */}
            <h1>E-Commerce SENAI</h1>
            <button className="cart-btn" onClick={() => mostrarAba('carrinho')}>
              Carrinho
              <span className="cart-badge">{cart.length}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container">
        {/* Tabs */}
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
          {/* Nova aba */}
          <button
            className={`tab-btn ${activeTab === 'entrega' ? 'active' : ''}`}
            onClick={() => mostrarAba('entrega')}
          >
            Entrega / Histórico
          </button>
        </div>

        {/* ABA PRODUTOS */}
        {activeTab === 'produtos' && (
          <div id="abaProdutos" className="tab-content">
            {/* Filtros */}
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
                </select>
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div id="loading" className="loading">
                <div className="spinner"></div>
                <p>Carregando produtos...</p>
              </div>
            )}

            {/* Grid de Produtos */}
            <div id="productsGrid" className="products-grid">
              {/* Aqui você pode mapear os produtos dinâmicos. Exemplo */}
              {/* <ProductItem produto={produto} onAddToCart={adicionarAoCarrinho} /> */}
            </div>

            {/* Mensagem Vazio */}
            {cart.length === 0 && (
              <div id="emptyProducts" className="empty-message">
                <h2>Nenhum produto encontrado</h2>
                <p>Tente ajustar os filtros de busca</p>
              </div>
            )}
          </div>
        )}

        {/* ABA CARRINHO */}
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
                {/* Mapear os itens do carrinho aqui */}
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

        {/* ABA CHECKOUT */}
        {activeTab === 'checkout' && (
          <div id="abaCheckout" className="tab-content">
            <div className="checkout-grid">
              {/* Formulários */}
              <div className="forms-section">
                {/* Dados do Cliente */}
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

                {/* Endereço */}
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

              {/* Resumo do Pedido */}
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

        {/* ABA ENTREGA / HISTÓRICO */}
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

        {/* ABA SUCESSO */}
        {activeTab === 'sucesso' && (
          <div id="abaSucesso" className="tab-content">
            <div className="success-card">
              <div className="success-icon"></div>
              <h1>Compra Realizada com Sucesso!</h1>
              <p className="success-message">
                Obrigado pela sua compra, <span id="successClienteName">{cliente.nome}</span>!
              </p>

              <div className="success-details">
                <div className="success-detail-item">
                  <div className="detail-label">Total Pago</div>
                  <div className="detail-value success-total">
                    {`R$ ${totalValue.toFixed(2)}`}
                  </div>
                </div>
                <div className="success-detail-item">
                  <div className="detail-label">Itens Comprados</div>
                  <div className="detail-value success-items">
                    {cart.length}
                  </div>
                </div>
              </div>

              <button className="btn-primary btn-large" onClick={voltarParaProdutos}>
                Continuar Comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
