import React from "react";

import AnimationInput from "./AnimationInput";
import AnimationSearchInput from "./AnimationSearchInput";
import AnimationSelectBox from "./AnimationSelectBox";
import UnitInput from "./UnitInput";
import { GridContainerStyle, GridItemContainerStyle } from "../Style";
import { unitObj } from "../utility/Source";

export default function InputGrid({ readOnly, inPutList, modulestore }) {
  //   inputList Item 견본
  //   {
  //     inputType: "normal",
  //     name: "PCB Part Number",
  //     requestName: "PCB Part Number",
  //     required: 1,
  //     choiceFields: [],
  //     gray: true,
  //     size:1,
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
          <GridItemContainerStyle size={item.size}>
            <AnimationInput
              readOnly={readonly}
              key={i}
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
          <GridItemContainerStyle size={item.size}>
            <UnitInput
              key={i}
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
          <GridItemContainerStyle size={item.size}>
            <AnimationSearchInput
              readOnly={readonly}
              key={i}
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
          <GridItemContainerStyle size={item.size}>
            <AnimationSelectBox
              readOnly={readonly}
              key={i}
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

      default:
        resultInput = <div key={i} />;

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
