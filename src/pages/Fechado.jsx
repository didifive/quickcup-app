import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useQuickCup from "../hooks/quickcup-hooks";
import logo from "../assets/img/quickcup-logo.png";
import FuncionamentosEspeciais from "../components/FuncionamentosEspeciais";
import FuncionamentoSemanal from "../components/FuncionamentoSemanal";

const Fechado = () => {
  const {
    quickcupState,
    getQuickCupBasico,
  } = useQuickCup();

  useEffect(() => {
    getQuickCupBasico();
  }, []); 

  const navigate = useNavigate();

  useEffect(() => {
    if (
      Object.keys(quickcupState.empresa).length > 0 &&
      quickcupState.empresa.aberto
    ) {
      navigate("/");
    }
  }, [quickcupState.empresa]);

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
                      {Object.keys(quickcupState.empresa).length > 0 &&
                        quickcupState.empresa.funcionamentoSemanal.length >
                          0 && (
                          <FuncionamentoSemanal
                            funcionamentoSemanal={
                              quickcupState.empresa.funcionamentoSemanal
                            }
                          />
                        )}
                      {Object.keys(quickcupState.empresa).length > 0 &&
                        quickcupState.empresa.funcionamentosEspeciais.length >
                          0 && (
                          <FuncionamentosEspeciais
                            funcionamentosEspeciais={
                              quickcupState.empresa.funcionamentosEspeciais
                            }
                          />
                        )}
                      <div className="my-3">
                        <p className="mb-4">
                          Telefone: {quickcupState.empresa.telefone}.
                        </p>
                        <p className="mb-4">
                          E-mail: {quickcupState.empresa.email}
                        </p>
                        <p className="mb-4">
                          Endereço: {quickcupState.empresa.logradouro},{" "}
                          {quickcupState.empresa.numero}
                          {quickcupState.empresa.complemento &&
                            `- ${quickcupState.empresa.complemento}`}
                          {quickcupState.empresa.bairro
                            ? ` - ${quickcupState.empresa.bairro} - `
                            : " - "}
                          {quickcupState.empresa.cidade}/
                          {quickcupState.empresa.estado} - CEP:
                          {quickcupState.empresa.cep}
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
