import React from "react";
import styled from 'styled-components';
import loadingGif from "../assets/img/loading.gif";

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const SpinnerBorder = styled.div`
  
  text-weight: bold;
  width: 3rem;
  height: 3rem;
`;

const FullScreenGif = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${loadingGif}) no-repeat center center fixed;
  background-color: #ffffff;
  background-size: contain;
  z-index: 9999;
`;

const Loading = () => {
  return (
    <FullScreenGif>
      <LoadingOverlay>
        <SpinnerBorder>Carregando...</SpinnerBorder>
      </LoadingOverlay>
    </FullScreenGif>
  );
};

export default Loading;
