import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCliente from "../hooks/cliente-hooks";
import useQuickCup from "../hooks/quickcup-hooks";

const statusPedidoMap = {
  NOVO: { label: "Novo", color: "bg-primary" },
  CONFIRMADO: { label: "Confirmado", color: "bg-success" },
  CANCELADO: { label: "Cancelado", color: "bg-danger" },
  EM_PREPARO: { label: "Em preparo", color: "bg-warning" },
  EM_ENTREGA: { label: "Em entrega", color: "bg-info" },
  FINALIZADO: { label: "Finalizado", color: "bg-secondary" },
};

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
  const { clienteState } = useCliente();
  const { quickCupState } = useQuickCup();

  const produtosTexto = (pedido) => pedido.itens.map((item, index) => {
    const produto = quickCupState.produtos.find((p) => p.id === item.produtoId);
    return `${item.quantidade}x ${produto.nome}`;
  });
  const produtosTextoFinal = (pedido) => produtosTexto(pedido).join("; ");

  const valorDosItens = (pedido) => pedido.itens.reduce((total, item) => {
    return (
      total +
      item.quantidade *
        (item.valorUnitarioOriginal - item.valorUnitarioDesconto)
    );
  }, 0);

  return (
    <>
      <div className="container mb-5 py-3 py-xl-0">
        <div className="row">
          <div className="col-md-8 col-xl-7 mx-auto d-flex flex-column">
            <p className="display-6">Pedidos</p>
            <p className="fs-2 fw-light">
              Olá <span className="fw-bold">{clienteState.cliente.nome}</span>,
              bem-vindo, abaixo está o seu histórico de pedidos. &nbsp;
              <Link to="/cliente/from-pedidos" className="fs-4">
                Não sou eu.
              </Link>
            </p>
            {!clienteState.pedidos.length && (
              <p className="fs-4 fw-light">Nenhum pedido encontrado.</p>
            )}
            {clienteState.pedidos.length > 0 && (
              <>
                {clienteState.pedidos.map((pedido, index) => (
                  <>
                    <div
                      key={index}
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "15px",
                        margin: "0",
                        padding: "20px 10px",
                      }}
                    >
                      <div className="row">
                        <div className="col d-flex flex-column">
                          <div className="d-flex">
                            <h3 className="fs-4">Pedido #{pedido.id}</h3>
                            <p className="ms-3 fw-light text-muted text-truncate">
                              Feito em: {formataData(pedido.dataHoraPedido)}
                            </p>
                          </div>

                          <span
                            className={`badge ${
                              statusPedidoMap[pedido.status].color
                            } mx-1`}
                          >
                            {statusPedidoMap[pedido.status].label ||
                              pedido.status}
                          </span>
                          <p className="fw-light text-muted text-truncate mb-1">
                            Total itens: {valorDosItens(pedido).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}{" - "}
                            {produtosTextoFinal(pedido)}
                          </p>
                          {pedido.retira ? (
                            <p className="fw-light text-muted text-truncate mb-1">
                              Para retirar.
                            </p>
                          ) : (
                            <p className="fw-light text-muted text-truncate mb-1">
                              Entrega:{" "}
                              {pedido.valorEntrega.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}{" "}
                              - para: {pedido.endereco}
                            </p>
                          )}
                          <p className="mb-1">
                            Total do Pedido:
                            {(
                              valorDosItens(pedido) + pedido.valorEntrega
                            ).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </p>
                          <p className="fw-light text-muted text-truncate mb-1">
                            Forma de Pagamento:{" "}
                            {formaPagamentoMap[pedido.formaPagamento]}
                          </p>
                          <p className="fw-light text-muted text-truncate mb-1">
                            Observações: {pedido.observacoes}
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </>
                ))}
              </>
            )}
            <Link to="/" className="btn btn-secondary my-3">
              Voltar para o Menu
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};


export default ListaPedidos;