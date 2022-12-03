import React from "react";
import styled from "styled-components";

const ButtonStyle = styled.button`
  width: calc(${(props) => props.width});
  height: calc(${(props) => props.height});

  background-color: ${(props) =>
    props.condition ? props.backgroundColor : "var(--disableGray)"};
  border: ${(props) =>
    props.borderColor ? `${props.borderColor} solid 1px` : "none"};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "5px"};

  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.hoverColor};
    /* color: white; */
  }
  ${(props) =>
    props.condition === false
      ? `pointer-events: none; background-color: var(--disableGray);`
      : " "}
`;

export default function Button({
  width,
  height,
  backgroundColor, // opt
  borderColor, // opt
  hoverColor, // opt
  borderRadius, // opt
  color,
  fontSize,
  children,
  onClick,
  condition,
  disableColor, // opt
}) {
  return (
    <ButtonStyle
      width={width}
      height={height}
      color={color}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      borderColor={borderColor}
      fontSize={fontSize}
      onClick={onClick}
      condition={condition}
      disableColor={disableColor}
      borderRadius={borderRadius}
    >
      {children}
    </ButtonStyle>
  );
}
