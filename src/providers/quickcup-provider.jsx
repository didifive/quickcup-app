import React, { createContext, useCallback, useEffect, useRef, useReducer } from "react";
import apiQuickCup from "../services/quickcup-api";
import {
  GET_EMPRESA,
  GET_GRUPOS,
  GET_PRODUTOS,
  LOADING,
} from "../utils/quickcup-actions";
import { SESSION_STORAGE_QUICKCUP } from "../utils/storage-names";

export const QuickCupContext = createContext({
  loading: false,
  empresa: {},
  grupos: [],
  produtos: [],
});

function quickCupReducer(state, action) {
  switch (action.type) {
    case GET_EMPRESA: {
      return {
        ...state,
        empresa: action.payload,
      };
    }
    case GET_GRUPOS: {
      return {
        ...state,
        grupos: action.payload,
      };
    }
    case GET_PRODUTOS: {
      return {
        ...state,
        produtos: action.payload,
      };
    }
    case LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

const quickCupInitial = sessionStorage.getItem(SESSION_STORAGE_QUICKCUP)
  ? JSON.parse(sessionStorage.getItem(SESSION_STORAGE_QUICKCUP))
  : {
      loading: true,
      empresa: {},
      enderecos: [],
      produtos: [],
    };

const QuickCupProvider = ({ children }) => {
    const [quickCupState, dispatchQuickCup] = useReducer(
      quickCupReducer,
      quickCupInitial
    );
    const quickCupRef = useRef(quickCupState);

    useEffect(() => {
      sessionStorage.setItem(
        SESSION_STORAGE_QUICKCUP,
        JSON.stringify(quickCupState)
      );
      quickCupRef.current = quickCupState;
    }, [quickCupState]);

    const updateLoading = (loading) => {
      dispatchQuickCup({
        type: LOADING,
        payload: loading,
      });
    }

    const getQuickCupBasico = async () => {

      updateLoading(true);

      await obterEmpresa();
      await obterGrupos();
      await obterProdutosAtivos();

      updateLoading(false);

    }

    const obterEmpresa = async () => {
      try {
        const { data : empresa } = await apiQuickCup.get("/empresa");

        if (!empresa) {
          throw new Error("Erro no sistema, empresa não encontrada");
        }

        dispatchQuickCup({
          type: GET_EMPRESA,
          payload: empresa,
        });

      } catch (error) {
        throw new Error(error);
      }
    };

    const obterGrupos = async () => {
      try {
        const { data: grupos } = await apiQuickCup.get("/grupo");

        dispatchQuickCup({
          type: GET_GRUPOS,
          payload: grupos,
        });

      } catch (error) {
        throw new Error(error);
      }
    };

    const obterProdutosAtivos = async () => {
      try {
        const { data: produtos } = await apiQuickCup.get(
          "/produto/ativo"
        );
        dispatchQuickCup({
          type: GET_PRODUTOS,
          payload: produtos,
        });
      } catch (error) {
        throw new Error(error);
      }
    };

    const contextValue = {
      quickCupState,
      getQuickCupBasico: () => getQuickCupBasico(),
      updateLoading: useCallback(
        (loading) => updateLoading(loading),
        []
      ),
    };

    return (
      <QuickCupContext.Provider value={contextValue}>
        {children}
      </QuickCupContext.Provider>
    );
};

export default QuickCupProvider;