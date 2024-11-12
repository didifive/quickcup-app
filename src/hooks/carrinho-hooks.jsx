import { useContext } from "react";
import { CarrinhoContext } from "../providers/carrinho-provider";

const useCarrinho = () => {
  const {
    carrinhoState,
    adicionaItem,
    atualizaQuantidadeItem,
    excluirItem,
    limparCarrinho,
  } = useContext(CarrinhoContext);

  return {
    carrinhoState,
    adicionaItem,
    atualizaQuantidadeItem,
    excluirItem,
    limparCarrinho,
  };
};

export default useCarrinho;
