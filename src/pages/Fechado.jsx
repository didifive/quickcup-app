import React from "react";
import logo from "../assets/img/quickcup-logo.png";
import FuncionamentosEspeciais from "../components/Fechado/FuncionamentosEspeciais";
import FuncionamentoSemanal from "../components/Fechado/FuncionamentoSemanal";

const Fechado = (props) => {
  const { empresa } = props;

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <section className="py-4 py-xl-5">
            <div className="container">
              <div className="bg-dark border rounded border-0 border-dark overflow-hidden">
                <div className="row g-0">
                  <div className="col-md-6">
                    <div className="text-white p-4 p-md-5">
                      <h2 className="fw-bold text-center text-white mb-3">
                        A EMPRESA não está aberta no momento
                      </h2>
                      {Object.keys(empresa).length > 0 &&
                        empresa.funcionamentoSemanal.length >
                          0 && (
                          <FuncionamentoSemanal
                            funcionamentoSemanal={
                              empresa.funcionamentoSemanal
                            }
                          />
                        )}
                      {Object.keys(empresa).length > 0 &&
                        empresa.funcionamentosEspeciais.length >
                          0 && (
                          <FuncionamentosEspeciais
                            funcionamentosEspeciais={
                              empresa.funcionamentosEspeciais
                            }
                          />
                        )}
                      <div className="my-3">
                        <p className="mb-4">
                          Telefone: {empresa.telefone}.
                        </p>
                        <p className="mb-4">
                          E-mail: {empresa.email}
                        </p>
                        <p className="mb-4">
                          Endereço: {empresa.logradouro},{" "}
                          {empresa.numero}
                          {empresa.complemento &&
                            `- ${empresa.complemento}`}
                          {empresa.bairro
                            ? ` - ${empresa.bairro} - `
                            : " - "}
                          {empresa.cidade}/
                          {empresa.estado} - CEP:
                          {empresa.cep}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-6 order-first order-md-last d-flex justify-content-center align-items-center"
                    style={{ minHeight: "250px", backgroundColor: "#f7ead1" }}
                  >
                    <img className="w-100" src={logo} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Fechado;
