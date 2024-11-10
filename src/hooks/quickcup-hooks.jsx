import { useContext } from "react";
import { QuickCupContext } from "../providers/quickcup-provider";

const useQuickCup = () => {
  const {
    quickcupState,
    getEmpresa,
    enviarCliente,
    obterEnderecosCliente,
    adicionarEndereco,
    atualizarEndereco,
    removerEndereco,
  } = useContext(QuickCupContext);

  return { 
    quickcupState, 
    getEmpresa, 
    enviarCliente, 
    obterEnderecosCliente,
    adicionarEndereco,
    atualizarEndereco,
    removerEndereco,
  };
};

export default useQuickCup;
