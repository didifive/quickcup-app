import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useQuickCup from "../hooks/quickcup-hooks";
import useCarrinho from "../hooks/carrinho-hooks";
import CarrinhoProdutos from "../components/CarrinhoProdutos";

const Carrinho = () => {
  const { quickcupState } = useQuickCup();

  const { carrinhoState, limparCarrinho } = useCarrinho();

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
      <div className="container py-3 py-xl-0">
        <div className="row">
          <div className="col-md-8 col-xl-7 mx-auto text-xs">
            <h3 className="mt-3">Carrinho</h3>
            <CarrinhoProdutos itens={carrinhoState.itens} />
            <Link to="/" className="btn btn-secondary">
              Voltar para o Menu
            </Link>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => limparCarrinho()}
            >
              Limpar carrinho
            </button>
          </div>
        </div>
      </div>
    </>
  );
};



export default Carrinho;
