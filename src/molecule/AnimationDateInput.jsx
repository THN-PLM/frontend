import React from "react";
import styled, { css } from "styled-components";
import Input from "../atom/Input";

const AnimationDateInputContainerStyle = styled.div`
  width: calc(${(props) => props.width});
  height: calc(${(props) => props.height});
  .fillIn {
    height: 15px;
    margin-top: 2px;
    font-size: 8px;
    color: red;
    margin-left: 10px;
  }
`;
const AnimationDateInputStyle = styled.div`
  width: 100%;
  height: calc(${(props) => props.height});
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 2%;

  border-radius: 10px;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "white"};
  pointer-events: ${(props) => (props.readOnly ? "none" : "")};

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
      opacity: ${(props) => (props.error ? "0" : "1")};
    }
  }
  input {
    width: 100%;
    background-color: transparent;
    border: none;
    outline-width: 0;
    font-size: 12px;
  }
  ${(props) =>
    props.state
      ? css`
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
        `
      : css`
          input {
            ::-webkit-datetime-edit-text {
              -webkit-appearance: none;
              display: none;
            }
            ::-webkit-datetime-edit-month-field {
              -webkit-appearance: none;
              display: none;
            }
            ::-webkit-datetime-edit-day-field {
              -webkit-appearance: none;
              display: none;
            }
            ::-webkit-datetime-edit-year-field {
              -webkit-appearance: none;
              display: none;
            }
          }
        `}
  border: ${(props) => (props.error ? "solid red 1px" : "")};
`;

export default function AnimationDateInput({
  width,
  height,
  placeholder,
  backgroundColor,
  state,
  setState,
  error,
  errorMessage,
  readOnly,
}) {
  const handleChange = (e) => {
    e.preventDefault();

    if (setState) {
      setState(e.target.value);
    }
  };
  return (
    <AnimationDateInputContainerStyle width={width} height={`${height} + 20px`}>
      <AnimationDateInputStyle
        width={width}
        height={height}
        state={state}
        readOnly={readOnly}
        error={error}
        backgroundColor={backgroundColor}
      >
        <div className="placeholder">{placeholder}</div>
        <input type="date" value={state} onChange={handleChange} />
        {/* <Input
          width="100%"
          height={`${height} - 50%`}
          setState={readOnly ? "" : setState}
          name={name}
          color="var(--eciBlue)"
          type={!readOnly ? "date" : " "}
          readOnly={readOnly}
          state={state}
          placeholder={placeholder}
          value={state}
        /> */}
      </AnimationDateInputStyle>
      {error && <div className="fillIn">{errorMessage}</div>}
    </AnimationDateInputContainerStyle>
  );
}
