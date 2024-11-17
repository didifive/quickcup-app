import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useQuickCup from "../hooks/quickcup-hooks";
import useCliente from "../hooks/cliente-hooks";
import useCarrinho from "../hooks/carrinho-hooks";
import CarrinhoProdutos from "../components/Carrinho/CarrinhoProdutos";
import OpcoesEntrega from "../components/Carrinho/OpcoesEntrega";

const Carrinho = () => {
  const { quickCupState } = useQuickCup();
  const { clienteState, fazerNovoPedido } = useCliente();
  const { carrinhoState, limparCarrinho } = useCarrinho();

  const [frete, setFrete] = useState(0);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState("");
  const [opcaoSelecionadaErro, setOpcaoSelecionadaErro] = useState(null);
  const [metodoPagamento, setMetodoPagamento] = useState("DEFAULT");
  const [metodoPagamentoErro, setMetodoPagamentoErro] =
    useState(null);
  const [observacao, setObservacao] = useState("");
  const [valorParaPagar, setValorParaPagar] = useState(0);

  const navigate = useNavigate();

  const SELECIONE_OPCAO_ENTREGA_MESSAGE = "Selecione uma opção de entrega";
  const SELECIONE_OPCAO_PAGAMENTO_MESSAGE = "Selecione uma opção de pagamento";



  const handleFreteChange = (event) => {
    setOpcaoSelecionada(event.target.value);
    if (Number(event.target.value) === 0) {
      setFrete(Number(0));
      return;
    }
    setFrete(quickCupState.empresa.valorEntrega);
  };
  


  const fazerPedido = () => {
    if (!opcaoSelecionada) {
      setOpcaoSelecionadaErro(SELECIONE_OPCAO_ENTREGA_MESSAGE);
      alert(SELECIONE_OPCAO_ENTREGA_MESSAGE);
      return;
    }

    if (metodoPagamento === "DEFAULT") {
      setMetodoPagamentoErro(SELECIONE_OPCAO_PAGAMENTO_MESSAGE);
      alert(SELECIONE_OPCAO_PAGAMENTO_MESSAGE);
      return;
    }

    if (!carrinhoState.itens.length) {
      alert("O carrinho está vazio!");
      return;
    }

    const enderecoSelecionado = clienteState.enderecos.find(
      (endereco) => endereco.id === Number(opcaoSelecionada)
    );

    const enderecoFormatado =
      opcaoSelecionada === '0'
        ? ''
        : `${enderecoSelecionado.logradouro}, ${enderecoSelecionado.numero}${
            enderecoSelecionado.complemento
              ? ' - ' + enderecoSelecionado.complemento
              : ''
          }${
            enderecoSelecionado.bairro ? ' - ' + enderecoSelecionado.bairro : ''
          }`;

    const isPagamentoDinheiroEValorParaPagar = metodoPagamento === "DINHEIRO" && valorParaPagar > 0;
    const observacoesFormatadas = isPagamentoDinheiroEValorParaPagar
      ? `Troco para ${valorParaPagar.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}. ${observacao}`
      : observacao;

    const itensDoPedido = carrinhoState.itens.map((item) => ({
      produtoId: item.produto.id,
      quantidade: item.quantidade,
      valorUnitarioOriginal: item.produto.valorOriginal,
      valorUnitarioDesconto: item.produto.valorDesconto,
    }));

    const pedido = {
      clienteId: clienteState.cliente.id,
      valorEntrega: frete,
      retira: opcaoSelecionada === "0",
      endereco: enderecoFormatado,
      formaPagamento: metodoPagamento,
      observacoes: observacoesFormatadas,
      itens: itensDoPedido,
    };

    fazerNovoPedido(pedido);

    limparCarrinho();

    navigate("/pedido");
  };

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
                Informar nome e telefone para continuar
              </Link>
            ) : (
              <>
                <hr />
                <p className="display-4">Entrega:</p>
                <div
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "15px",
                    margin: "0",
                    padding: "20px 10px",
                  }}
                >
                  {opcaoSelecionadaErro && (
                    <div className="text-danger">{opcaoSelecionadaErro}</div>
                  )}
                  <OpcoesEntrega
                    empresa={quickCupState.empresa}
                    enderecos={clienteState.enderecos}
                    opcaoSelecionada={opcaoSelecionada}
                    handleFreteChange={handleFreteChange}
                    frete={frete}
                  />
                </div>
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
                  <p className="fw-bold text-center display-6 py-2">
                    Total do Pedido: R${" "}
                    {(valorTotalProdutos + frete)
                      .toFixed(2)
                      .toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                  </p>
                  <div className="form-group">
                    <select
                      className="form-control"
                      value={metodoPagamento}
                      onChange={(e) => setMetodoPagamento(e.target.value)}
                    >
                      <option value="DEFAULT">
                        Escolha um método de pagamento:{" "}
                      </option>
                      <option value="DINHEIRO">Dinheiro</option>
                      <option value="CARTAO_CREDITO">Cartão de Crédito</option>
                      <option value="CARTAO_DEBITO">Cartão de Débito</option>
                      <option value="PIX">Pix</option>
                    </select>
                    {metodoPagamentoErro && (
                      <div className="text-danger">{metodoPagamentoErro}</div>
                    )}
                    {metodoPagamento === "DINHEIRO" && (
                      <div className="form-group mt-2">
                        <label>
                          Quantos reais vai usar para pagar em dinheiro?
                        </label>
                        <small> Ex: 100, 200, etc.</small>
                        <div className="input-group">
                          <span className="input-group-text">R$</span>
                          <input
                            type="number"
                            min={0}
                            step={0.01}
                            className="form-control"
                            value={valorParaPagar}
                            onChange={(e) => setValorParaPagar(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="form-group mt-2">
                    <label>Observação para o pedido:</label>
                    <textarea
                      className="form-control"
                      value={observacao}
                      placeholder="Deixe sua observação ou recado aqui."
                      onChange={(e) => setObservacao(e.target.value)}
                      rows="3"
                    ></textarea>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary my-3"
                    onClick={() => fazerPedido()}
                  >
                    Fazer o pedido
                  </button>
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
              Esvaziar carrinho
            </button>
          </div>
        </div>
      </div>
    </>
  );
};



export default Carrinho;
