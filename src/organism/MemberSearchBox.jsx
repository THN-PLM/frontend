import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import TableIndexRow from "../atom/TableIndexRow";
import TableRow from "../atom/TableRow";
import MemberRow from "../molecule/MemberRow";
import PaginationTable from "../molecule/PaginationTable";
import SearchBar from "../molecule/SearchBar";
import defaultStore from "../store/defaultStore";
import { tokenAxios } from "../utility/Utility";

const MemberSearchBoxStyle = styled.div`
  width: calc(${(props) => props.width});
  height: calc(${(props) => props.height});
  padding: 5% 10%;
  display: ${(props) => (props.isActive ? "" : "none")};
  .tableSection {
    height: 80%;
  }
`;

export default function MemberSearchBox({
  width,
  height,
  isActive,
  // moduleStore,
}) {
  const { members, setmembers, targetMember, deletemember } = defaultStore();
  const [searchText, setSearchText] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [pageNum, setPageNum] = useState("0");
  const [rowsPerPage, setrowsPerPage] = useState(7);
  const [dataList, setdataList] = useState([]);
  const [index, setindex] = useState([]);
  let widthArray = new Array(index.length).fill(4); //  나중에 고정값으로 바꾸기
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

      return (
        <MemberRow
          key={item.id}
          data={item}
          setmemberArray={(value) => {
            setmembers(value, targetMember);
          }}
          deletemember={(id) => {
            deletemember(id, targetMember);
          }}
          members={
            members[targetMember] && members[targetMember].map((id) => id.id)
          }
        />
      );
    });
  useEffect(() => {
    setdataList([]);
    if (isActive) {
      tokenAxios
        .get(
          `members/page?size=${rowsPerPage}&page=${pageNum}&name=${searchText}`
        )
        .then((res) => {
          setdataList(res.data.contents);
          setTotalPage(res.data.totalPages);
          setindex(res.data.indexes);
        });
    }
  }, [pageNum, rowsPerPage, targetMember, searchText, isActive]);
  useEffect(() => {
    setPageNum("0");
  }, [searchText]);
  return (
    <MemberSearchBoxStyle width={width} height={height} isActive={isActive}>
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
    </MemberSearchBoxStyle>
  );
}
