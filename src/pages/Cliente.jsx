import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCliente from "../hooks/cliente-hooks";
import InputTelefone from "../components/Cliente/InputTelefone";

const Cliente = () => {
  const { clienteState, sendAndGetCliente } = useCliente();

  const navigate = useNavigate();

  const nomeInicial =
    Object.keys(clienteState).length > 0 && 
    Object.keys(clienteState.cliente).length > 0
      ? clienteState.cliente.nome
      : "";

  const telefoneInicial =
    Object.keys(clienteState).length > 0 &&
    Object.keys(clienteState.cliente).length > 0
      ? clienteState.cliente.telefone
      : "";

  const [nome, setNome] = useState(nomeInicial);
  const [telefone, setTelefone] = useState(telefoneInicial);
  const [erroNome, setErroNome] = useState(null);
  const [erroTelefone, setErroTelefone] = useState(null);

  const handleNomeChange = (event) => {
    setNome(event.target.value);
    setErroNome(null);    
  };

  const enviar = () => {    
    let envia = true;
    if (nome === "") {
      setErroNome("Informe seu Nome");
      envia = false;
    } 
    if (telefone === "") {
      setErroTelefone("Informe seu Telefone");
      envia = false;
    } 

    const telefoneSemMascara = limparMascaraTelefone(telefone);
    if (telefoneSemMascara.length < 10 || telefoneSemMascara.length > 11) {
      setErroTelefone("Telefone inválido");
      envia = false;
    }

    if(envia) {
      sendAndGetCliente({
        nome: nome,
        telefone: telefoneSemMascara,
      });
      navigate("/carrinho");
    }
  };

  const limparMascaraTelefone = (value) => {
    return value && value.replace(/\D/g, "");
  };

  return (
    <>
      <div className="container mb-5 py-3 py-xl-0">
        <div className="row">
          <div className="col-md-8 col-xl-7 mx-auto d-flex flex-column">
            <p className="display-6">Cliente</p>
            <label>Informe seu Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={handleNomeChange}
              className="form-control"
            />
            {erroNome && <div className="text-danger">{erroNome}</div>}
            <br />
            <label>Informe seu Telefone:</label>
            <InputTelefone
              className="form-control"
              value={telefone}
              onChange={(ev) => setTelefone(ev.target.value)}
              temDDD
              separaDDD
            />
            {erroTelefone && <div className="text-danger">{erroTelefone}</div>}

            <button
              type="submit"
              onClick={enviar}
              className="btn btn-primary my-3"
            >
              Enviar
            </button>
            <Link to="/carrinho" className="btn btn-secondary my-3">
              Voltar para o Carrinho
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};



export default Cliente;
