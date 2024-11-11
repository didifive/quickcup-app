import { useContext } from "react";
import { CarrinhoContext } from "../providers/carrinho-provider";

const useCarrinho = () => {
  const {
    carrinhoState,
    adicionaItem,
    atualizaQuantidadeItem,
    excluirItem,
  } = useContext(CarrinhoContext);

  return {
    carrinhoState,
    adicionaItem,
    atualizaQuantidadeItem,
    excluirItem,
  };
};

export default useCarrinho;
