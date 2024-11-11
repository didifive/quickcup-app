import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useQuickCup from "./hooks/quickcup-hooks";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Fechado from "./pages/Fechado";
import Loading from "./components/Loading";
import Carrinho from "./pages/Carrinho";

const App = () => {
  const { quickcupState } = useQuickCup();

  return (
    <>
      {quickcupState.loading && <Loading />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/fechado" element={<Fechado />} />
          <Route path="/carrinho" element={<Carrinho />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;