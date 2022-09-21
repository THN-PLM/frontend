import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Input from "../atom/Input";

const AnimationInputContainerStyle = styled.div`
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
const AnimationInputStyle = styled.div`
  width: 100%;
  height: calc(${(props) => props.height});
  padding: 0 10px;

  display: flex;
  align-items: center;
  position: relative;

  border-radius: 10px;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "white"};
  pointer-events: ${(props) => (props.readOnly ? "none" : "")};
  border: ${(props) => (props.isError ? "solid red 1px" : "")};
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
      font-weight: 900;
      color: var(--eciBlue);
      opacity: ${(props) => (props.isError ? "0" : "1")};
    }
  }

  ${(props) =>
    props.state &&
    css`
      background-color: ${props.backgroundColor
        ? props.backgroundColor
        : "white"};
      input {
      }

      border: ${props.backgroundColor ? "none" : "solid 1px var(--eciBlue)"};
      .placeholder {
        height: 3px;
        transform: translate(0, calc(-1 * (${props.height}) / 2));
        line-height: 3px;
        background-color: inherit;
        font-size: 12px;
        font-weight: 900;
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

export default function AnimationInput({
  width,
  height,
  placeholder,
  backgroundColor,

  state,
  setState,
  name,
  readOnly,
  required,
  pattern,
  errorMessage,
}) {
  const [isError, setisError] = useState(false);
  const regEx = new RegExp(pattern);
  useEffect(() => {
    if (!readOnly && pattern && setState) {
      setisError(!regEx.test(state));
      setState(state);
    }
  }, [state]);

  return (
    <AnimationInputContainerStyle width={width} height={`${height} + 20px`}>
      <AnimationInputStyle
        width={width}
        height={height}
        state={state}
        readOnly={readOnly}
        isError={isError}
        backgroundColor={backgroundColor}
        required={required}
      >
        <div className="placeholder">
          {placeholder} <div className="required" />
        </div>
        <Input
          width="100%"
          height={`${height} - 50%`}
          setState={readOnly ? "" : setState}
          name={name}
          color="var(--eciBlue)"
          readOnly={readOnly}
          state={state}
        />
      </AnimationInputStyle>
      {isError && !state ? (
        <div className="fillIn">{errorMessage || "error"}</div>
      ) : (
        ""
      )}
    </AnimationInputContainerStyle>
  );
}
