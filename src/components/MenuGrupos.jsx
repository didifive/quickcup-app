import React from "react";
import MenuProdutos from "./MenuProdutos";

const MenuGrupos = ({ grupos, produtos }) => { 
  return (
    <div className="container py-3 py-xl-0">
      {grupos.map((grupo, index) => (
        <div key={index}>
          <div className="row">
            <div
              id={`grupo-${grupo.nome}`}
              className="col-md-8 col-xl-7 mx-auto text-xs"
            >
              <h3 className="mt-3">{grupo.nome}</h3>
            </div>
          </div>
          <div className="col-md-8 col-xl-7 mx-auto text-xs">
            <MenuProdutos
              produtos={produtos.filter(
                (produto) => produto.grupoId === grupo.id
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuGrupos;
