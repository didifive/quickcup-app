import React from "react";

const ZERO = 0;

const OpcoesEntrega = ({ empresa, enderecos, opcaoSelecionada, handleFreteChange, frete }) => {
  const dentroLimiteEnderecos = enderecos.length < 4;

  const opcoesEnderecos = enderecos.map((endereco, index) => (
    <div
      key={index}
      className="my-2"
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        margin: "0",
        padding: "8px 8px",
      }}
    >
      <div className="form-check d-flex align-items-center">
        <input
          className="form-check-input me-2"
          type="radio"
          id={`endereco-${index}`}
          name="entrega"
          value={endereco.id}
          checked={opcaoSelecionada === endereco.id}
          onChange={handleFreteChange}
        />
        <label htmlFor={`endereco-${index}`}>
          <span className="fw-semibold">{endereco.nome}</span>
          <br />
          {endereco.logradouro}, {endereco.numero} {endereco.complemento} -{" "}
          {endereco.bairro}
        </label>
      </div>
      <div className="d-flex flex-row justify-content-between">
        <button
          type="button"
          className="btn btn-link"
          onClick={() => editarEndereco()}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => editarEndereco()}
        >
          Excluir
        </button>
      </div>
    </div>
  ));

  return (
    <>
      <div className="form-group">
        {opcoesEnderecos}
        {dentroLimiteEnderecos &&
          <button
            type="button"
            className="btn btn-outline-primary my-2"
            onClick={() => adicionarEndereco()}
          >
            Adicionar novo endereço
          </button>
        }
        <hr />
        <div
          className="my-2"
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            margin: "0",
            padding: "8px 8px",
          }}
        >
          <div className="form-check d-flex align-items-center">
            <input
              className="form-check-input me-2"
              type="radio"
              id="retira"
              name="entrega"
              value="0"
              checked={opcaoSelecionada === "0"}
              onChange={handleFreteChange}
            />
            <label htmlFor="retira">
              <span className="fw-semibold">Retirar na loja</span> (Sem taxa de
              entrega) <br />
              {empresa.logradouro}, {empresa.numero} - {empresa.bairro}
            </label>
          </div>
        </div>
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
