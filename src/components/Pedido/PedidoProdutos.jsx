import React from "react";
import logo from "../../assets/img/quickcup-logo.png";
import useQuickCup from "../../hooks/quickcup-hooks";

const PedidoProdutos = ({ itens }) => {
  const { quickCupState } = useQuickCup();

  const getProduto = (id) => {
    return quickCupState.produtos.find((produto) => produto.id === Number(id));
  };

  return (
    <>
      {itens.map((item, index) => (
        <div key={index}>
          <div className="col d-flex flex-column mx-auto">
            <div className="d-flex align-items-center align-items-md-start align-items-xl-center">
              <div className="bs-icon-xl bs-icon-circle bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center col-4 pe-2">
                <img
                  className="rounded w-100"
                  src={
                    getProduto(item.produtoId).imagem
                      ? getProduto(item.produtoId).imagem
                      : logo
                  }
                  alt={`foto ${getProduto(item.produtoId).nome}}`}
                />
              </div>
              <div className="d-flex flex-column col-8">
                <div>
                  <h4>{getProduto(item.produtoId).nome}</h4>
                  <p className="fw-light">
                    {getProduto(item.produtoId).descricao}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-100 d-flex flex-row align-items-middle justify-content-end">
              <p className="fw-light">
                {item.quantidade} x{" "}
                {(
                  item.valorUnitarioOriginal - item.valorUnitarioDesconto
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })} =
              </p>
              <p className="fw-semibold fs-4 ms-1">
                {(
                  (item.valorUnitarioOriginal - item.valorUnitarioDesconto) *
                  item.quantidade
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          </div>
          <hr className="my-3" />
        </div>
      ))}
    </>
  );
};

export default PedidoProdutos;
