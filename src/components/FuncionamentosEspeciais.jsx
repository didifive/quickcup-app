import React from "react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString("pt-BR", options).replace(",", " às");
};

const FuncionamentosEspeciais = ({ funcionamentosEspeciais }) => (
  <>
    <p className="mb-4">Funcionamento Especial:</p>
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>De</th>
            <th>Até</th>
          </tr>
        </thead>
        <tbody>
          {funcionamentosEspeciais.map((funcionamento) => (
            <tr key={funcionamento.id}>
              <td>
                {funcionamento.nome}
                <br />
                <span
                  className={`badge ${
                    funcionamento.tipo === "ABERTO" ? "bg-success" : "bg-danger"
                  }`}
                >
                  {funcionamento.tipo}
                </span>
              </td>
              <td>{formatDate(funcionamento.dataInicio)}</td>
              <td>{formatDate(funcionamento.dataFim)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

export default FuncionamentosEspeciais;
