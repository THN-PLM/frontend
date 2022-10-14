import React from "react";
import styled from "styled-components";

const LoadingBoxStyle = styled.div`
  display: ${(props) => (props.isLoading ? "" : "none")};
  width: 100vw;
  height: calc(100vh - 80px);
  margin: 0 auto;
  position: fixed;
  top: 80px;
  left: 0;
  z-index: 10;
  background-color: rgba(4, 8, 15, 0.5);
  .loadingBox {
    position: fixed;
    top: calc(50% - 200px);
    left: calc(50% - 200px);
    width: 400px;
    height: 400px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    color: var(--deemGray);
    z-index: 4;
    box-shadow: 20px 0px 20px 0px #00000040;
  }
`;
export default function LoadingBox({ children, isLoading }) {
  return (
    <LoadingBoxStyle isLoading={isLoading}>
      <div className="loadingBox">{children}</div>
    </LoadingBoxStyle>
  );
}
