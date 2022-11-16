import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const OptionModalStyle = styled.div`
  width: calc(${(props) => props.width});
  min-height: 120px;
  max-height: 300px;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  .title {
    font-size: 12px;
    font-weight: 600;
    color: var(--textDarkGray);
    border-bottom: solid 1px var(--textGray);
    line-height: 20px;
    height: 30px;
  }
  .mid {
    margin-bottom: 60px;
    overflow: scroll;
    padding: 10px;
    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background-clip: padding-box;
      border: 15px solid transparent;
      width: 5px;
      background: rgba(4, 8, 15, 0.3);
      border-radius: 8px;
    }
  }
  .buttonContainer {
    width: calc(100% - 20px);
    position: absolute;
    bottom: 18px;
    left: 10px;
    border-top: solid 1px var(--textGray);
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    .buttonx {
      width: 50%;
      display: flex;
      justify-content: center;
      font-weight: 600;
      cursor: pointer;
    }
    .cancel {
      border-right: solid 1px var(--textGray);
    }
    .apply {
      color: var(--eciBlue);
    }
  }
`;
const UIBoxStyle = styled.div``;
export default function OptionModal({
  title,
  setStateList,
  uiObject, //   { language: { KOR: "KOR", ENG: "ENG", CHN: "CHN" } }
  width,
  onCancel,
  onApply,
  setisModal,
}) {
  const [stateObj, setstateObj] = useState({});
  const indexList = Object.keys(uiObject);
  const uiList = indexList.map((item, i) => {
    //  item은 "language"
    const targetObj = uiObject[item];
    const radioArray = Object.keys(targetObj);

    const radioList = radioArray.map((radioItem, j) => {
      return (
        <div key={j}>
          <input
            type="radio"
            id={radioItem}
            name={radioItem}
            value={targetObj[radioItem]}
            onChange={() => {
              const tmpObj = { ...stateObj };
              tmpObj[item] = targetObj[radioItem];
              setstateObj(tmpObj);
            }}
            checked={stateObj && stateObj[item] === targetObj[radioItem]}
          />
          <label htmlFor={radioItem}>{radioItem}</label>
        </div>
      );
    });

    return (
      <UIBoxStyle key={i}>
        {/* {indexList.length > 1 && item} */}
        {item}
        <br />
        {radioList}
      </UIBoxStyle>
    );
  });
  const cancel = () => {
    setisModal(false);

    if (onCancel) onCancel();
  };
  const applyState = () => {
    const valueList = Object.values(stateObj);
    if (setStateList)
      setStateList.forEach((setState, i) => {
        setState(valueList[i]);
      });
    setisModal(false);
  };

  return (
    <OptionModalStyle
      width={width}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="title">{title}</div>
      <div className="mid">{uiList}</div>
      <div className="buttonContainer">
        <div className="cancel buttonx" onClick={cancel}>
          cancel
        </div>
        <div className="apply buttonx" onClick={applyState}>
          apply
        </div>
      </div>
    </OptionModalStyle>
  );
}
