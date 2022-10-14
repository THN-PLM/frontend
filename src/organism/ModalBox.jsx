import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ModalBoxStyle = styled.div`
  display: ${(props) => (props.isActivate ? "" : "none")};
  width: 100vw;
  height: calc(100vh - 80px);
  margin: 0 auto;
  position: fixed;
  top: 80px;
  left: 0;
  z-index: 10;
  background-color: rgba(4, 8, 15, 0.5);
  .container {
    margin: 40px 200px;
  }
`;
export default function ModalBox({
  isActivate,

  setisActivate,
  children,
}) {
  return (
    <ModalBoxStyle
      isActivate={isActivate}
      onClick={() => {
        setisActivate(false);
      }}
    >
      <div
        className="container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </ModalBoxStyle>
  );
}
