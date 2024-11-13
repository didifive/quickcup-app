import React, { createContext, useCallback, useEffect, useRef, useReducer } from "react";
import useQuickCup from "../hooks/quickcup-hooks";
import apiQuickCup from "../services/quickcup-api";
import {
  GET_CLIENTE,
  GET_ENDERECOS,
  GET_PEDIDOS
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

        console.log(resposta);

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

    // const adicionarEndereco = async (endereco) => {
    //   if (!endereco) {
    //     return;
    //   }

    //   setQuickcupState((prevState) => ({
    //     ...prevState,
    //     loading: true,
    //   }));

    //   try {
    //     const {data : endereco} = await apiQuickCup.post("/endereco", endereco);

    //     setQuickcupState((prevState) => ({
    //       ...prevState,
    //       loading: false,
    //       enderecos: [...prevState.enderecos, endereco],
    //     }));
    //   } catch (error) {
    //     console.error(error);
    //     setQuickcupState((prevState) => ({
    //       ...prevState,
    //       loading: false,
    //     }));
    //   }

    // };

    // const atualizarEndereco = async (enderecoId, endereco) => {
    //   if (!enderecoId || !endereco) {
    //     return;
    //   }

    //   setQuickcupState((prevState) => ({
    //     ...prevState,
    //     loading: true,
    //   }));

    //   try {
    //     const { data: endereco } = await apiQuickCup.put(
    //       `/endereco/${enderecoId}`,
    //       endereco
    //     );

    //     setQuickcupState((prevState) => ({
    //       ...prevState,
    //       loading: false,
    //       enderecos: prevState.enderecos.map((enderecoExistente) => {
    //         if (enderecoExistente.id === enderecoId) {
    //           return endereco;
    //         }
    //         return enderecoExistente;
    //       }),
    //     }));
    //   } catch (error) {
    //     console.error(error);
    //     setQuickcupState((prevState) => ({
    //       ...prevState,
    //       loading: false,
    //     }));
    //   }

    // };

    // const removerEndereco = async (enderecoId) => {
    //   if (!enderecoId) {
    //     return;
    //   } 

    //   setQuickcupState((prevState) => ({
    //     ...prevState,
    //     loading: true,        
    //   }));

    //   try {        
    //     await apiQuickCup.delete(`/endereco/${enderecoId}`);

    //     setQuickcupState((prevState) => ({
    //       ...prevState,
    //       loading: false,
    //       enderecos: prevState.enderecos.filter(
    //         (enderecoExistente) => enderecoExistente.id !== enderecoId
    //       ),
    //     }));
    //   } catch (error) {
    //     console.error(error);
    //     setQuickcupState((prevState) => ({
    //       ...prevState,
    //       loading: false,
    //     }));
    //   }

    // };

    const contextValue = {
      clienteState,
      sendAndGetCliente: useCallback(
        (cliente) => sendAndGetCliente(cliente),
        []
      ),
      // adicionarEndereco: useCallback(
      //   (endereco) => adicionarEndereco(endereco),
      //   []
      // ),
      // atualizarEndereco: useCallback(
      //   (enderecoId, endereco) => atualizarEndereco(enderecoId, endereco),
      //   []
      // ),
      // removerEndereco: useCallback(
      //   (enderecoId) => removerEndereco(enderecoId),
      //   []
      // ),
    };

    return (
      <ClienteContext.Provider value={contextValue}>
        {children}
      </ClienteContext.Provider>
    );
};

export default ClienteProvider;