import { useContext } from "react";
import { QuickCupContext } from "../providers/quickcup-provider";

const useQuickCup = () => {
  const { quickCupState, getQuickCupBasico, updateLoading } =
    useContext(QuickCupContext);

  return {
    quickCupState,
    getQuickCupBasico,
    updateLoading,
  };
};

export default useQuickCup;
