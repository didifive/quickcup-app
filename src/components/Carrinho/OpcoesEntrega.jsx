import React from "react";

const OpcoesEntrega = ({ opcaoSelecionada, handleFreteChange, frete }) => {
  return (
    <>
      <div>
        <input
          type="radio"
          id="opcao1"
          name="enderecoId"
          value="5"
          checked={opcaoSelecionada === "5"}
          onChange={handleFreteChange}
        />
        <label htmlFor="opcao1">Opção 1 (Frete: R$ 5,00)</label>
      </div>
      <div>
        <input
          type="radio"
          id="opcao2"
          name="enderecoId"
          value="0"
          checked={opcaoSelecionada === "0"}
          onChange={handleFreteChange}
        />
        <label htmlFor="opcao2">Retirar no local (Sem taxa de entrega)</label>
      </div>
      <hr />
      <p className="fw-semibold fs-2 my-0 text-end">
        Valor do frete:{" "}
        {frete.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </p>
    </>
  );
};

export default OpcoesEntrega;
