import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import TableIndexRow from "../atom/TableIndexRow";
import TableRow from "../atom/TableRow";
import MemberRow from "../molecule/MemberRow";
import PaginationTable from "../molecule/PaginationTable";
import SearchBar from "../molecule/SearchBar";
import { tokenAxios } from "../utility/Utility";

const SearchBoxStyle = styled.div`
  width: calc(${(props) => props.width});
  height: calc(${(props) => props.height});
  padding: 5% 10%;
  display: ${(props) => (props.type ? "" : "none")};
  .tableSection {
    height: 80%;
  }
`;

export default function SearchBox({
  width,
  height,
  type,
  setproperty,
  propertyIndex, // 멤버처럼 인덱스를 건드려야 할 경우
}) {
  const [searchText, setSearchText] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [pageNum, setPageNum] = useState("0");
  const [rowsPerPage, setrowsPerPage] = useState(7);
  const [dataList, setdataList] = useState([]);
  const [index, setindex] = useState([]);
  let widthArray = new Array(index.length).fill(4);
  widthArray = index[0] === "id" ? [1, ...widthArray] : widthArray;

  const indexRow = (
    <TableIndexRow
      widthArray={widthArray}
      itemArray={index}
      // width={index.length > 5 ? "1800px" : ""}
    />
  );

  const itemRowList =
    dataList &&
    dataList.map((item, i) => {
      const itemArray = Object.values(item).map((itm) => {
        if (typeof itm === "object" && itm !== null) {
          return itm.value ? itm.value : itm.name;
        }

        return itm;
      });
      // if (type === "item-candidates") {
      //   itemArray = [itemArray[0], itemArray[1]];
      // }

      return (
        <TableRow
          key={i}
          onClick={() => {
            setproperty(type, item, propertyIndex && propertyIndex);
          }}
          widthArray={widthArray}
          // width={index.length > 5 ? "1800px" : ""}
          itemArray={itemArray}
        />
      );
    });

  useEffect(() => {
    setdataList([]);
    if (type) {
      tokenAxios
        .get(`${type}?size=${rowsPerPage}&page=${pageNum}&name=${searchText}`)
        .then((res) => {
          if (type === "releaseCoId" || type === "members") {
            setdataList([...res.data.contents]);
            setTotalPage(res.data.totalPages);
            setindex(res.data.indexes);
          } else if (type === "item-candidates") {
            setdataList([...res.data.content]);
            setTotalPage(res.data.totalPages);
            setindex(["itemNumber", "itemName"]);
          } else {
            setdataList([...res.data.result.data.content]);
            setTotalPage(res.data.result.data.totalPages);
            setindex(res.data.result.data.indexes);
          }
        });
    }
  }, [
    setdataList,
    tokenAxios,
    type,
    pageNum,
    rowsPerPage,
    propertyIndex,
    searchText,
  ]);
  useEffect(() => {
    setPageNum("0");
  }, [searchText]);
  return (
    <SearchBoxStyle width={width} height={height} type={type}>
      <div className="searchSection">
        <SearchBar
          width="170px"
          height="30px"
          placeholder="Search Items"
          state={searchText}
          setState={setSearchText}
        />
        <br />
        <br />
      </div>
      <div className="tableSection">
        <PaginationTable
          height="100%"
          noshadow
          totalPage={totalPage}
          setRowsPerPage={setrowsPerPage}
          rowsPerPageDefault={7}
          pageNum={pageNum}
          rowsPerPage={rowsPerPage}
          setpageNum={setPageNum}
        >
          {indexRow}
          {itemRowList}
        </PaginationTable>
      </div>
    </SearchBoxStyle>
  );
}
