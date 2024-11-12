import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useQuickCup from "./hooks/quickcup-hooks";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Fechado from "./pages/Fechado";
import Loading from "./components/Loading";
import Carrinho from "./pages/Carrinho";
import Layout from "./components/Layout";

const App = () => {
  const { quickcupState } = useQuickCup();

  return (
    <>
      {quickcupState.loading && <Loading />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Menu />} />
            <Route path="carrinho" element={<Carrinho />} />
          </Route>
          <Route path="fechado" element={<Fechado />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;