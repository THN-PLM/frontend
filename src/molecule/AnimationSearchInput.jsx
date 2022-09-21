import React from "react";
import styled, { css } from "styled-components";

const AnimationSearchInputContainerStyle = styled.div`
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
const AnimationSearchInputStyle = styled.div`
  height: calc(${(props) => props.height});
  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "white"};
  border-radius: 10px;
  border: ${(props) => (props.requiredError ? "solid red 1px" : ``)};

  font-size: calc((${(props) => props.height}) / 3);
  font-family: "Roboto";
  font-weight: 500;
  color: ${(props) => (props.blue ? "white" : "var(--deemGray)")};

  .placeholder {
    padding: 3px;

    transition: 0.5s;

    color: var(--textDarkGray);
    font-weight: 700;
    font-size: calc((${(props) => props.height}) / 3);
  }

  button {
    border: none;
    background-color: transparent;
    outline: none;
    color: var(--textGray);
  }
  //여기는 필히 리팩토링 하자 이게 뭐냐.
  ${(props) => {
    if (typeof props.state === "object") {
      if (props.state && props.state.length <= 0) {
        return "";
      }
      return css`
      display: block;
        border: solid var(--eciBlue) 2px;
        background-color: 
          props.backgroundColor ? props.backgroundColor : "white";
        color: var(--eciBlue);
        border: solid 1px var(--eciBlue);

        .placeholder {
          height: 3px;
          transform: translate(0, calc(-${props.height} / 2 + 5px));
          line-height: 3px;
          background-color: inherit;
          font-size: 12px;
          font-weight: 700;
          color: var(--eciBlue);
          opacity: ${props.requiredError ? "0" : "1"};
        }
        .con{
          transform: translate(0, calc(-${props.height} / 2 + 12px));
          padding-left: 5px;

        }
      `;
    }
    if (props.state) {
      return css`
      display: block;

        background-color: 
          props.backgroundColor ? props.backgroundColor : "white";
        color: var(--eciBlue);
        border: solid 1px var(--eciBlue);

        .placeholder {
          height: 3px;
          transform: translate(0, calc(-${props.height} / 2 + 5px));
          
          line-height: 3px;
          background-color: inherit;
          font-size: 12px;
          font-weight: 700;
          color: var(--eciBlue);
        }
        .con{
          transform: translate(0, calc(-${props.height} / 2 + 12px));
          padding-left: 5px;

        }
      `;
    }
    return "";
  }}
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
  .state {
    overflow: hidden;
    font-size: calc((${(props) => props.height}) / 3);
    font-family: "Roboto";
    font-weight: 500;
    white-space: nowrap;

    text-overflow: ellipsis;
    text-decoration: none;
  }
  .con {
    display: flex;
    justify-content: space-between;
  }
`;
export default function AnimationSearchInput({
  width,
  height,
  placeholder,
  onClick,
  state,
  requiredError,
  readOnly,
  required,
  backgroundColor,
  borderBottom,
}) {
  return (
    <AnimationSearchInputContainerStyle
      width={width}
      height={`${height} + 20px`}
    >
      <AnimationSearchInputStyle
        height={height}
        state={state}
        requiredError={requiredError}
        required={required}
        readOnly={readOnly}
        backgroundColor={backgroundColor}
      >
        <div className="placeholder">
          {placeholder}
          <div className="required" />
        </div>
        <div className="con">
          <div className="state" title={state || ""}>
            {state || ""}
          </div>

          {readOnly ? (
            <div className="def" />
          ) : (
            <button type="button" onClick={onClick}>
              <span className="material-icons">search</span>{" "}
            </button>
          )}
        </div>
      </AnimationSearchInputStyle>
      {requiredError && !state ? <div className="fillIn">fill in</div> : ""}
    </AnimationSearchInputContainerStyle>
  );
}
