import React from "react";
import ReactDOM from "react-dom/client";
import Providers from "./Providers";

const Index = () => (
  <React.StrictMode>
    <Providers />
  </React.StrictMode>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);