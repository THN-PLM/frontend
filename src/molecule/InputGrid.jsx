import React from "react";

import AnimationInput from "./AnimationInput";
import AnimationSearchInput from "./AnimationSearchInput";
import AnimationSelectBox from "./AnimationSelectBox";
import UnitInput from "./UnitInput";
import { GridContainerStyle, GridItemContainerStyle } from "../Style";
import { unitObj } from "../utility/Source";
import SizeInput from "./SizeInput";

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
  //   unit:"mm",
  //  title: "title" unit input 앞에 들어갈거
  //   },
  const generateInput = (item, i, moduleStore, readonly) => {
    let resultInput;
    const {
      searchBoxType,
      dataSearchBoxType,
      setsearchBoxType,
      setdataSearchBoxType,
    } = moduleStore;
    switch (item.inputType) {
      case "normal": {
        resultInput = (
          <GridItemContainerStyle size={item.size} key={i}>
            <AnimationInput
              readOnly={readonly}
              width="100%"
              height="40px"
              placeholder={item.name}
              state={
                typeof moduleStore[item.requestName] === "object" &&
                moduleStore[item.requestName]
                  ? moduleStore[item.requestName].name
                  : moduleStore[item.requestName]
              }
              setState={moduleStore[`set${item.requestName}`]}
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
                typeof moduleStore[item.requestName] === "object" &&
                moduleStore[item.requestName]
                  ? moduleStore[item.requestName].name
                  : moduleStore[item.requestName]
              }
              setState={moduleStore[`set${item.requestName}`]}
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
              readOnly={readonly}
              width="100%"
              height="40px"
              placeholder={item.name}
              state={
                typeof moduleStore[item.requestName] === "object"
                  ? moduleStore[item.requestName].name
                  : moduleStore[item.requestName]
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
                moduleStore[item.requestName] === searchBoxType ||
                moduleStore[item.requestName] === dataSearchBoxType
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
              readOnly={readonly}
              width="100%"
              height="40px"
              placeholder={item.name}
              state={
                typeof moduleStore[item.requestName] === "object"
                  ? moduleStore[item.requestName].name
                  : moduleStore[item.requestName]
              }
              setState={moduleStore[`set${item.requestName}`]}
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
              readOnly={readonly}
              width="100%"
              height="40px"
              title={item.title}
              placeholder1={item.name && item.name.split(" ")[0]}
              placeholder2={item.name && item.name.split(" ")[1]}
              unit={item.unit}
              state={
                typeof moduleStore[item.requestName] === "object"
                  ? moduleStore[item.requestName].name
                  : moduleStore[item.requestName]
              }
              setState={moduleStore[`set${item.requestName}`]}
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

  return (
    <GridContainerStyle>
      {inPutList.map((item, i) =>
        generateInput(item, i, modulestore, readOnly)
      )}
    </GridContainerStyle>
  );
}
