import React from "react";
import AppWrapper from "./App";
import QuickCupProvider from "../providers/quickcup-provider";
import CarrinhoProvider from "../providers/carrinho-provider";
import ClienteProvider from "../providers/cliente-provider";

const Providers = () => {
  return (
    <QuickCupProvider>
      <ClienteProvider>
        <CarrinhoProvider>
          <AppWrapper />
        </CarrinhoProvider>
      </ClienteProvider>
    </QuickCupProvider>
  );
};

export default Providers;