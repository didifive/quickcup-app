import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCliente from "../hooks/cliente-hooks";
import InputTelefone from "../components/Cliente/InputTelefone";

const Endereco = (enderecoId) => {
  const { clienteState, adicionarEndereco, atualizarEndereco } = useCliente();

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
  const [logradouro, setLogradouro] = useState(telefoneInicial);
  const [numero, setNumero] = useState(telefoneInicial);
  const [complemento, setComplemento] = useState(telefoneInicial);
  const [bairro, setBairro] = useState(telefoneInicial);
  const [erroNome, setErroNome] = useState(null);
  const [erroLogradouro, setErroLogradouro] = useState(null);
  const [erroNumero, setErroNumero] = useState(null);

  const handleNomeChange = (event) => {
    setNome(event.target.value);
    setErroNome(null);    
  };

  const handleLogradouroChange = (event) => {
    setLogradouro(event.target.value);
    erroLogradouro(null);
  };

  const handleNumeroChange = (event) => {
    setNumero(event.target.value);
    setErroNumero(null);
  };
  
  const handleComplementoChange = (event) => {
    setComplemento(event.target.value);
  };

  const handleBairroChange = (event) => {
    setBairro(event.target.value);
  };

  const enviar = () => {    
    let envia = true;
    if (nome === "") {
      setErroNome("Informe seu Nome");
      envia = false;
    } 
    if (logradouro === "") {
      setErroLogradouro("Informe o Logradouro");
      envia = false;
    }
    if (numero < 0) {
      setErroNumero("Informe o Número (use o 0 para sem número)");
      envia = false;
    } 

    const endereco = {
      id: enderecoId ? enderecoId : null,
      clienteId: clienteState.cliente.id,
      nome: nome,
      logradouro: logradouro,
      numero: numero,
      complemento: complemento,
      bairro: bairro,
      cidade: "Orlândia",
      estado: "SP",
      longitude: 0,
      latitude: 0,
    }; 

    if(envia) {
      if (enderecoId) {
        atualizarEndereco(endereco.id, endereco);
      }
        adicionarEndereco(endereco);
      navigate("/carrinho");
    }
  };

  return (
    <>
      <div className="container mb-5 py-3 py-xl-0">
        <div className="row">
          <div className="col-md-8 col-xl-7 mx-auto d-flex flex-column">
            <p className="display-6">Endereço:</p>
            <label>Apelido para o endereço:*</label>
            <input
              type="text"
              value={nome}
              onChange={handleNomeChange}
              className="form-control"
              required
            />
            {erroNome && <div className="text-danger">{erroNome}</div>}
            <br />
            <label>Logradouro:*</label>
            <input
              type="text"
              value={logradouro}
              onChange={handleLogradouroChange}
              className="form-control"
              required
            />
            {erroLogradouro && (
              <div className="text-danger">{erroLogradouro}</div>
            )}
            <br />
            <label>Número:* (Informe zero caso seja sem número)</label>
            <input
              type="number"
              step={1}
              min={0}
              value={numero}
              onChange={handleNumeroChange}
              className="form-control"
              required
            />
            {erroNumero && <div className="text-danger">{erroNumero}</div>}
            <br />
            <label>Bairro:</label>
            <input
              type="text"
              value={bairro}
              onChange={handleBairroChange}
              className="form-control"
            />
            <br />
            <label>Complemento:</label>
            <input
              type="text"
              value={bairro}
              onChange={handleComplementoChange}
              className="form-control"
            />
            <br />

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
