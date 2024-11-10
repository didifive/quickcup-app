import { useContext } from "react";
import { CarrinhoContext } from "../providers/carrinho-provider";

const useCarrinho = () => {
  const {
    carrinhoState,
    abreCarrinho,
    adicionaItem,
    atualizaQuantidadeItem,
    excluirItem,
  } = useContext(CarrinhoContext);

  return {
    carrinhoState,
    abreCarrinho,
    adicionaItem,
    atualizaQuantidadeItem,
    excluirItem,
  };
};

export default useCarrinho;
