import React, { useRef, useEffect, useState } from "react";

import styled from "styled-components";

const InputStyle = styled.input`
  width: calc(${(props) => props.width});
  height: calc(${(props) => props.height});
  border: none;
  border-bottom: ${(props) =>
    props.requiredError ? "solid red 2px" : "none"} !important;
  background-color: transparent;

  color: ${(props) => props.color};

  font-size: ${(props) =>
    props.fontSize ? props.fontSize : `calc((${props.height}) / 5 * 2.2)`};
  ::placeholder {
    color: ${(props) => props.color};
    font-weight: 100;
  }
  :focus {
    outline-width: 0;
  }
  outline-width: 0;

  :focus::placeholder {
    color: transparent;
  }
  //date type
  ${(props) =>
    props.value
      ? ""
      : `::-webkit-datetime-edit-text {
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
  }`}
`;

export default function Input({
  width,
  height,
  placeholder,
  setState,
  name,
  color,
  state,
  type,
  fontSize,
  late,
  readOnly,
}) {
  let timer;
  const inputRef = useRef();
  const handleText = (e) => {
    e.preventDefault();

    // uncontrolled input으로 사용을 하면서, 디바운서를 이용해 200ms동안 입력이 없을 경우 setstate를 진행
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(
      () => {
        if (setState) {
          setState(e.target.value);
        }
      },
      late ? 600 : 300
    );
  };

  useEffect(() => {
    if (state) {
      inputRef.current.value = state;
    } else {
      inputRef.current.value = "";
    }
  }, [state]);

  return (
    <InputStyle
      width={width}
      height={height}
      fontSize={fontSize}
      color={color}
      placeholder={placeholder}
      onChange={handleText}
      name={name}
      ref={inputRef}
      type={type}
      readOnly={readOnly}
    />
  );
}
