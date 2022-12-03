import React from "react";
import styled from "styled-components";
import AnimationDateInput from "./AnimationDateInput";

const PeriodBoxStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  .period {
    width: 50%;
    color: var(--eciBlue);
    font-size: 15px;
    font-weight: 600;
    position: relative;
    margin-right: 30px;
    .dateType {
      position: absolute;
      left: 50%;
      font-size: 14px;
    }
  }
  .date {
    width: 50%;

    display: flex;
    justify-content: space-between;
  }
`;
export default function PeriodBox({
  title,
  leftText,
  startState,
  startSetState,
  overState,
  overSetState,
  readOnly,
  required,
}) {
  return (
    <PeriodBoxStyle>
      <div className="period">
        {leftText}
        <span className="dateType">{title}</span>{" "}
      </div>
      <div className="date">
        <AnimationDateInput
          width="45%"
          height="40px"
          placeholder="Start date"
          state={startState}
          setState={startSetState}
          readOnly={readOnly}
          required={required}
        />
        <AnimationDateInput
          width="45%"
          height="40px"
          placeholder="End date"
          state={overState}
          setState={overSetState}
          readOnly={readOnly}
          error={startState && overState && startState > overState}
          errorMessage="wrong date !"
          required={required}
        />
      </div>
    </PeriodBoxStyle>
  );
}
