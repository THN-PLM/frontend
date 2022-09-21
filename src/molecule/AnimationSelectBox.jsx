import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import Input from "../atom/Input";
import SelectBox from "../atom/SelectBox";

const AnimationSelectBoxContainerStyle = styled.div`
  width: calc(${(props) => props.width});
  height: calc(${(props) => props.height});

  .fillIn {
    height: 15px;
    margin-top: 2px;
    font-size: 10px;
    color: red;
    margin-left: 10px;
  }
`;
const AnimationSelectBoxStyle = styled.div`
  width: 100%;
  height: calc(${(props) => props.height});
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 2%;

  border-radius: 10px;
  background-color: white;
  pointer-events: ${(props) => (props.readOnly ? "none" : "")};
  border: ${(props) => (props.requiredError ? "solid red 1px" : "")};

  .placeholder {
    pointer-events: none;

    padding: 3px;
    position: absolute;
    left: 4%;
    height: 3px;
    line-height: 3px;
    transition: 0.2s;

    color: var(--deemGray);
    font-size: calc((${(props) => props.height}) / 3);
  }

  :focus-within {
    border: solid var(--eciBlue) 1px;
    background-color: white;

    color: var(--eciBlue);

    .placeholder {
      transform: translate(
        0,
        calc(-1 * (${(props) => props.height}) / 2 + 1px)
      );
      background-color: white;
      font-size: 12px;
      font-weight: 700;
      color: var(--eciBlue);
      opacity: ${(props) => (props.requiredError ? "0" : "1")};
    }
  }

  ${(props) =>
    props.state &&
    css`
      background-color: white;
      color: var(--eciBlue);
      border: solid 1px var(--eciBlue);
      .placeholder {
        height: 3px;
        transform: translate(0, calc(-1 * (${props.height}) / 2));
        line-height: 3px;
        background-color: inherit;
        font-size: 12px;
        font-weight: 700;
        color: var(--eciBlue);
      }
    `}
  .placeholder {
    display: flex;
    align-items: center;
  }
  .required {
    width: 5px;
    height: 5px;
    border-radius: 10px;
    margin-left: 3px;
    display: inline-block;
    background-color: var(--required);
    opacity: ${(props) => (props.required && !props.readOnly ? 1 : 0)};
  }
`;

export default function AnimationSelectBox({
  width,
  height,
  placeholder,
  state,
  setState,
  readOnly,
  children,
  //   fontSize,
  requiredError,
  face,
  required,
}) {
  const selectRef = useRef();

  return (
    <AnimationSelectBoxContainerStyle width={width} height={`${height} + 20px`}>
      <AnimationSelectBoxStyle
        width={width}
        height={height}
        state={
          selectRef.current &&
          selectRef.current.value &&
          selectRef.current.value !== " "
        }
        readOnly={readOnly}
        requiredError={requiredError}
        required={required}
      >
        <div className="placeholder">
          {placeholder}
          <div className="required" />
        </div>
        <SelectBox
          inRef={selectRef}
          width="100%"
          height={`${height} - 50%`}
          backgroundColor="transparent"
          fontSize="12px"
          color="var(--eciBlue)"
          value={state}
          face={face || (children && children[0] && children[0].props.value)}
          state={state}
          setState={readOnly ? "" : setState}
          readOnly={readOnly}
        >
          {children}
        </SelectBox>
      </AnimationSelectBoxStyle>
      {requiredError && !state ? <div className="fillIn">fill in</div> : ""}
    </AnimationSelectBoxContainerStyle>
  );
}
