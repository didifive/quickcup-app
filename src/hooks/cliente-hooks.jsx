import { useContext } from "react";
import { ClienteContext } from "../providers/cliente-provider";

const useCliente = () => {
  const {
    clienteState,
    sendAndGetCliente,
    adicionarEndereco,
    atualizarEndereco,
    removerEndereco,
  } = useContext(ClienteContext);

  return {
    clienteState,
    sendAndGetCliente,
    adicionarEndereco,
    atualizarEndereco,
    removerEndereco,
  };
};

export default useCliente;
