import React, { createContext, useCallback, useState } from "react";

export const CarrinhoContext = createContext({
  itens: [],
});

const CarrinhoProvider = ({ children }) => {
    const [carrinhoState, setCarrinhoState] = useState(
      {
        itens: [],
      }
    );

    const adicionaItem = (produto, quantidade) => {


      if (!produto || !quantidade) {
        return;
      }

      quantidade = parseInt(quantidade);
      if (quantidade <= 0) {
        return;      
      }

      if (carrinhoState.itens.some((item) => item.produtoId === produto.id)) {
        quantidade += carrinhoState.itens.find((item) => item.produtoId === produto.id).quantidade;
        atualizaQuantidadeItem(produto.id, quantidade);
        return;
      }

      setCarrinhoState((prevState) => ({
        ...prevState,
        itens : [
          ...prevState.itens, 
          {
            produto: produto, 
            quantidade: quantidade,
          }
      ]
      }));
    };

    const atualizaQuantidadeItem = (produtoId, novaQuantidade) => {
      if (!produtoId || !novaQuantidade) {
        return;
      }

      novaQuantidade = parseInt(novaQuantidade);
      if (novaQuantidade <= 0) {
        excluirItem(produtoId);
        return;      
      }

      setCarrinhoState((prevState) => ({
        ...prevState,
        itens: prevState.itens.map((item) => {
          if (item.produto.id === produtoId) {
            return {
              ...item,
              quantidade: novaQuantidade,
            };
          }
          return item;
        })
      }));
    };

    const excluirItem = (produtoId) => {
      if (!produtoId) {
        return;
      }

      setCarrinhoState((prevState) => ({
        ...prevState,
        itens: prevState.itens.filter((item) => item.produto.id !== produtoId)
      }));
    };

  const carrinho = {
    carrinhoState,
    adicionaItem: useCallback(
      (produto, quantidade) => adicionaItem(produto, quantidade),
      []
    ),
    atualizaQuantidadeItem: useCallback(
      (produtoId, novaQuantidade) => atualizaQuantidadeItem(produtoId, novaQuantidade),
      []
    ),
    excluirItem: useCallback((produtoId) => enviarCliente(produtoId), []),
  };

  return (
    <CarrinhoContext.Provider value={ carrinho }>
      {children}
    </CarrinhoContext.Provider>
  );

};

export default CarrinhoProvider;