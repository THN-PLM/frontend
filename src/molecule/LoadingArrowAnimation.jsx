import React from "react";
import styled from "styled-components";
import Arrow from "../static/save-as-draft.svg";

const LoadingArrowAnimationStyle = styled.div`
  margin: 20px auto;
  width: 220px;
  height: 220px;
  border-radius: 10090px;
  background-color: var(--eciBlue);
  position: relative;
  overflow: hidden;
  img {
    width: 150px;
    height: 150px;
    position: absolute;
    top: 35px;
    left: 35px;
    z-index: 5;
    animation: arrow 3s infinite;
  }

  .arrow {
    width: 400px;
    height: 400px;
    position: absolute;
    left: -150px;
    border-radius: 120px;
    animation: spin 3s infinite;
    background-color: white;
  }

  @keyframes arrow {
    0% {
      transform: translate(0, 120%);
    }
    100% {
      transform: translate(0, -120%);
    }
  }
`;
export default function LoadingArrowAnimation() {
  return (
    <LoadingArrowAnimationStyle>
      <img src={Arrow} alt="1" />
    </LoadingArrowAnimationStyle>
  );
}
