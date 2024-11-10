import React, { useEffect } from "react";
import useQuickCup from "./hooks/quickcup-hooks";
import useCarrinho from "../hooks/carrinho-hooks";


const Home = () => {
  const { quickcupState, getEmpresa, enviarCliente, obterEnderecosCliente } =
    useQuickCup();

  const { carrinhoState } = useCarrinho();

  const clienteTeste = {
    nome: "Teste asdf sadf",
    email: "string",
    telefone: "11999998887",
  };

  useEffect(() => {
    getEmpresa();
    enviarCliente(clienteTeste);
  }, []); 


  return (
    <div className="container">
      <header className="py-5">
        <h1>Bem-vindo ao Meu Projeto React</h1>
      </header>
      <main>
        <p>
          Esta é a página inicial do seu projeto React. Use esta aplicação como
          ponto de partida para desenvolver suas funcionalidades incríveis!
        </p>
        {quickcupState.loading && <p>Loading...</p>}
        <p>Empresa: {JSON.stringify(quickcupState.empresa)}</p>
        <p>Cliente: {JSON.stringify(quickcupState.cliente)}</p>
        <p>Endereços: {JSON.stringify(quickcupState.enderecos)}</p>
        <p>Grupos: {JSON.stringify(quickcupState.grupos)}</p>
        <p>Produtos: {JSON.stringify(quickcupState.produtos)}</p>
        <p>Carrinho: {JSON.stringify(carrinhoState)}</p>
        <p>Carrinho Lenght: {JSON.stringify(carrinhoState.itemsCarrinho.length)}</p>
      </main>
    </div>
  );
};

export default App;
