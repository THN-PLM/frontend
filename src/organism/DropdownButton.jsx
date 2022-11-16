import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import OptionModal from "../molecule/OptionModal";

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
  .icon {
    font-size: 10px;
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
  uiObject,
  setStateList,
  buttonTitle,
}) {
  const [isToggle, setisToggle] = useState(false);
  const modalRef = useRef();
  const handleClickOutside = ({ target }) => {
    if (!modalRef.current.contains(target)) setisToggle(false);
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <DropDownButtonStyle
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      isToggle={isToggle}
      toggleColor={toggleColor}
      right={right}
      ref={modalRef}
    >
      <div
        className="button"
        onClick={() => {
          setisToggle(!isToggle);
          console.log(isToggle);
        }}
      >
        <span className="material-icons icon">filter_alt</span>

        {buttonTitle}
      </div>
      {isToggle && (
        <div className="box">
          <OptionModal
            width="200px"
            title={title}
            uiObject={uiObject}
            setisModal={setisToggle}
            setStateList={setStateList}
          />
        </div>
      )}
    </DropDownButtonStyle>
  );
}
