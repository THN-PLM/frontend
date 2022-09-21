import React, { useEffect } from "react";
import styled from "styled-components";

const SelectBoxContainerStyle = styled.div`
  width: calc(${(props) => props.width});
  height: calc(${(props) => props.height});
  display: flex;
  align-items: center;
  .fillIn {
    height: 15px;
    margin-top: 5px;
    font: 8px red;
  }
  option {
    font-size: inherit;
  }
  .nav:hover {
    display: block;
  }
`;
const SelectBoxStyle = styled.select`
  width: 100%;
  height: calc(${(props) => props.height});
  padding-left: 10px;

  background-color: ${(props) => props.backgroundColor};
  border: ${(props) =>
    props.borderColor ? `${props.borderColor}solid 1px` : "none"};
  outline: none;
  border-radius: 5px;

  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};

  .block {
    display: none;
  }
  ${(props) =>
    props.readOnly &&
    `-webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";`}
  option:hover {
    display: block;
  }
`;
const ReadOnlyBox = styled.div`
  width: 100%;
  height: calc(${(props) => props.height});
  padding-left: 10px;

  background-color: ${(props) => props.backgroundColor};
  border: ${(props) =>
    props.borderColor ? `${props.borderColor}solid 1px` : "none"};
  outline: none;
  border-radius: 5px;

  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  pointer-events: none;

  .block {
    display: none;
  }
`;
export default function SelectBox({
  width,
  height,
  backgroundColor,
  borderColor,
  fontSize,
  color,
  children,
  state,
  setState,
  requiredError,
  readOnly,
  value,
  inRef,
  defaultValue,
}) {
  const handleChange = (e) => {
    // event handler
    if (setState) {
      setState(e.target.value);
    }
  };
  useEffect(() => {}, [state, value]);
  return (
    <SelectBoxContainerStyle width={width} height={`${height} + 20px`}>
      <SelectBoxStyle
        ref={inRef && inRef}
        width={width}
        height={height}
        color={color}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        fontSize={fontSize}
        onChange={handleChange}
        value={value}
        placeholder=" "
        readOnly={readOnly}
        title={
          typeof state === "string" || typeof state === "number" ? state : " "
        }
        defaultValue={defaultValue}
      >
        {state ? (
          <option value=" " className="block">
            {state}
          </option>
        ) : (
          <option value=" " className="block">
            {" "}
          </option>
        )}

        {children}
      </SelectBoxStyle>
      {requiredError ? <div className="fillIn">fill in</div> : ""}
    </SelectBoxContainerStyle>
  );
}
