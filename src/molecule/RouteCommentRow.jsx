import React, { useState } from "react";
import styled from "styled-components";
import Button from "../atom/Button";
import CommentInput from "./CommentInput";
import RouteCard from "./RouteCard";
import SelectBox from "../atom/SelectBox";

const RouteCommentRowStyle = styled.div`
  width: calc(${(props) => props.width});
  padding-bottom: 30px;
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  pointer-events: ${(props) => (props.readOnly ? "none" : "")};
  .rightBox {
    margin-top: 10px;
    width: 45%;
    position: absolute;
    right: 0;
    ${(props) => props.isRejectPhase && `transform: translateY(-20px);`}
    .rejectSection {
      width: 100%;
      display: ${(props) =>
        props.isRejectPhase || props.isRefusal ? "flex" : "none"};
      justify-content: space-between;
      align-items: center;
      color: var(--textDarkGray);
    }
    .commentSection {
      display: ${(props) =>
        props.isPassed || (props.present && !props.readOnly) ? "" : "none"};
      width: 100%;
      pointer-events: ${(props) => !props.present && "none"};
      margin-bottom: 8px;
    }
    .buttonSection {
      width: 100%;
      display: ${(props) =>
        props.present && !props.readOnly && !props.init && !props.isRejected
          ? "flex"
          : "none"};
      justify-content: space-between;
    }
  }
  .rejectButtonContainer {
    display: ${(props) => props.isrejectButton && "none"};
  }
`;
export default function RouteCommentRow({
  width,
  title,
  complete,
  upperLine,
  member,
  inputState,
  setinputState,
  onApprove,
  onReject,
  isPassed,
  present,
  readOnly,
  isRejected,
  isRefusal,
  rejectTargetArray,
  rejectTarget,
  setrejectTarget,
  openMember,
  init,
  highLight,
}) {
  const [isRejectPhase, setisRejectPhase] = useState(false);
  const options = rejectTargetArray
    ? rejectTargetArray.map((item, i) => {
        return (
          <option key={i} value={item.seq}>
            {item.name}
          </option>
        );
      })
    : "";
  return (
    <RouteCommentRowStyle
      width={width}
      complete={complete}
      isPassed={isPassed}
      present={present}
      readOnly={readOnly}
      isRejectPhase={isRejectPhase}
      isRejected={isRejected}
      isRefusal={isRefusal}
      init={init}
      isrejectButton={rejectTargetArray && rejectTargetArray.length < 1}
    >
      <RouteCard
        title={title}
        width="45%"
        member={member}
        color="var(--eciBlue)"
        upperLine={upperLine}
        complete={complete}
        isPassed={isPassed}
        isPresent={present}
        isRejected={isRejected}
        isRefusal={isRefusal}
        openMember={openMember}
        highLight={highLight}
      />
      <div className="rightBox">
        <div className="rejectSection">
          <span className="commentTo">Comment to</span>
          <SelectBox
            width="60%"
            height="25px"
            backgroundColor="white"
            setState={setrejectTarget}
            value={rejectTarget}
            state={rejectTarget}
            fontSize="10px"
            color="var(--textDarkGray)"
          >
            {options}
          </SelectBox>
        </div>
        <div className="commentSection">
          <CommentInput
            backgroundColor="var(--lightGray)"
            width="100%"
            height="36px"
            placeholder="comment"
            state={inputState}
            setState={setinputState}
            isRejectPhase={isRejectPhase}
            isRejected={isRejected}
            isRefusal={isRefusal}
            fontSize="10px"
          />
        </div>
        {isRejectPhase ? (
          <div className="buttonSection">
            <div />
            <Button
              backgroundColor="inherit"
              borderColor="var(--eciBlueHover)"
              width="64px"
              height="20px"
              hoverColor="var(--eciBlueHover)"
              color="var(--darkGray)"
              fontSize="7px"
              onClick={onReject}
            >
              ok
            </Button>
          </div>
        ) : (
          <div className="buttonSection">
            <Button
              backgroundColor="inherit"
              borderColor="var(--eciBlueHover)"
              width="64px"
              height="20px"
              hoverColor="var(--eciBlueHover)"
              color="var(--darkGray)"
              fontSize="7px"
              onClick={onApprove}
            >
              Assign
            </Button>
            <div className="rejectButtonContainer">
              <Button
                backgroundColor="inherit"
                borderColor="var(--eciBlueHover)"
                width="64px"
                height="20px"
                hoverColor="var(--eciBlueHover)"
                color="var(--darkGray)"
                fontSize="7px"
                onClick={() => setisRejectPhase(true)}
              >
                Reject
              </Button>
            </div>
          </div>
        )}
      </div>
    </RouteCommentRowStyle>
  );
}
