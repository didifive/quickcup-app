import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useQuickCup from "./hooks/quickcup-hooks";

import Home from "./pages/Home";
import Loading from "./components/Loading";

const App = () => {
  const { quickcupState } = useQuickCup();

  return (
    <>
      {quickcupState.loading && <Loading />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;