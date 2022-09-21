import React from "react";
import styled from "styled-components";

const FilterDropDownBoxstyle = styled.div`
  width: ${(props) => props.width};
  min-height: ${(props) => props.minHeight};
  padding: 8px;
  .title {
    font-size: 14px;
    font-weight: 600;
    height: 20px;
    line-height: 20px;
    border-bottom: solid var(--textGray) 1px;
  }
`;
const BlockStyle = styled.div`
  margin-bottom: 8px;
  .title {
    font-size: 12px;
  }
`;
const CheckListStyle = styled.div`
  display: flex;
  align-items: center;
`;
export default function FilterDropDownBox({ width, minHeight, dataObject }) {
  // dataobject={Project Manager:{state,setState,list}}
  const content =
    dataObject &&
    Object.keys(dataObject).map((key) => {
      const checkList =
        dataObject[key] &&
        dataObject[key].list.map((item) => {
          return <CheckListStyle />;
        });
      return (
        <BlockStyle>
          <div className="subtitle">{key}</div>
          {content}
        </BlockStyle>
      );
    });
  return (
    <FilterDropDownBoxstyle width={width} minHeight={minHeight}>
      FilterDropDownBox
    </FilterDropDownBoxstyle>
  );
}
