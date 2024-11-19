import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import useQuickCup from '../hooks/quickcup-hooks';
import logo from "../assets/img/quickcup-logo.png";
import useCarrinho from "../hooks/carrinho-hooks";

const Produto = () => { 

  const { quickCupState } = useQuickCup();

  const { id } = useParams();

  const { adicionaItem } = useCarrinho();

  const [quantidade, setQuantidade] = useState(0);
  const [produto, setProduto] = useState({});

  const navigate = useNavigate();


  const adicionarProdutoAoCarrinho = (produto, quantidade) => {
    if (!quantidade || quantidade <= 0) return;
    adicionaItem(produto, quantidade);
    navigate("/carrinho");
  };

  const handleQuantidadeChange = (quantidade) => {
    if (isNaN(quantidade)) quantidade = 0;
    if(quantidade < 0) quantidade = 0;
    setQuantidade(quantidade);
  };
  
  useEffect(() => {
    if (quickCupState.produtos.length > 0) {
      const produtoEncontrado = quickCupState.produtos.find((p) => p.id === Number(id));
      if (produtoEncontrado) {
        setProduto(produtoEncontrado);
      } else {
        navigate('/');
      }
    }
  }, [quickCupState, id, navigate]);

  return (
    <div className="container mb-5 py-3 py-xl-0">
      <div className="row">
        <div className="col col mx-auto d-flex flex-column">
          <div className="d-flex">
            <div className="col-8 flex-shrink-1">
              <h4>{produto.nome}</h4>
            </div>
            {produto.valorOriginal && (
              <div className="d-flex flex-column col-4 flex-grow-1 align-items-end">
                {produto.valorDesconto &&
                produto.valorDesconto >= 0 ? (
                  <>
                    <p className="fw-light text-danger text-decoration-line-through mb-0">
                      {produto.valorOriginal.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </p>
                    <p className="fw-semibold fs-2 my-0">
                      {(
                        produto.valorOriginal -
                        produto.valorDesconto
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
            )}
          </div>
          <div className="d-flex flex-row flex-wrap">
            <div className="col-12 col-md-5 mx-0">
              <img
                className="rounded w-100 my-3"
                src={produto.imagem ? produto.imagem : logo}
                alt={`foto ${produto.nome}`}
              />
            </div>
            <div className="d-flex flex-column col-12 order-last col-md-7 ps-md-3 order-md-0 mx-0">
              <h2>Adicione ao seu carrinho</h2>
              <div className="input-group">
                <span className="input-group-text">Quantidade</span>
                <button
                  className="btn btn-light"
                  type="button"
                  onClick={() => handleQuantidadeChange((quantidade || 0) - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  className="form-control"
                  placeholder="0"
                  value={quantidade || ''}
                  onChange={(e) =>
                    handleQuantidadeChange(parseInt(e.target.value))
                  }
                />
                <button
                  className="btn btn-light"
                  type="button"
                  onClick={() => handleQuantidadeChange((quantidade || 0) + 1)}
                >
                  +
                </button>
              </div>
              <button
                href="#"
                type="button"
                className="btn btn-primary flex-grow-0 flex-shrink-0 flex-fill mt-2"
                onClick={() => {
                  adicionarProdutoAoCarrinho(produto, quantidade);
                }}
              >
                + Carrinho
              </button>
              {quantidade > 0 && (
                <p className="fw-light my-2">
                  {`Total para ${quantidade}x de ${produto.nome}: `}
                  {(
                    (produto.valorOriginal -
                      (produto.valorDesconto || 0)) *
                    quantidade
                  ).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </p>
              )}
            </div>
            <div className="col-12">
              <h2>Descrição</h2>
              <p>{produto.descricao}</p>
            </div>
          </div>
          <hr />
          <Link to="/" className="btn btn-secondary my-3">
            Voltar para o Menu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Produto;
