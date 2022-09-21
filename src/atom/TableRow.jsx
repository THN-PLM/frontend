import React from "react";
import styled from "styled-components";

const TableRowStyle = styled.div`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: 40px;
  padding: 0 5px;
  border-bottom: ${(props) =>
    props.noBorder ? "" : "solid var(--deemGray) 1px"};

  display: grid;
  grid-template-columns: ${(props) => props.widthRatio};
  grid-template-rows: 1;
  align-content: center;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : ""};
  font-size: 13px;
  font-family: "Helvetica";
  color: var(--deemGray);
  cursor: ${(props) => (props.onClick ? "pointer" : "")};
  .gridItsm {
    width: 100%;
    padding: 0 3px;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .gridItem {
    width: 100%;
    padding: 0 3px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-decoration: none;
    line-height: 40px;
  }
`;
export default function TableRow({
  widthArray,
  itemArray,
  noBorder,
  onClick,
  width,
  backgroundColor,
}) {
  const row = itemArray.map((item, i) => (
    <div key={i} className="gridItsm">
      <span
        className="gridItem"
        title={
          item && (typeof item === "string" || typeof item === "number")
            ? item.toString()
            : " "
        }
      >
        {item}
      </span>
    </div>
  ));
  const widthRatio = widthArray.map((num) => `${num}fr `);

  return (
    <TableRowStyle
      length={widthArray.length}
      noBorder={noBorder}
      onClick={onClick}
      widthRatio={widthRatio}
      width={width}
      backgroundColor={backgroundColor}
    >
      {row}
    </TableRowStyle>
  );
}
