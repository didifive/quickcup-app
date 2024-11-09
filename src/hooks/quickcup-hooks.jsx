import { useContext } from "react";
import { QuickCupContext } from "../providers/quickcup-provider";

const useQuickCup = () => {
  const { quickcupState, getEmpresa, enviarCliente } = useContext(QuickCupContext);

  return { quickcupState, getEmpresa, enviarCliente };
};

export default useQuickCup;
