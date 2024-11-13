import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import useQuickCup from "../hooks/quickcup-hooks";

import Menu from "../pages/Menu";
import Fechado from "../pages/Fechado";
import Loading from "./Loading";
import Carrinho from "../pages/Carrinho";
import Layout from "../pages/Layout";
import Cliente from "../pages/Cliente";

const App = () => {
  
  const { quickCupState, getQuickCupBasico } = useQuickCup();
  const navigate = useNavigate();

  useEffect(() => {
    getQuickCupBasico();
  }, []); 

  useEffect(() => {
    if (!quickCupState.empresa.aberto) {
      navigate("/fechado");
    } else if (window.location.pathname === "/fechado") {
      navigate("/");
    }
  }, [quickCupState]);

  return (
    <>
      {quickCupState.loading && <Loading />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Menu />} />
          <Route path="carrinho" element={<Carrinho />} />
          <Route path="cliente" element={<Cliente />} />
        </Route>
        <Route
          path="fechado"
          element={<Fechado empresa={quickCupState.empresa} />}
        />
      </Routes>
    </>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
export default AppWrapper;