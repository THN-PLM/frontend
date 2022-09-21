import React from "react";
import styled from "styled-components";
import SelectBox from "../atom/SelectBox";
import Table from "./Table";

const PaginationTableStyle = styled.div`
  width: calc(${(props) => props.width});
  height: calc(${(props) => props.height});

  min-height: calc(${(props) => props.minHeight});
`;
const PagePartStyle = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .rowsPerPage {
    width: 150px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    color: var(--deemGray);
    line-height: 50px;
  }
  button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 8px;
    text-align: center;
    border: none;
    outline: none;
    color: var(--deemGray);
    font-weight: 600;
    margin: 0 2px;
    background-color: transparent;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: var(--eciBlueHover);
    color: white;
  }
  .controller {
    display: flex;
  }
`;
const NoResultBox = styled.div`
  font-size: 30px;
  padding: 10%;
`;
export default function PaginationTable({
  width,
  height,
  minHeight,
  children,
  totalPage,
  rowsPerPageDefault,
  pageNum,
  setRowsPerPage,
  setpageNum,
  noshadow,
  innerWidth,
  rowsPerPage,
}) {
  const pageControll = [];
  let limit;
  if (totalPage < 5) {
    limit = totalPage;
  } else if (parseInt(pageNum / 5, 10) === parseInt(totalPage / 5, 10)) {
    limit = totalPage - pageNum + (pageNum % 5);
  } else {
    limit = 5;
  }
  for (let i = 0; i < limit; i += 1) {
    pageControll.push(
      <button
        key={i}
        type="button"
        onClick={() => {
          setpageNum(parseInt(pageNum / 5, 10) * 5 + i);
        }}
        className={
          parseInt(pageNum / 5, 10) * 5 + i === pageNum * 1 ? "current" : ""
        }
      >
        {parseInt(pageNum / 5, 10) * 5 + i + 1}
      </button>
    );
  }
  return (
    <PaginationTableStyle width={width} height={height} minHeight={minHeight}>
      <Table
        noshadow={noshadow}
        width={width}
        height={`${height} - 50px`}
        minHeight={minHeight}
        innerWidth={innerWidth}
      >
        {children}
      </Table>
      <PagePartStyle>
        <div className="rowsPerPage">
          <div> Rows per page</div>
          <SelectBox
            width="50px"
            height="24px"
            setState={setRowsPerPage}
            backgroundColor="inherit"
            color="var(--deemGray)"
            borderColor="var(--deemGray)"
            fontSize="10px"
            state={rowsPerPage}
            defaultValue={7}
          >
            <option value="5">5</option>
            <option value="8">8</option>
            <option value="10">10</option>
          </SelectBox>
        </div>

        <div className="controller">
          <button
            type="button"
            onClick={() => {
              if (pageNum >= 1) {
                setpageNum(pageNum - 1);
              }
            }}
          >
            {"<"}
          </button>
          {pageControll}
          {totalPage < 6 ||
          parseInt(pageNum / 5, 10) === parseInt(totalPage / 5, 10)
            ? ""
            : ". . ."}
          {totalPage < 6 ||
          parseInt(pageNum / 5, 10) === parseInt(totalPage / 5, 10) ? (
            ""
          ) : (
            <button
              type="button"
              onClick={() => {
                setpageNum(totalPage - 1);
              }}
              className={totalPage * 1 === pageNum * 1 ? "current" : ""}
            >
              {totalPage}
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              if (pageNum < totalPage - 1) {
                setpageNum(pageNum + 1);
              }
            }}
          >
            {">"}
          </button>
        </div>
      </PagePartStyle>
    </PaginationTableStyle>
  );
}
