import React, { useState, useEffect } from "react";

import styled from "styled-components";

import SelectBox from "../atom/SelectBox";
import AnimationInput from "./AnimationInput";

const UnitInputStyle = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  pointer-events: ${(props) => (props.readOnly ? "none" : "")};
  justify-content: space-between;
  .sel {
    width: 25%;
    transform: translate(0, -10px);
  }
`;

export default function UnitInput({
  width,
  height,
  placeholder,
  state,
  setState,
  readOnly,
  required,
  requiredError,
  optionArray, // [{value,name},{}]
}) {
  // const [value, setvalue] = useState("");
  // const [unit, setunit] = useState("");
  const value = state.split(" ")[0];
  const unit = state.split(" ")[1] || optionArray[0].value;
  const setvalue = (val) => {
    setState(`${val} ${unit}`);
  };
  const setunit = (uni) => {
    setState(`${value} ${uni}`);
  };
  // useEffect(() => {
  //   let propVal = "";
  //   let propUnit = "";
  //   if (state && state.split(" ")[1]) {
  //     [propVal, propUnit] = state.split(" ");
  //     setvalue(propVal);
  //     setunit(propUnit || optionArray[0].value);
  //   }
  // }, [state]);
  // useEffect(() => {
  //   setState(`${value} ${unit}`);
  // }, [value, unit]);
  const optionList =
    optionArray &&
    optionArray.map((item, i) => {
      return (
        <option key={i} value={item.value}>
          {item.name}
        </option>
      );
    });
  return (
    <UnitInputStyle width={width} height={height}>
      <AnimationInput
        width="70%"
        height={height}
        placeholder={placeholder}
        state={value}
        setState={setvalue}
        readOnly={readOnly}
        required={required}
        requiredError={requiredError}
      />
      <div className="sel">
        <SelectBox
          width="100%"
          height={height}
          setState={setunit}
          backgroundColor="inherit"
          color="var(--deemGray)"
          borderColor="var(--deemGray)"
          fontSize="11px"
          state={unit}
          defaultValue={optionList[0] && optionList[0].value}
        >
          {optionList}
        </SelectBox>
      </div>
    </UnitInputStyle>
  );
}
