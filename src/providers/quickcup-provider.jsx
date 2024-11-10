import React, { createContext, useCallback, useState } from "react";
import apiQuickCup from "../services/quickcup-api";

export const QuickCupContext = createContext({
  loading: false,
  empresa: {},
  cliente: {},
  enderecos: [],
  grupos: [],
  produtos: [],
  pedidos: [],
  ultimoGetEmpresa: null,
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
          }
    );

    const getEmpresa = async () => {
      const minutosEmMilisegundos = 60000;
      const minimoEsperaEmMinutos = 1;
      const empresaPreenchida = Object.keys(quickcupState.empresa).length > 0;
      const agora = new Date();
      const ultimoGetEmpresa = quickcupState.ultimoGetEmpresa;

      if (
        empresaPreenchida &&
        ultimoGetEmpresa &&
        (agora - ultimoGetEmpresa) / minutosEmMilisegundos <
          minimoEsperaEmMinutos
      ) {
        return;
      }
      
      setQuickcupState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      try {
        const { data:empresa } = await apiQuickCup.get("/empresa");

        if (!empresa) {
          throw new Error("Erro no sistema, empresa não encontrada");
        }

        setQuickcupState((prevState) => ({
          ...prevState,
          loading: false,
          empresa: empresa,
          ultimoGetEmpresa: agora,
        }));
        
      } catch (error) {
        console.error(error);
        setQuickcupState((prevState) => ({
          ...prevState,
          loading: false,
          empresa: {},
          ultimoGetEmpresa: null,
        }));
      }

      sessionStorage.setItem("quickcup", JSON.stringify(quickcupState));
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
    };



  const contextValue = {
    quickcupState,
    getEmpresa: () => getEmpresa(),
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