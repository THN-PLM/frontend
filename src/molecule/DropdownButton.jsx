import React, { useState } from "react";
import styled, { css } from "styled-components";

const DropDownButtonStyle = styled.div`
  position: relative;
  .button {
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border: solid 1px var(--textDarkGray);
    border-radius: 5px;
    text-align: center;
    line-height: ${(props) => props.height};
    font-size: 12px;
    cursor: pointer;
    background-color: ${(props) =>
      props.isToggle
        ? props.toggleColor
          ? props.toggleColor
          : "var(--eciBlue)"
        : props.backgroundColor
        ? props.backgroundColor
        : "white"};
    color: ${(props) => (props.isToggle ? "white" : "var(--textDarkGray)")};
  }
  .box {
    position: absolute;
    ${(props) =>
      props.right
        ? css`
            right: 0;
          `
        : css`
            left: 0;
          `}
    top: calc(${(props) => props.height} + 4px);
  }
`;
export default function DropdownButton({
  title,
  children,
  width,
  height,
  backgroundColor,
  toggleColor,
  right,
}) {
  const [isToggle, setisToggle] = useState(false);
  return (
    <DropDownButtonStyle
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      isToggle={isToggle}
      toggleColor={toggleColor}
      right={right}
    >
      <div
        className="button"
        onClick={() => {
          setisToggle(!isToggle);
        }}
      >
        {title}
      </div>
      {isToggle && <div className="box">{children}</div>}
    </DropDownButtonStyle>
  );
}
