import React, { useRef } from "react";
import LineTitle from "../atom/LineTitle";
import InputGrid from "../molecule/InputGrid";
import defaultStore from "../store/defaultStore";
import itemStore from "../store/itemStore";
import { PageStyle } from "../Style";
import { itemTopInputList } from "../utility/Source";

export default function PCBInformationSection({ readOnly }) {
  const { setinformationRef } = itemStore();
  const {
    dataSearchBoxType,
    searchBoxType,
    setsearchBoxType,
    setdataSearchBoxType,
  } = defaultStore();
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
    </PageStyle>
  );
}
