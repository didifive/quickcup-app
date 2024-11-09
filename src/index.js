import React from "react";
import ReactDOM from "react-dom/client";
import Providers from "./Providers";

const App = () => (
  <React.StrictMode>
    <Providers />
  </React.StrictMode>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);