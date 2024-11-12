import React, { createContext, useCallback, useEffect, useReducer } from "react";
import {
  ADICIONA_ITEM,
  ATUALIZA_QUANTIDADE,
  EXCLUIR_ITEM,
  LIMPAR_CARRINHO,
} from "../utils/carrinho-actions";
import { LOCAL_STORAGE_CARRINHO } from "../utils/storage-names";

export const CarrinhoContext = createContext({
  itens: [],
});

function carrinhoReducer(state, action) {
  switch (action.type) {
    case ADICIONA_ITEM: {
      return {
        ...state,
        itens: [...state.itens, action.payload],
      };
    }
    case ATUALIZA_QUANTIDADE: {
      return {
        ...state,
        itens: state.itens.map((item) => {
          if (item.produto.id === action.payload.produtoId) {
            return {
              ...item,
              quantidade: action.payload.quantidade,
            };
          }
          return item;
        }),
      };
    }
    case EXCLUIR_ITEM: {
      return {
        ...state,
        itens: state.itens.filter(
          (item) => item.produto.id !== action.payload.produtoId
        ),
      };
    }
    case LIMPAR_CARRINHO: {
      return {
        ...state,
        itens: [],
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

const carrinhoInitial = localStorage.getItem(LOCAL_STORAGE_CARRINHO)
  ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_CARRINHO))
  : {
      itens: [],
    };

const CarrinhoProvider = ({ children }) => {
    const [carrinhoState, dispatchCarrinho] = useReducer(carrinhoReducer, carrinhoInitial);

    useEffect(() => {
      localStorage.setItem(
        LOCAL_STORAGE_CARRINHO,
        JSON.stringify(carrinhoState)
      );
    }, [carrinhoState]);

    const adicionaItem = (produto, quantidade) => {
      if (!produto || !quantidade) {
        return;
      }

      quantidade = parseInt(quantidade);
      if (quantidade <= 0) {
        return;      
      }

      let itemEncontrado = null;
      for (let item of carrinhoState.itens) {
        if (item.produto.id === produto.id) {
          itemEncontrado = item;
          break;
        }
      }
      
      if (itemEncontrado) {
        quantidade += itemEncontrado.quantidade;
        console.log(quantidade);
        atualizaQuantidadeItem(produto.id, quantidade);
        return;
      }

      dispatchCarrinho({
        type: ADICIONA_ITEM,
        payload: {
            produto: produto, 
            quantidade: quantidade,
          }
      });

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

      dispatchCarrinho({
        type: ATUALIZA_QUANTIDADE,
        payload: {
          produtoId: produtoId,
          quantidade: novaQuantidade,
        },
      });
    };

    const excluirItem = (produtoId) => {
      if (!produtoId) {
        return;
      }

      dispatchCarrinho({
        type: EXCLUIR_ITEM,
        payload: {
            produtoId: produtoId
          }
      });
    };

    const limparCarrinho = () => {
      dispatchCarrinho({
        type: LIMPAR_CARRINHO,
      });
    };

    const carrinho = {
      carrinhoState,
      adicionaItem: useCallback(
        (produto, quantidade) => adicionaItem(produto, quantidade),
        []
      ),
      atualizaQuantidadeItem: useCallback(
        (produtoId, novaQuantidade) =>
          atualizaQuantidadeItem(produtoId, novaQuantidade),
        []
      ),
      excluirItem: useCallback((produtoId) => excluirItem(produtoId), []),
      limparCarrinho: useCallback(() => limparCarrinho(), []),
    };

    return (
      <CarrinhoContext.Provider value={ carrinho }>
        {children}
      </CarrinhoContext.Provider>
    );

};

export default CarrinhoProvider;