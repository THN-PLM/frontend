import React, { useEffect } from "react";

import AnimationInput from "./AnimationInput";
import AnimationSearchInput from "./AnimationSearchInput";
import AnimationSelectBox from "./AnimationSelectBox";
import UnitInput from "./UnitInput";
import { GridContainerStyle, GridItemContainerStyle } from "../Style";
import { unitObj } from "../utility/Source";
import SizeInput from "./SizeInput";
import defaultStore from "../store/defaultStore";

export default function InputGrid({ readOnly, inPutList, modulestore }) {
  //   inputList Item 견본
  //   {
  //     inputType: "normal",
  //     name: "PCB Part Number", unit은 "가로 세로", placeholder에 해당
  //     requestName: "PCB Part Number", 별칭
  //     required: 1,
  //     choiceFields: [], choice인 경우 option에 들어감
  //     gray: true,
  //     size:1,
  //     unit:"mm",
  //     title: "title" unit input 앞에 들어갈거
  //     readOnly 추가
  //   },
  const {
    searchBoxType,
    dataSearchBoxType,
    setsearchBoxType,
    setdataSearchBoxType,
  } = defaultStore();
  const { objState, setStateOBj, initStateObj } = modulestore;
  const generateInput = (item, i, readonly) => {
    //  inputOb를 받아서 해당하는 인풋 생성
    let resultInput;
    switch (item.inputType) {
      case "normal": {
        resultInput = (
          <GridItemContainerStyle size={item.size} key={i}>
            <AnimationInput
              readOnly={item.readOnly || readonly}
              width="100%"
              height="40px"
              placeholder={item.name}
              state={
                typeof objState[item.requestName] === "object" &&
                objState[item.requestName]
                  ? objState[item.requestName].name
                  : objState[item.requestName]
              }
              setState={setStateOBj(item.requestName)}
              required={item.required === 1}
              backgroundColor={item.gray && "var(--textGray)"}
            />
          </GridItemContainerStyle>
        );

        break;
      }
      case "unit": {
        resultInput = (
          <GridItemContainerStyle size={item.size} key={i}>
            <UnitInput
              width="100%"
              height="40px"
              placeholder={item.name}
              state={
                typeof objState[item.requestName] === "object" &&
                objState[item.requestName]
                  ? objState[item.requestName].name
                  : objState[item.requestName]
              }
              setState={setStateOBj(item.requestName)}
              required={item.required === 1}
              optionArray={[
                {
                  value: unitObj[item.requestName],
                  name: unitObj[item.requestName],
                },
              ]}
              backgroundColor={item.gray && "var(--textGray)"}
            />
          </GridItemContainerStyle>
        );
        break;
      }

      case "DB": {
        resultInput = (
          <GridItemContainerStyle size={item.size} key={i}>
            <AnimationSearchInput
              readOnly={item.readOnly || readonly}
              width="100%"
              height="40px"
              placeholder={item.name}
              state={
                typeof objState[item.requestName] === "object"
                  ? objState[item.requestName].name
                  : objState[item.requestName]
              }
              onClick={() => {
                //   setisClassificationBox(false);
                if (item.searchType === "data") {
                  setdataSearchBoxType(item.requestName);
                } else {
                  setsearchBoxType(item.requestName);
                }
              }}
              isNow={
                objState[item.requestName] === searchBoxType ||
                objState[item.requestName] === dataSearchBoxType
              }
              required={item.required === 1}
              backgroundColor={item.gray && "var(--textGray)"}
            />
          </GridItemContainerStyle>
        );
        break;
      }

      case "choice": {
        const optionList =
          item.choiceFields &&
          item.choiceFields.map((optionObject, j) => {
            return (
              <option key={j} value={optionObject.value}>
                {optionObject.name}
              </option>
            );
          });

        resultInput = (
          <GridItemContainerStyle size={item.size} key={i}>
            <AnimationSelectBox
              readOnly={item.readOnly || readonly}
              width="100%"
              height="40px"
              placeholder={item.name}
              state={
                typeof objState[item.requestName] === "object"
                  ? objState[item.requestName].name
                  : objState[item.requestName]
              }
              setState={setStateOBj(item.requestName)}
              required={item.required === 1}
              backgroundColor={item.gray && "var(--textGray)"}
            >
              {optionList}
            </AnimationSelectBox>
          </GridItemContainerStyle>
        );
        break;
      }
      case "size": {
        const optionList =
          item.choiceFields &&
          item.choiceFields.map((optionObject, j) => {
            return (
              <option key={j} value={optionObject.value}>
                {optionObject.name}
              </option>
            );
          });

        resultInput = (
          <GridItemContainerStyle size={item.size} key={i}>
            <SizeInput
              readOnly={item.readOnly || readonly}
              width="100%"
              height="40px"
              title={item.title}
              placeholder1={item.name && item.name.split(" ")[0]}
              placeholder2={item.name && item.name.split(" ")[1]}
              unit={item.unit}
              state={
                typeof objState[item.requestName] === "object"
                  ? objState[item.requestName].name
                  : objState[item.requestName]
              }
              setState={setStateOBj(item.requestName)}
              required={item.required === 1}
            />
          </GridItemContainerStyle>
        );
        break;
      }

      default:
        resultInput = (
          <GridItemContainerStyle size={item.size} key={i}>
            <div> </div>{" "}
          </GridItemContainerStyle>
        );

        break;
    }
    return resultInput;
  };
  //  ?init을 인풋 생성하면서 하나씩 vs 인풋그리드 렌더링 할 때 한번에
  useEffect(() => {
    initStateObj(inPutList);
  }, []);

  return (
    <GridContainerStyle>
      {inPutList.map((item, i) =>
        generateInput(item, i, modulestore, readOnly)
      )}
    </GridContainerStyle>
  );
}
