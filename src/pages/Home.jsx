import React, { useEffect } from "react";
import useQuickCup from "../hooks/quickcup-hooks";
import useCarrinho from "../hooks/carrinho-hooks";

const Home = () => {
  const {
    quickcupState,
    getQuickCupBasico,
    enviarCliente,
    obterEnderecosCliente,
  } = useQuickCup();

  const { carrinhoState } = useCarrinho();

  const clienteTeste = {
    nome: "João da Silva",
    email: "joao.silva@example.com",
    telefone: "11987654321",
  };

  useEffect(() => {
    getQuickCupBasico();
    enviarCliente(clienteTeste);
    obterEnderecosCliente(quickcupState.cliente.id);
  }, []); 

  return (
        <div className="container">
          <header className="py-5">
            <h1>Bem-vindo ao Meu Projeto React</h1>
          </header>
          <main>
            <p>
              Esta é a página inicial do seu projeto React. Use esta aplicação
              como ponto de partida para desenvolver suas funcionalidades
              incríveis!
            </p>
            <p>Empresa: {JSON.stringify(quickcupState.empresa)}</p>
            <p>Cliente: {JSON.stringify(quickcupState.cliente)}</p>
            <p>Endereços: {JSON.stringify(quickcupState.enderecos)}</p>
            <p>Grupos: {JSON.stringify(quickcupState.grupos)}</p>
            <p>Produtos: {JSON.stringify(quickcupState.produtos)}</p>
            <p>Pedidos: {JSON.stringify(quickcupState.pedidos)}</p>
            <p>Carrinho: {JSON.stringify(carrinhoState)}</p>
            <p>
              Quantidade de Itens no carrinho:{" "}
              {carrinhoState.itensCarrinho.length}
            </p>
          </main>
        </div>
  );
};

export default Home;
