import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useCliente from "../hooks/cliente-hooks";

const Endereco = () => {
  const { clienteState, adicionarEndereco, atualizarEndereco } = useCliente();

  const { id } = useParams();

  const navigate = useNavigate();

  let enderecoEncontrado = {};
  for (let i = 0; i < clienteState.enderecos.length; i++) { 
    if (clienteState.enderecos[i].id === Number(id)) { 
      enderecoEncontrado = clienteState.enderecos[i];
      break; 
    }
  }

  const nomeInicial = enderecoEncontrado.nome;
  const logradouroInicial = enderecoEncontrado.logradouro;
  const numeroInicial = enderecoEncontrado.numero;
  const complementoInicial = enderecoEncontrado.complemento;
  const bairroInicial = enderecoEncontrado.bairro;

  const [nome, setNome] = useState(nomeInicial);
  const [logradouro, setLogradouro] = useState(logradouroInicial);
  const [numero, setNumero] = useState(numeroInicial);
  const [complemento, setComplemento] = useState(complementoInicial);
  const [bairro, setBairro] = useState(bairroInicial);
  const [erroNome, setErroNome] = useState(null);
  const [erroLogradouro, setErroLogradouro] = useState(null);
  const [erroNumero, setErroNumero] = useState(null);

  const handleNomeChange = (event) => {
    setNome(event.target.value);
    setErroNome(null);    
  };

  const handleLogradouroChange = (event) => {
    setLogradouro(event.target.value);
    setErroLogradouro(null);
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

    if(envia) {
      const endereco = {
        clienteId: clienteState.cliente.id,
        nome: nome,
        logradouro: logradouro,
        numero: Number(numero),
        complemento: complemento,
        bairro: bairro,
        cidade: "Orlândia",
        estado: "SP",
        cep: "14620000",
        longitude: 0,
        latitude: 0,
      }; 

      if (id) {
        atualizarEndereco(id, endereco);
      } else {
        adicionarEndereco(endereco);
      }

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
              value={complemento}
              onChange={handleComplementoChange}
              className="form-control"
            />
            <br />

            <label>Cidade:</label>
            <input
              type="text"
              value="Orlândia"
              className="form-control"
              disabled
            />
            <br />
            <label>Estado:</label>
            <input
              type="text"
              value="SP"
              className="form-control"
              disabled
            />
            <br />
            <label>CEP:</label>
            <input
              type="text"
              value="14.620-000"
              className="form-control"
              disabled
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

export default Endereco;