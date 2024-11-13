import React from 'react'
import logo from "../assets/img/quickcup-logo.png";

const ErroConexao = () => {
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="text-center p-3">
        <h1 className="text-danger">
          <img
            src={logo}
            alt="QuickCup"
            style={{ height: "50%", width: "50%" }}
          />
          Não foi possível se conectar com a empresa, tente novamente mais tarde
          :(
        </h1>
      </div>
    </div>
  );
};
export default ErroConexao;
