import React from "react";
import Home from "./Home";
import QuickCupProvider from "./providers/quickcup-provider";

const Providers = () => {
  return (
    <QuickCupProvider>
      <Home />
    </QuickCupProvider>
  );
};

export default Providers;