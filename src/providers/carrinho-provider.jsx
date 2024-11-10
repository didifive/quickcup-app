import React, { createContext, useCallback, useState } from "react";
import apiQuickCup from "../services/quickcup-api";

export const CarrinhoContext = createContext();

const CarrinhoProvider = ({ children }) => {
    const [carrinhoState, setCarrinhoState] = useState(
      localStorage.getItem("carrinho") ? JSON.parse(localStorage.getItem("carrinho")) : 
          {
          clienteId: "",
          enderecoId: "",
          valorOriginal: 0,
          valorDesconto: 0,
          valorEntrega: 0,
          itensCarrinho: [],
        }
  );

    const abreCarrinho = (clienteId) => {
      if (!clienteId) {
        return;
      }

      setCarrinhoState((prevState) => ({
        ...prevState,
        clienteId: clienteId,
      }));

      localStorage.setItem("carrinho", JSON.stringify(carrinhoState));
    };

    const adicionaItem = (produto, quantidade) => {
      
      if (!produto || !quantidade) {
        return;
      }

      quantidade = parseInt(quantidade);
      if (quantidade <= 0) {
        return;      
      }
      
      const valorUnitarioOriginal = parseFloat(produto.valorOriginal).toFixed(2);
      const valorUnitarioDesconto = parseFloat(produto.valorDesconto).toFixed(2);
      const valorUnitario = parseFloat((produto.valorOriginal - produto.valorDesconto).toFixed(2));

      setCarrinhoState((prevState) => ({
        ...prevState,
        valorOriginal: prevState.valorOriginal + parseFloat(valorUnitarioOriginal * quantidade).toFixed(2),
        valorDesconto: prevState.valorOriginal + parseFloat(valorUnitarioDesconto * quantidade).toFixed(2),
        itensCarrinho : [
          ...prevState.itensCarrinho, 
          {
            produtoId: produto.id, 
            quantidade: quantidade,
            valorUnitarioOriginal: valorUnitarioOriginal,
            valorUnitarioDesconto: valorUnitarioDesconto,
            valorUnitario: valorUnitario
          }
      ]
      }));

      localStorage.setItem("carrinho", JSON.stringify(carrinhoState));
    };

    const atualizaQuantidadeItem = (produtoId, novaQuantidade) => {
      if (!produtoId || !novaQuantidade) {
        return;
      }

      novaQuantidade = parseInt(novaQuantidade);
      if (novaQuantidade <= 0) {
        excluiItem(produtoId);
        return;      
      }

      const prevState = carrinhoState;
      const item = prevState.itensCarrinho.find((item) => item.produtoId === produtoId);
      if (!item) {
        return;
      }
      const novoValorOriginal = 
        prevState.valorOriginal 
        - parseFloat(item.valorUnitarioOriginal * item.quantidade).toFixed(2) 
        + parseFloat(item.valorUnitarioOriginal * novaQuantidade).toFixed(2);
      const novoValorDesconto = 
        prevState.valorDesconto 
        - parseFloat(item.valorUnitarioDesconto * item.quantidade).toFixed(2) 
        + parseFloat(item.valorUnitarioDesconto * novaQuantidade).toFixed(2);

      setCarrinhoState((prevState) => ({
        ...prevState,
        valorOriginal: novoValorOriginal,
        valorDesconto: novoValorDesconto,
        itensCarrinho: prevState.itensCarrinho.map((item) => {
          if (item.produtoId === produtoId) {
            return {
              ...item,
              quantidade: novaQuantidade,
            };
          }
          return item;
        })
      }));

      localStorage.setItem("carrinho", JSON.stringify(carrinhoState));
    };

    const excluirItem = (produtoId) => {
      if (!produtoId) {
        return;
      }

      const prevState = carrinhoState;
      const item = prevState.itensCarrinho.find((item) => item.produtoId === produtoId);
      if (!item) {
        return;
      }
      const novoValorOriginal = 
        prevState.valorOriginal 
        - parseFloat(item.valorUnitarioOriginal * item.quantidade).toFixed(2);
      const novoValorDesconto = 
        prevState.valorDesconto 
        - parseFloat(item.valorUnitarioDesconto * item.quantidade).toFixed(2);

      setCarrinhoState((prevState) => ({
        ...prevState,
        valorOriginal: novoValorOriginal,
        valorDesconto: novoValorDesconto,
        itensCarrinho: prevState.itensCarrinho.filter((item) => item.produtoId !== produtoId)
      }));

      localStorage.setItem("carrinho", JSON.stringify(carrinhoState));
    };

  };

  const carrinho = {
    carrinhoState,
    getEmpresa: () => getEmpresa(),
    abreCarrinho: useCallback((clienteId) => enviarCliente(clienteId), []),
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

export default CarrinhoProvider;