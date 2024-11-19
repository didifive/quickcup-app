import React from "react";

const statusPedidoMap = {
  NOVO: { label: "Novo", color: "bg-primary" },
  CONFIRMADO: { label: "Confirmado", color: "bg-success" },
  CANCELADO: { label: "Cancelado", color: "bg-danger" },
  EM_PREPARO: { label: "Em preparo", color: "bg-warning" },
  EM_ENTREGA: { label: "Em entrega", color: "bg-info" },
  FINALIZADO: { label: "Finalizado", color: "bg-secondary" },
};

const PedidoStatus = ({ pedido }) => {
  const etapasPedido = [
    { status: "CONFIRMADO", label: "Pedido Confirmado" },
    { status: "EM_PREPARO", label: "Pedido Em Preparo" },
    { status: "EM_ENTREGA", label: "Pedido Para Entrega" },
    { status: "FINALIZADO", label: "Pedido Finalizado" },
  ];

  if (pedido.status === "NOVO") {
    return (
        <span className={`badge ${statusPedidoMap[pedido.status].color}`}>
          {statusPedidoMap[pedido.status].label}
        </span>
    );
  } else if (pedido.status === "CANCELADO") {
    return (
      <span className={`badge ${statusPedidoMap[pedido.status].color}`}>
        {statusPedidoMap[pedido.status].label}
      </span>
    );
  } else {
    return (
      <>
        {etapasPedido.map((etapa, index) => {
          const className =
            pedido.status === etapa.status
              ? `badge ${statusPedidoMap[pedido.status].color}`
              : index <
                etapasPedido.findIndex((e) => e.status === pedido.status)
              ? "badge bg-light text-dark"
              : "badge text-dark text-muted fw-light";

          return (
            <span key={index} className={className}>
              {etapa.label}
            </span>
          );
        })}
      </>
    );
  }
};

export default PedidoStatus;
