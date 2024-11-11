import React from "react";

const diaSemanaMap = {
  SEGUNDA: "Segunda-feira",
  TERCA: "Terça-feira",
  QUARTA: "Quarta-feira",
  QUINTA: "Quinta-feira",
  SEXTA: "Sexta-feira",
  SABADO: "Sábado",
  DOMINGO: "Domingo",
};

const FuncionamentoSemanal = ({ funcionamentoSemanal }) => { 
  return (
    <>
      <p className="mb-4">Funcionamento Semanal:</p>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Dia da Semana</th>
              <th>Abre às</th>
              <th>Fecha às</th>
            </tr>
          </thead>
          <tbody>
            {funcionamentoSemanal.map((item, index) => (
              <tr key={index}>
                <td>{diaSemanaMap[item.diaSemana] || item.diaSemana}</td>
                <td>{item.horaInicio.slice(0, 5)}</td>
                <td>{item.horaFim.slice(0, 5)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default FuncionamentoSemanal;
