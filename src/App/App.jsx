import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import useQuickCup from "../hooks/quickcup-hooks";

import Menu from "../pages/Menu";
import Fechado from "../pages/Fechado";
import Loading from "./Loading";
import Carrinho from "../pages/Carrinho";
import Layout from "../pages/Layout";
import Cliente from "../pages/Cliente";
import { AVISO_FACULDADE } from "../utils/storage-names";
import Endereco from "../pages/Endereco";
import ListaPedidos from "../pages/ListaPedidos";
import Pedido from "../pages/Pedido";

const App = () => {
  
  const { quickCupState, getQuickCupBasico } = useQuickCup();
  const navigate = useNavigate();

  useEffect(() => {
    getQuickCupBasico();

    const showAlert = () => {
      const avisoVisto = sessionStorage.getItem(AVISO_FACULDADE);

      if (!avisoVisto) {
        alert(
          'Este aplicativo foi criado exclusivamente para a entrega do trabalho semestral da faculdade UNIFRAN / Cruzeiro do Sul para o segundo semestre de 2024. Todo o conteúdo é fictício. No rodapé da página tem o link para o repositório do projeto no GitHub (Repo GitHub) com mais detalhes, visite ele para mais informações.'
        );
        sessionStorage.setItem(AVISO_FACULDADE, true);
      }
    };
    showAlert();
  }, [getQuickCupBasico]); 

  useEffect(() => {
    if (!quickCupState.empresa.aberto) {
      navigate('/fechado');
    } else if (window.location.pathname === '/fechado') {
      navigate('/');
    }
  }, [quickCupState, navigate]);

  return (
    <>
      {quickCupState.loading && <Loading />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Menu />} />
          <Route path="carrinho" element={<Carrinho />} />
          <Route path="cliente/:from?" element={<Cliente />} />
          <Route path="endereco/:id?" element={<Endereco />} />
          <Route path="pedido" element={<ListaPedidos />} />
          <Route path="pedido/:id" element={<Pedido />} />
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