import React from "react";
import styled from "styled-components";
import BoldText from "./BoldText";

const LineTitleStyle = styled.div`
  width: calc(${(props) => props.width});
  height: calc(${(props) => props.height});
  /* height: 60px; */
  position: relative;

  .line {
    height: calc(${(props) => props.height} / 2 - 2px);
    border-bottom: solid 3px ${(props) => props.color};
    z-index: 0;
  }
  .content {
    position: absolute;
    left: 0;
    top: 15px;
    background-color: var(--lightGray);
    padding-right: 12px;
  }
`;

export default function LineTitle({
  children,
  fontSize,
  width,
  height,
  color,
}) {
  return (
    <LineTitleStyle width={width} height={height} color={color}>
      <div className="line" />
      <div className="content">
        <BoldText fontSize={fontSize} color={color}>
          {children}
        </BoldText>
      </div>
    </LineTitleStyle>
  );
}
