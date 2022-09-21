import React from "react";
import styled from "styled-components";

const ScrollControllerButtonStyle = styled.div`
  width: calc(${(props) => props.width});
  height: 60px;
  border: solid 1px var(--eciBlue);
  border-bottom: none;
  padding-top: 20px;

  position: relative;
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  transition: 0.1s;
  cursor: pointer;
  ::after {
    content: "";
    width: 0px;
    height: 0px;
    transition: 0.1s;

    border-top: 15px solid
      ${(props) =>
        props.colorType === "normal" ? "var(--lightGray)" : "var(--eciBlue)"};
    border-left: calc(${(props) => props.width} / 2) solid transparent;
    border-right: calc(${(props) => props.width} / 2) solid transparent;

    position: absolute;
    bottom: -14px;
    left: 0px;
  }
  ::before {
    content: "";
    width: 0px;
    height: 0px;
    transition: 0.1s;

    border-top: 15px solid var(--eciBlue);
    border-left: calc(${(props) => props.width} / 2) solid transparent;
    border-right: calc(${(props) => props.width} / 2) solid transparent;

    position: absolute;
    bottom: -15px;
    left: 0px;
  }
  .upperButton {
    position: absolute;
    top: 58px;
    left: calc(50% - 50px);
  }
  ${(props) =>
    props.colorType === "normal"
      ? `color : var(--deemGray); background-color: transparent`
      : `color : white; background-color: var(--eciBlue)`}
`;
export default function ScrollControllerButton({
  onClick,
  width,
  children,
  colorType,
  upButton,
}) {
  return (
    <ScrollControllerButtonStyle
      width={width}
      onClick={onClick}
      colorType={colorType}
    >
      {children}
      <div className="upperButton">{upButton}</div>
    </ScrollControllerButtonStyle>
  );
}
