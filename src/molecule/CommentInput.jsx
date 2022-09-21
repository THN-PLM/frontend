import React from "react";
import styled, { css } from "styled-components";
import Input from "../atom/Input";

const CommentInputContainerStyle = styled.div`
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
const CommentInputStyle = styled.div`
  width: 100%;
  height: calc(${(props) => props.height});
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 2%;
  border: ${(props) => !props.noBorder && "solid 2px"};

  border-color: var(--eciBlue);
  border-radius: 10px;
  background-color: ${(props) => props.backgroundColor};
  pointer-events: ${(props) => (props.readOnly ? "none" : "")};
  border: ${(props) => (props.requiredError ? "solid red 1px" : "")};

  ${(props) =>
    props.isRejected &&
    css`
      border-color: var(--textDarkGray);
    `}
  ${(props) =>
    props.isRejectPhase &&
    css`
      border-color: var(--required);
    `}
    ${(props) =>
    props.isRefusal &&
    css`
      border-color: var(--required);
      background-color: var(--required);
      input {
        color: white;
      }
    `}
`;

export default function CommentInput({
  width,
  height,
  placeholder,
  backgroundColor,
  state,
  setState,
  name,
  requiredError,
  readOnly,
  isRejectPhase,
  isRejected,
  isRefusal,
  fontSize,
  noBorder,
}) {
  return (
    <CommentInputContainerStyle width={width} height={`${height}`}>
      <CommentInputStyle
        width={width}
        height={height}
        state={state}
        readonly={readOnly}
        requiredError={requiredError}
        backgroundColor={backgroundColor}
        isRejectPhase={isRejectPhase}
        isRejected={isRejected}
        isRefusal={isRefusal}
        noBorder={noBorder}
      >
        <Input
          placeholder={placeholder}
          width="100%"
          height={`${height}`}
          state={state}
          setState={setState}
          name={name}
          color="var(--textDarkGray)"
          readOnly={readOnly}
          fontSize={fontSize}
        />
      </CommentInputStyle>
      {/* {requiredError && !state ? <div className="fillIn">fill in</div> : ""} */}
    </CommentInputContainerStyle>
  );
}
