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
      <div className="container py-3 py-xl-0">
        <div className="row">
          <div className="d-flex flex-column col-md-8 col-xl-7 mx-auto text-xs"></div>
          <h3 className="mt-3 display-6">Menu</h3>
          <p>Abaixo temos os produtos disponíveis para você fazer o seu pedido. Aproveite!</p>
          <hr />
        </div>
      </div>  
      <nav className="navbar navbar-expand" style={{ overflowX: 'auto' }}>
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
      {quickCupState.grupos && quickCupState.grupos.length > 0 && (
        <MenuGrupos
          grupos={quickCupState.grupos}
          produtos={quickCupState.produtos}
        />
      )}
    </>
  );
};



export default Menu;
