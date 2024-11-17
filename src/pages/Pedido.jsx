import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useCliente from "../hooks/cliente-hooks";
import PedidoStatus from "../components/Pedido/PedidoStatus";
import PedidoProdutos from "../components/Pedido/PedidoProdutos";

const formaPagamentoMap = {
  DINHEIRO: "Dinheiro",
  CARTAO_CREDITO: "Cartão de crédito",
  CARTAO_DEBITO: "Cartão de débito",
  PIX: "PIX",
};

const formataData = (date) => {
  const data = new Date(date);
  return data.toLocaleString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).replace(",", " às ");
};

const ListaPedidos = () => {
  const { clienteState, atualizarPedidos } = useCliente();

  const { id } = useParams();

  useEffect(() => {
    const intervalId = setInterval(() => {
      atualizarPedidos();
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [atualizarPedidos]);

  const pedido = clienteState.pedidos.find((p) => p.id === Number(id));

  const valorDosItens = (pedido) => pedido.itens.reduce((total, item) => {
    return (
      total +
      item.quantidade *
        (item.valorUnitarioOriginal - item.valorUnitarioDesconto)
    );
  }, 0);

  return (
    <div className="container mb-5 py-3 py-xl-0">
      <div className="row">
        <div className="col col mx-auto d-flex flex-column">
          {!pedido && (
            <p className="fs-4 fw-light">Nenhum pedido encontrado.</p>
          )}
          {pedido && (
            <>
              <p className="display-6">Pedido #{pedido.id}</p>
              <p className="fs-2 fw-light">
                Olá <span className="fw-bold">{clienteState.cliente.nome}</span>
                , bem-vindo, abaixo está o detalhe do seu pedido. &nbsp;
                <Link to="/cliente/from-pedidos" className="fs-4">
                  Não sou eu.
                </Link>
              </p>
              <p className="fw-light text-muted text-truncate">
                Pedido feito em: {formataData(pedido.dataHoraPedido)}
              </p>
              <PedidoStatus pedido={pedido} />
              <hr />
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "15px",
                  margin: "0",
                  padding: "20px 10px",
                }}
              >
                <PedidoProdutos itens={pedido.itens} />
                <p className="fs-4">
                  Total itens:{" "}
                  {valorDosItens(pedido).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
              <hr />
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "15px",
                  margin: "0",
                  padding: "20px 10px",
                }}
              >
                {pedido.retira ? (
                  <p className="fs-4">
                    Pedido com opção para <strong>retirada na loja</strong>.
                  </p>
                ) : (
                  <p className="fs-4">
                    Entrega para: <strong>{pedido.endereco}</strong> <br />
                    Valor da entrega:{" "}
                    <strong>
                      {pedido.valorEntrega.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </strong>
                  </p>
                )}
              </div>
              <hr />
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "15px",
                  margin: "0",
                  padding: "20px 10px",
                }}
              >
                <p className="fs-4">
                  Total do Pedido:{" "}
                  <strong>
                    {(
                      valorDosItens(pedido) + pedido.valorEntrega
                    ).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>
                </p>

                <p className="fs-4">
                  Forma de Pagamento:{" "}
                  <strong>{formaPagamentoMap[pedido.formaPagamento]}</strong>
                </p>
                <p className="fs-4">
                  Observações: <strong>{pedido.observacoes}</strong>
                </p>
              </div>
            </>
          )}
          <Link to="/pedido" className="btn btn-secondary my-3">
            Voltar para a Lista de Pedidos
          </Link>
          <Link to="/" className="btn btn-outline-secondary my-3">
            Ir para o Menu
          </Link>
        </div>
      </div>
    </div>
  );
};


export default ListaPedidos;