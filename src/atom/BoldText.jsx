import React from "react";
import styled from "styled-components";

const BoldTextStyle = styled.span`
  color: ${(props) => props.color};
  font-family: "Helvetica";
  font-style: normal;
  font-weight: 700;
  font-size: ${(props) => `${props.fontSize}`};
  line-height: calc(${(props) => props.fontSize} + 4px);
`;

export default function BoldText({ children, color, fontSize }) {
  return (
    <BoldTextStyle color={color} fontSize={fontSize}>
      {children}
    </BoldTextStyle>
  );
}
