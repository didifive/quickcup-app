import React, { createContext, useCallback, useState } from "react";
import apiQuickCup from "../services/quickcup-api";
import { minutosEmMilisegundos, cacheEmMinutos } from "../utils/constants";

export const QuickCupContext = createContext({
  loading: false,
  empresa: {},
  cliente: {},
  enderecos: [],
  grupos: [],
  produtos: [],
  pedidos: [],
  ultimoGetBasico: null,
});


const QuickCupProvider = ({ children }) => {
    const [quickcupState, setQuickcupState] = useState(
      sessionStorage.getItem("quickcup")
        ? JSON.parse(sessionStorage.getItem("quickcup"))
        : {
            loading: false,
            empresa: {},
            cliente: {},
            enderecos: [],
            grupos: [],
            produtos: [],
            pedidos: [],
            ultimoGetEmpresa: null,
            ultimoGetGrupo: null,
            ultimoGetProduto: null,
          }
    );

    const getQuickCupBasico = async () => {
      const agora = new Date();
      const basicoPreenchido = 
          Object.keys(quickcupState.empresa).length > 0 
          && quickcupState.produtos.length > 0
          && quickcupState.grupos.length > 0;
      const ultimoGetBasico = quickcupState.ultimoGetBasico; 
      
      if (
         basicoPreenchido &&
         ultimoGetBasico &&
         (agora - ultimoGetBasico) / minutosEmMilisegundos < cacheEmMinutos
       ) {
         return;
       }

      setQuickcupState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      obterEmpresa();
      obterGrupos();
      obterProdutosAtivos();

      setQuickcupState((prevState) => ({
        ...prevState,
        loading: false,
        ultimoGetBasico: agora,
      }));

      if (!basicoPreenchido){
        setQuickcupState((prevState) => ({
          ...prevState,
          ultimoGetBasico: null,
        }));
      }

      sessionStorage.setItem("quickcup", JSON.stringify(quickcupState));
    }

    const obterEmpresa = async () => {
      try {
        const { data:empresa } = await apiQuickCup.get("/empresa");

        if (!empresa) {
          throw new Error("Erro no sistema, empresa não encontrada");
        }
        setQuickcupState((prevState) => ({
          ...prevState,
          empresa: empresa,
        }));
      } catch (error) {
        console.error(error);
        setQuickcupState((prevState) => ({
          ...prevState,
          empresa: {},
        }));
      }
    };

    const obterGrupos = async () => {
      try {
        const { data: grupos } = await apiQuickCup.get("/grupo");
        setQuickcupState((prevState) => ({
          ...prevState,
          grupos: grupos
        }));
      } catch (error) {
        console.error(error);
        setQuickcupState((prevState) => ({
          ...prevState,
          grupos: []
        }));
      }
    };

    const obterProdutosAtivos = async () => {
      try {
        const { data: produtos } = await apiQuickCup.get(
          "/produto/ativo"
        );
        setQuickcupState((prevState) => ({
          ...prevState,
          produtos: produtos
        }));
      } catch (error) {
        console.error(error);
        setQuickcupState((prevState) => ({
          ...prevState,
          produtos: []
        }));
      }
    };

    const enviarCliente = async (cliente) => {
      if (!cliente) {
        return;
      }
      
      setQuickcupState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      try {
        const resposta = await apiQuickCup.post("/cliente", cliente);

        if (resposta.status === 404) {
          throw new Error(resposta.data);
        }

        setQuickcupState((prevState) => ({
          ...prevState,
          loading: false,
          cliente: resposta.data
        }));

        obterEnderecosCliente(resposta.data.id);

      } catch (error) {
        console.error(error);
        setQuickcupState((prevState) => ({
          ...prevState,
          loading: false,
          cliente: {},
        }));
      }

      sessionStorage.setItem("quickcup", JSON.stringify(quickcupState));
    };

    const obterEnderecosCliente = async (clienteId) => {
      if (!clienteId) {
        return;
      }

      setQuickcupState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      try {
        const { data: enderecos } = await apiQuickCup.get(
          `/endereco/cliente/${clienteId}`
        );

        setQuickcupState((prevState) => ({
          ...prevState,
          loading: false,
          enderecos: enderecos,
        }));
      } catch (error) {
        console.error(error);
        setQuickcupState((prevState) => ({
          ...prevState,
          loading: false,
          enderecos: [],
        }));
      }

      sessionStorage.setItem("quickcup", JSON.stringify(quickcupState));
    };

    const adicionarEndereco = async (endereco) => {
      if (!endereco) {
        return;
      }

      setQuickcupState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      try {
        const {data : endereco} = await apiQuickCup.post("/endereco", endereco);

        setQuickcupState((prevState) => ({
          ...prevState,
          loading: false,
          enderecos: [...prevState.enderecos, endereco],
        }));
      } catch (error) {
        console.error(error);
        setQuickcupState((prevState) => ({
          ...prevState,
          loading: false,
        }));
      }

      sessionStorage.setItem("quickcup", JSON.stringify(quickcupState));
    };

    const atualizarEndereco = async (enderecoId, endereco) => {
      if (!enderecoId || !endereco) {
        return;
      }

      setQuickcupState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      try {
        const { data: endereco } = await apiQuickCup.put(
          `/endereco/${enderecoId}`,
          endereco
        );

        setQuickcupState((prevState) => ({
          ...prevState,
          loading: false,
          enderecos: prevState.enderecos.map((enderecoExistente) => {
            if (enderecoExistente.id === enderecoId) {
              return endereco;
            }
            return enderecoExistente;
          }),
        }));
      } catch (error) {
        console.error(error);
        setQuickcupState((prevState) => ({
          ...prevState,
          loading: false,
        }));
      }

      sessionStorage.setItem("quickcup", JSON.stringify(quickcupState));
    };

    const removerEndereco = async (enderecoId) => {
      if (!enderecoId) {
        return;
      } 

      setQuickcupState((prevState) => ({
        ...prevState,
        loading: true,        
      }));

      try {        
        await apiQuickCup.delete(`/endereco/${enderecoId}`);

        setQuickcupState((prevState) => ({
          ...prevState,
          loading: false,
          enderecos: prevState.enderecos.filter(
            (enderecoExistente) => enderecoExistente.id !== enderecoId
          ),
        }));
      } catch (error) {
        console.error(error);
        setQuickcupState((prevState) => ({
          ...prevState,
          loading: false,
        }));
      }

      sessionStorage.setItem("quickcup", JSON.stringify(quickcupState));
    };




    const contextValue = {
      quickcupState,
      getQuickCupBasico: () => getQuickCupBasico(),
      enviarCliente: useCallback((cliente) => enviarCliente(cliente), []),
      obterEnderecosCliente: useCallback(
        (clienteId) => obterEnderecosCliente(clienteId),
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
      <QuickCupContext.Provider value={contextValue}>
        {children}
      </QuickCupContext.Provider>
    );
};

export default QuickCupProvider;