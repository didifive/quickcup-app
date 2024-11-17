import React, { useEffect } from "react";
import useQuickCup from "../hooks/quickcup-hooks";
import MenuGrupos from "../components/Menu/MenuGrupos";

const Menu = () => {
  const { quickCupState, getQuickCupBasico } = useQuickCup();

  useEffect(() => {
    getQuickCupBasico();
  }, [getQuickCupBasico]);

  return (
    <>
      <nav className="navbar navbar-expand" style={{ overflowX: "auto" }}>
        <div className="container">
          <ul className="navbar-nav">
            {quickCupState.grupos &&
              quickCupState.grupos.map((grupo, index) => (
                <li key={index} className="nav-item text-nowrap">
                  <a className="nav-link" href={`#grupo-${grupo.nome}`}>
                    {grupo.nome}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </nav>
      {quickCupState.grupos &&quickCupState.grupos.length > 0 && (
        <MenuGrupos
          grupos={quickCupState.grupos}
          produtos={quickCupState.produtos}
        />
      )}
    </>
  );
};



export default Menu;
