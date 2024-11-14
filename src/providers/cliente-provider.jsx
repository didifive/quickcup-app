import React, { createContext, useCallback, useEffect, useRef, useReducer } from "react";
import useQuickCup from "../hooks/quickcup-hooks";
import apiQuickCup from "../services/quickcup-api";
import {
  GET_CLIENTE,
  GET_ENDERECOS,
  GET_PEDIDOS,
  ADICIONA_ENDERECO, 
  ATUALIZA_ENDERECO, 
  EXCLUI_ENDERECO,
} from "../utils/cliente-actions";
import { SESSION_STORAGE_CLIENTE } from "../utils/storage-names";

export const ClienteContext = createContext({
  cliente: {},
  enderecos: [],
  pedidos: [],
});

function clienteReducer(state, action) {
  switch (action.type) {
    case GET_CLIENTE: {
      return {
        ...state,
        cliente: action.payload,
      };
    }
    case GET_ENDERECOS: {
      return {
        ...state,
        enderecos: action.payload,
      };
    }
    case GET_PEDIDOS: {
      return {
        ...state,
        pedidos: action.payload,
      };
    }
    case ADICIONA_ENDERECO: {
      return {
        ...state,
        enderecos: [...state.enderecos, action.payload],
      };
    }
    case ATUALIZA_ENDERECO: {
      return {
        ...state,
        enderecos: state.enderecos.map((endereco) => {
          if (endereco.id === action.payload.id) {
            return {
              ...action.payload,
            };
          }
          return endereco;
        }),
      };
    }
    case EXCLUI_ENDERECO: {
      return {
        ...state,
        enderecos: state.enderecos.filter(
          (endereco) => endereco.id !== action.payload
        ),
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

const clienteInitial = sessionStorage.getItem(SESSION_STORAGE_CLIENTE)
  ? JSON.parse(sessionStorage.getItem(SESSION_STORAGE_CLIENTE))
  : {
      cliente: {},
      enderecos: [],
      pedidos: [],
    };

const ClienteProvider = ({ children }) => {
    const { updateLoading } = useQuickCup();

    const [clienteState, dispatchCliente] = useReducer(
      clienteReducer,
      clienteInitial
    );

    const clienteRef = useRef(clienteState);

    useEffect(() => {
      sessionStorage.setItem(
        SESSION_STORAGE_CLIENTE,
        JSON.stringify(clienteState)
      );
      clienteRef.current = clienteState;
    }, [clienteState]);

    const sendAndGetCliente = async (cliente) => {
      if (!cliente || !Object.keys(cliente).length || !cliente.telefone || !cliente.nome) {
        return;
      }
      
      updateLoading(true);

      try {
        const resposta = await apiQuickCup.post("/cliente", cliente);

        if (resposta.status !== 200) {
          throw new Error(resposta);
        }

        const clienteResposta = resposta.data;

        dispatchCliente({
          type: GET_CLIENTE,
          payload: clienteResposta,
        });

        await obterEnderecos(clienteResposta.id);
        await obterPedidos(clienteResposta.id);

      } catch (error) {
        throw new Error(error);
      }

      updateLoading(false);

    };

    const obterEnderecos = async (clienteId) => {
      if (!clienteId) {
        return;
      }

      try {
        const { data: enderecos } = await apiQuickCup.get(
          `/endereco/cliente/${clienteId}`
        );

        dispatchCliente({
          type: GET_ENDERECOS,
          payload: enderecos,
        });

      } catch (error) {
        throw new Error(error);
      }

    };

    const obterPedidos = async (clienteId) => {
      if (!clienteId) {
        return;
      }

      try {
        const { data: pedidos } = await apiQuickCup.get(
          `/pedido/cliente/${clienteId}`
        );

        dispatchCliente({
          type: GET_PEDIDOS,
          payload: pedidos,
        });
      } catch (error) {
        throw new Error(error);
      }
    };

    const adicionarEndereco = async (endereco) => {
      if (!endereco || Object.keys(endereco) === 0) {
        return;
      }

      updateLoading(true);

      try {
        const {data : enderecoNovo} = await apiQuickCup.post("/endereco", endereco);

        dispatchCliente({
          type: ADICIONA_ENDERECO,
          payload: enderecoNovo,
        });
      } catch (error) {
        throw new Error(error);
      }

      updateLoading(false);

    };

    const atualizarEndereco = async (enderecoId, endereco) => {
      if (!enderecoId || !endereco || Object.keys(endereco) === 0) {
        return;
      }

      console.log(endereco);
      console.log(enderecoId);
      updateLoading(true);

      try {
        const { data : enderecoAtualizado } = await apiQuickCup.put(
          `/endereco/${enderecoId}`,
          endereco
        );

        dispatchCliente({
          type: ATUALIZA_ENDERECO,
          payload: enderecoAtualizado,
        });
      } catch (error) {
        throw new Error(error);
      }

      updateLoading(false);

    };

    const removerEndereco = async (enderecoId) => {
      if (!enderecoId) {
        return;
      } 

      updateLoading(true);

      try {        
        const resposta = await apiQuickCup.delete(`/endereco/${enderecoId}`);

        if (resposta.status !== 204) {
          return;
        }

        dispatchCliente({
          type: EXCLUI_ENDERECO,
          payload: enderecoId,
        });

      } catch (error) {
        throw new Error(error);
      }

      updateLoading(false);

    };

    const contextValue = {
      clienteState,
      sendAndGetCliente: useCallback(
        (cliente) => sendAndGetCliente(cliente),
        []
      ),
      adicionarEndereco: useCallback(
        (endereco) => adicionarEndereco(endereco),
        []
      ),
      atualizarEndereco: useCallback(
        (enderecoId, endereco) => atualizarEndereco(enderecoId, endereco),
        []
      ),
      removerEndereco: useCallback(
        (enderecoId) => removerEndereco(enderecoId),
        []
      ),
    };

    return (
      <ClienteContext.Provider value={contextValue}>
        {children}
      </ClienteContext.Provider>
    );
};

export default ClienteProvider;