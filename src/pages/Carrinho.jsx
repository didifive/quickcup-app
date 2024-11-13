import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useQuickCup from "../hooks/quickcup-hooks";
import useCliente from "../hooks/cliente-hooks";
import useCarrinho from "../hooks/carrinho-hooks";
import CarrinhoProdutos from "../components/Carrinho/CarrinhoProdutos";
import OpcoesEntrega from "../components/Carrinho/OpcoesEntrega";

const Carrinho = () => {
  const { quickCupState } = useQuickCup();
  const { clienteState } = useCliente();
  const { carrinhoState, limparCarrinho } = useCarrinho();

  const [frete, setFrete] = useState(0);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState("");
  const handleFreteChange = (event) => {
    setOpcaoSelecionada(event.target.value);
    setFrete(Number(event.target.value));
  };
  
  const navigate = useNavigate();

  const limparCarrinhoEDirecionaMenu = () => {
    limparCarrinho();
    navigate("/");
  };

  const temCliente = clienteState.cliente && Object.keys(clienteState.cliente).length > 0
   && clienteState.cliente.telefone !== "" && clienteState.cliente.nome !== "";

  const valorTotalProdutos = carrinhoState.itens.reduce(
    (total, item) => total + (item.produto.valorOriginal - item.produto.valorDesconto) * item.quantidade,
    0
  );

  return (
    <>
      <div className="container py-3 py-xl-0">
        <div className="row">
          <div className="d-flex flex-column col-md-8 col-xl-7 mx-auto text-xs">
            {temCliente ? (
              <>
                <p className="fs-2 fw-light">
                  Olá{" "}
                  <span className="fw-bold">{clienteState.cliente.nome}</span>,
                  bem-vindo, aqui está o seu carrinho. &nbsp;
                  <Link to="/cliente" className="fs-4">
                    Não sou eu.
                  </Link>
                </p>
              </>
            ) : (
              <h3 className="mt-3 display-6">Seu Carrinho</h3>
            )}

            {carrinhoState.itens && carrinhoState.itens.length === 0 ? (
              <p>Não há produtos no carrinho</p>
            ) : (
              <>
                <p className="display-4">Itens:</p>
                <div
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "15px",
                    margin: "0",
                    padding: "20px 10px",
                  }}
                >
                  <CarrinhoProdutos itens={carrinhoState.itens} />
                </div>
              </>
            )}
            {!temCliente ? (
              <Link to="/cliente" className="btn btn-primary my-3">
                Informar nome e telefone e continuar
              </Link>
            ) : (
              <>
                <hr />
                <p className="display-4">Entrega:</p>
                <OpcoesEntrega
                  opcaoSelecionada={opcaoSelecionada}
                  handleFreteChange={handleFreteChange}
                  frete={frete}
                />
                <hr />
                <div
                  className="d-flex flex-column my-3"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "15px",
                    margin: "0",
                    padding: "20px 10px",
                  }}
                >
                  <p className="fw-bold text-center display-6">
                    Total do Pedido: R${" "}
                    {(valorTotalProdutos + frete).toFixed(2).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                  <Link to="/pedido" className="btn btn-primary mt-1">
                    Fazer o pedido
                  </Link>
                </div>
              </>
            )}
            <hr />
            <Link to="/" className="btn btn-secondary my-3">
              Voltar para o Menu
            </Link>
            <button
              type="button"
              className="btn btn-outline-secondary my-3"
              onClick={() => limparCarrinhoEDirecionaMenu()}
            >
              Limpar carrinho
            </button>
          </div>
        </div>
      </div>
    </>
  );
};



export default Carrinho;
