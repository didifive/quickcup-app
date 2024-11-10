import React, { useEffect } from "react";
import useQuickCup from "./hooks/quickcup-hooks";

import Home from "./pages/Home";


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
