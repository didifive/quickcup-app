import React from "react";
import App from "./App";
import QuickCupProvider from "./providers/quickcup-provider";
import CarrinhoProvider from "./providers/carrinho-provider";

const Providers = () => {
  return (
    <QuickCupProvider>
      <CarrinhoProvider>
        <App />
      </CarrinhoProvider>
    </QuickCupProvider>
  );
};

export default Providers;