import React, { useRef } from "react";

import styled from "styled-components";
import logo1 from "../static/logo1.svg";

const RoundImgBoxStyle = styled.div`
  width: calc(${(props) => props.width});
  height: calc(${(props) => props.height});
  border-radius: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    border-radius: 100px;
  }
`;

export default function RoundImgBox({ width, height, src, alt }) {
  const altImg = (e) => {
    e.target.src = logo1;
    e.onError = false;
  };
  return (
    <RoundImgBoxStyle width={width} height={height}>
      <img src={src} alt="" onError={altImg} />
    </RoundImgBoxStyle>
  );
}
