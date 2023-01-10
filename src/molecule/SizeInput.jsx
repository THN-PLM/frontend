import React, { useState, useEffect } from "react";

import styled from "styled-components";
import AnimationInput from "./AnimationInput";

import UnitInput from "./UnitInput";

const SizeInputStyle = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  pointer-events: ${(props) => (props.readOnly ? "none" : "")};
  align-items: center;
  .title {
    color: var(--eciBlue);
    width: 20%;
    font-weight: 600;
    font-size: 14px;
    transform: translate(0, -10px);
  }
  .x {
    padding-left: 5%;
    color: var(--textGray);
    width: 20%;
    font-weight: 800;
    font-size: 18px;
    transform: translate(0, -10px);
  }
`;
const UnitInputStyle = styled.div`
  display: flex;
  justify-content: space-between;
  .sel {
    color: var(--textGray);
    width: 20%;
    font-weight: 600;
    font-size: 14px;
    transform: translate(0, +10px);
  }
`;
export default function SizeInput({
  width,
  height,
  title,
  placeholder1,
  placeholder2,
  unit,
  state,
  setState,
  readOnly,
  required,
  requiredError,
}) {
  //  state는 앞, 뒤를 "앞 뒤로 관리, 스페이스바 기준으로 split해서 사용"
  //  사용자가 스페이스를 쳐버리면 어캄?
  const state1 = state.split(" ")[0];
  const state2 = state.split(" ")[1];
  const setstate1 = (val) => {
    setState(`${val} ${state2}`);
  };
  const setstate2 = (uni) => {
    setState(`${state1} ${uni}`);
  };
  return (
    <SizeInputStyle width={width} height={height}>
      <div className="title">{title}</div>
      <UnitInputStyle>
        <AnimationInput
          width="70%"
          height={height}
          placeholder={placeholder1}
          backgroundColor="white"
          state={state1}
          setState={setstate1}
          readOnly={readOnly}
          required={required}
          requiredError={requiredError}
        />
        <div className="sel">{unit}</div>
      </UnitInputStyle>
      <div className="x"> {"        "}x</div>

      <UnitInputStyle>
        <AnimationInput
          width="70%"
          height={height}
          placeholder={placeholder2}
          backgroundColor="white"
          state={state2}
          setState={setstate2}
          readOnly={readOnly}
          required={required}
          requiredError={requiredError}
        />
        <div className="sel">{unit}</div>
      </UnitInputStyle>
    </SizeInputStyle>
  );
}
