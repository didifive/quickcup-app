import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useQuickCup from "../hooks/quickcup-hooks";
import MenuGrupos from "../components/MenuGrupos";

const Menu = () => {
  const {
    quickcupState,
    getQuickCupBasico,
  } = useQuickCup();

  useEffect(() => {
    getQuickCupBasico();
  }, []); 

  const navigate = useNavigate();

  useEffect(() => {
    if (
      Object.keys(quickcupState.empresa).length > 0 &&
      !quickcupState.empresa.aberto
    ) {
      navigate("/fechado");
    }
  }, [quickcupState.empresa]);

  return (
    <>
      <nav className="navbar navbar-expand" style={{ overflowX: "auto" }}>
        <div className="container">
          <ul className="navbar-nav">
            {quickcupState.grupos.map((grupo, index) => (
              <li key={index} className="nav-item text-nowrap">
                <a className="nav-link" href={`#grupo-${grupo.nome}`}>
                  {grupo.nome}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {quickcupState.grupos.length > 0 &&
        <MenuGrupos grupos={quickcupState.grupos} produtos={quickcupState.produtos} />
      }
    </>
  );
};



export default Menu;
