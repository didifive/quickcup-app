import React from "react";
import logo from "../../assets/img/quickcup-logo.png";
import useCarrinho from "../../hooks/carrinho-hooks";

const CarrinhoProdutos = ({ itens }) => { 

  const { atualizaQuantidadeItem, excluirItem } = useCarrinho();

  const handleQuantidadeChange = (id, quantidade) => {
    if(quantidade < 0) quantidade = 0;
    atualizaQuantidadeItem(id, quantidade);
  };

  return (
    <>
      <div>
        {itens.map((item, index) => (
          <div key={index}>
            <div className="col d-flex flex-column mx-auto">
              <div className="d-flex align-items-center align-items-md-start align-items-xl-center">
                <div className="bs-icon-xl bs-icon-circle bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center col-3 pe-2">
                  <img
                    className="rounded w-100"
                    src={item.produto.imagem ? item.produto.imagem : logo}
                    alt={`foto ${item.produto.nome}`}
                  />
                </div>
                <div className="d-flex flex-column col-9">
                  <div>
                    <h4>{item.produto.nome}</h4>
                    <div className="input-group d-flex">
                      <button
                        className="btn btn-sm btn-light"
                        type="button"
                        onClick={() =>
                          handleQuantidadeChange(
                            item.produto.id,
                            (item.quantidade || 0) - 1
                          )
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="form-control grow-1 text-center"
                        placeholder="0"
                        value={item.quantidade || ""}
                        onChange={(e) =>
                          handleQuantidadeChange(
                            item.produto.id,
                            parseInt(e.target.value)
                          )
                        }
                      />
                      <button
                        className="btn btn-sm btn-light"
                        type="button"
                        onClick={() =>
                          handleQuantidadeChange(
                            item.produto.id,
                            (item.quantidade || 0) + 1
                          )
                        }
                      >
                        +
                      </button>
                      <button
                        href="#"
                        type="button"
                        className="btn btn-sm btn-link ms-3 text-danger text-decoration-none"
                        onClick={() => {
                          excluirItem(item.produto.id);
                        }}
                      >
                        Excluir Item
                      </button>
                    </div>
                  </div>
                  <div className="w-100 d-flex flex-row align-items-end justify-content-end">
                    <p className="fw-light">
                      Valor para {item.quantidade}x {item.produto.nome}:
                    </p>
                    <p className="fw-semibold fs-3 ms-2">
                      {(
                        (item.produto.valorOriginal -
                          item.produto.valorDesconto) *
                        item.quantidade
                      ).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-3" />
          </div>
        ))}
        <p className="fw-semibold fs-2 my-0 text-end">
          Total dos items:{" "}
          {itens
            .reduce(
              (total, item) =>
                total +
                (item.produto.valorOriginal - item.produto.valorDesconto) *
                  item.quantidade,
              0
            )
            .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </p>
      </div>
    </>
  );
};

export default CarrinhoProdutos;
