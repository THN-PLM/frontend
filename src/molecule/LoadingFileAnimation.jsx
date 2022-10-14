import React from "react";
import styled from "styled-components";
import folder from "../static/Folder.svg";

const LoadingFileAnimationStyle = styled.div`
  margin: 20px auto;
  width: 220px;
  height: 220px;
  border-radius: 10090px;
  background-color: var(--eciBlue);
  position: relative;
  img {
    width: 150px;
    height: 150px;
    position: absolute;
    top: 35px;
    left: 35px;
    z-index: 5;
  }
  .container {
    width: 101px;
    height: 88px;
    position: absolute;
    top: 72px;
    left: 59px;
    overflow: hidden;
  }
  .wave {
    width: 400px;
    height: 400px;
    position: absolute;
    left: -150px;
    border-radius: 120px;
    animation: spin 15s infinite;
    background-color: white;
  }

  @keyframes spin {
    0% {
      transform: translate(0, 30%) rotate(100deg);
    }
    100% {
      transform: translate(5px, 1%) rotate(-800deg);
    }
  }
`;
export default function LoadingFileAnimation() {
  return (
    <LoadingFileAnimationStyle>
      <img src={folder} alt="d" />
      <div className="container">
        <div className="wave" />
      </div>
    </LoadingFileAnimationStyle>
  );
}
