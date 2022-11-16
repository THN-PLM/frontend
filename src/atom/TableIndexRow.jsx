import React from "react";
import styled from "styled-components";
import BoldText from "./BoldText";

const TableIndexRowStyle = styled.div`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: calc(${(props) => (props.height ? props.height : "50px")});
  padding: 12px 10px;
  border-bottom: ${(props) =>
    props.noBorder ? "" : "solid var(--eciBlue) 2px"};
  border-radius: 10px 10px 0 0;
  display: grid;
  grid-template-columns: ${(props) => props.widthRatio};
  grid-template-rows: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "transparent"};
`;
export default function TableIndexRow({
  widthArray,
  itemArray,
  width,
  height,
  noBorder,
  backgroundColor,
}) {
  const row = itemArray.map((item, i) => (
    <BoldText key={i} fontSize="10px" color="var(--eciBlue)" width={width}>
      {item}
    </BoldText>
  ));
  const widthRatio = widthArray.map((num) => `${num}fr `);

  return (
    <TableIndexRowStyle
      noBorder={noBorder}
      widthRatio={widthRatio}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
    >
      {row}
    </TableIndexRowStyle>
  );
}
