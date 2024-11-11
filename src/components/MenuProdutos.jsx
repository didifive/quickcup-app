import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/quickcup-logo.png";
import useCarrinho from "../hooks/carrinho-hooks";

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

  return (
    <div>
      {produtos.length === 0 && (
        <p>Não há produtos cadastrados para esse grupo</p>
      )}
      {produtos.map((produto, index) => (
        <div key={index}>
          <div className="d-flex align-items-center align-items-md-start align-items-xl-center">
            <div className="w-25 w-max-50 me-2 justify-content-center align-items-center">
              <img
                className="rounded w-100"
                src={produto.imagem ? produto.imagem : logo}
                alt={`foto ${produto.nome}`}
              />
            </div>
            <div>
              <h5>{produto.nome}</h5>
              <p className="text-muted text-xxs">
                {produto.descricao.substring(0, 50)}...
              </p>
              <div className="input-group mb-3">
                <button
                  type="button"
                  className="btn btn-secondary"
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
                  value={quantidades[produto.id] || ""}
                  onChange={(e) =>
                    handleQuantidadeChange(produto.id, parseInt(e.target.value))
                  }
                />
                <button
                  type="button"
                  className="btn btn-secondary"
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
              <a
                href="#"
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  adicionarProdutoAoCarrinho(
                    produto,
                    quantidades[produto.id]
                  )
                }}
              >
                + Carrinho
              </a>
            </div>
          </div>
          <hr className="my-3" />
        </div>
      ))}
    </div>
  );
};

export default MenuProdutos;
