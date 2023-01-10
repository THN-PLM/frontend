import React, { useRef } from "react";
import LineTitle from "../atom/LineTitle";
import AnimationInput from "../molecule/AnimationInput";
import InputGrid from "../molecule/InputGrid";
import itemStore from "../store/itemStore";
import { PageStyle } from "../Style";
import { itemBottomInputList, itemTopInputList } from "../utility/Source";

export default function ItemInformationSection({ readOnly }) {
  const {
    dataSearchBoxType,
    searchBoxType,
    setsearchBoxType,
    setdataSearchBoxType,
    setinformationRef,
  } = itemStore();
  const itemstore = itemStore();
  const informationRef = useRef();

  return (
    <PageStyle ref={informationRef}>
      <LineTitle
        fontSize="16px"
        color="var(--eciBlue)"
        width="100%"
        height="60px"
      >
        Item Information
      </LineTitle>
      <InputGrid
        readOnly={readOnly}
        modulestore={itemstore}
        inPutList={itemTopInputList}
      />
      <br />
      <br />
      <InputGrid
        readOnly={readOnly}
        modulestore={itemstore}
        inPutList={itemBottomInputList}
      />{" "}
    </PageStyle>
  );
}
