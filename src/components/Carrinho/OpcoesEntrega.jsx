import React from "react";
import { useNavigate } from "react-router-dom";
import useCliente from "../../hooks/cliente-hooks";

const OpcoesEntrega = ({ empresa, enderecos, opcaoSelecionada, handleFreteChange, frete }) => {
  const { removerEndereco } = useCliente();

  const navigate = useNavigate();

  const adicionarEndereco = () => {
    navigate("/endereco");
  };

  const editarEndereco = (id) => {
    if (!id) {
      return;
    }
    navigate("/endereco/"+id);
  };

    const excluirEndereco = (id) => {
      if (!id) {
        return;
      }
      removerEndereco(id);
    };

  const dentroLimiteEnderecos = enderecos.length < 4;

  const opcoesEnderecos = enderecos.map((endereco, index) => (
    <div
      key={index}
      className="my-2"
      style={{
        border: '1px solid #ccc',
        borderRadius: '10px',
        margin: '0',
        padding: '8px 8px',
      }}
      onClick={(e) => {
        const radio = e.target.querySelector('input[type="radio"]');
        if (radio) {
          radio.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        }
      }}
    >
      <div className="form-check d-flex align-items-center">
        <input
          className="form-check-input me-2"
          type="radio"
          id={`endereco-${endereco.id}`}
          name="entrega"
          value={endereco.id}
          checked={Number(opcaoSelecionada) === endereco.id}
          onChange={handleFreteChange}
        />
        <label htmlFor={`endereco-${endereco.id}`}>
          <span className="fw-semibold">{endereco.nome}</span>
          <br />
          <span className="fw-light">
            {endereco.logradouro}, {endereco.numero} {endereco.complemento} -{' '}
            {endereco.bairro}
          </span>
        </label>
      </div>
      <div className="d-flex flex-row justify-content-around">
        <button
          type="button"
          className="btn btn-link text-decoration-none"
          onClick={(e) => {
            e.stopPropagation();
            editarEndereco(endereco.id);
          }}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-link text-danger text-decoration-none"
          onClick={(e) => {
            e.stopPropagation();
            excluirEndereco(endereco.id);
          }}
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
        {dentroLimiteEnderecos && (
          <button
            type="button"
            className="btn btn-outline-primary my-2"
            onClick={() => adicionarEndereco()}
          >
            Adicionar novo endereço
          </button>
        )}
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
              <span className="fw-light">
                Endereço da loja para retirar: {empresa.logradouro},{" "}
                {empresa.numero} - {empresa.bairro}
              </span>
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
