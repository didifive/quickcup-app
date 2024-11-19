import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/quickcup-logo.png";
import useCarrinho from "../../hooks/carrinho-hooks";

const MenuProdutos = ({ produtos }) => { 

  const [quantidades, setQuantidades] = useState({});

  const { adicionaItem } = useCarrinho();

  const navigate = useNavigate();

  const adicionarProdutoAoCarrinho = (produto, quantidade) => {
    if (!quantidade || quantidade <= 0) return;
    adicionaItem(produto, quantidade);
    navigate("/carrinho");
  };

  const handleQuantidadeChange = (id, quantidade) => {
    if(quantidade < 0) quantidade = 0;
    setQuantidades((prevQuantidades) => ({
      ...prevQuantidades,
      [id]: quantidade,
    }));
  };

  const toPaginaProduto = (id) => {
    navigate(`/produto/${id}`);
  };

  return (
    <div>
      {produtos.length === 0 && (
        <p>Não há produtos cadastrados para esse grupo</p>
      )}
      {produtos.map((produto, index) => (
        <div key={index}>
          <div className="col d-flex flex-column mx-auto">
            <div
              className="d-flex align-items-center align-items-md-start align-items-xl-center"
              onClick={() => toPaginaProduto(produto.id)}
            >
              <div className="bs-icon-xl bs-icon-circle bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center col-3 pe-2">
                <img
                  className="rounded w-100"
                  src={produto.imagem ? produto.imagem : logo}
                  alt={`foto ${produto.nome}`}
                />
              </div>
              <div className="d-flex flex-column col-9">
                <div className="d-flex">
                  <div className="col-8 flex-shrink-1">
                    <h4>{produto.nome}</h4>
                    <p className="fw-light text-muted text-truncate">
                      {produto.descricao}
                    </p>
                  </div>
                  <div className="d-flex flex-column col-4 flex-grow-1 align-items-end">
                    {produto.valorDesconto && produto.valorDesconto >= 0 ? (
                      <>
                        <p className="fw-light text-danger text-decoration-line-through mb-0">
                          {produto.valorOriginal.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </p>
                        <p className="fw-semibold fs-2 my-0">
                          {(
                            produto.valorOriginal - produto.valorDesconto
                          ).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </p>
                      </>
                    ) : (
                      <p className="fw-semibold fs-2">
                        {produto.valorOriginal.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </p>
                    )}
                  </div>
                </div>
                <div
                  className="input-group"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <span className="input-group-text">Quantidade</span>
                  <button
                    className="btn btn-light"
                    type="button"
                    onClick={() =>
                      handleQuantidadeChange(
                        produto.id,
                        (quantidades[produto.id] || 0) - 1
                      )
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="0"
                    value={quantidades[produto.id] || ''}
                    onChange={(e) =>
                      handleQuantidadeChange(
                        produto.id,
                        parseInt(e.target.value)
                      )
                    }
                  />
                  <button
                    className="btn btn-light"
                    type="button"
                    onClick={() =>
                      handleQuantidadeChange(
                        produto.id,
                        (quantidades[produto.id] || 0) + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  href="#"
                  type="button"
                  className="btn btn-primary flex-grow-1 flex-shrink-0 flex-fill mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    adicionarProdutoAoCarrinho(
                      produto,
                      quantidades[produto.id]
                    );
                  }}
                >
                  + Carrinho
                </button>
              </div>
            </div>
          </div>
          <hr className="my-3" />
        </div>
      ))}
    </div>
  );
};

export default MenuProdutos;
