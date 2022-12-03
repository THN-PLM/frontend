import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TableIndexRow from "../atom/TableIndexRow";
import TableRow from "../atom/TableRow";
import CategorizedTree from "../molecule/CategorizedTree";
import SearchBar from "../molecule/SearchBar";
import Table from "../molecule/Table";
import { tokenAxios } from "../utility/Utility";

const DataSearchBoxStyle = styled.div`
  width: calc(${(props) => props.width});
  height: calc(${(props) => props.height});

  padding-top: 24px;
  display: flex;
  display: ${(props) => (props.activate ? "" : "none")};
  .left {
    margin-left: 24px;
  }
  .right {
    margin-left: 24px;
    width: 100%;
  }
`;
function DataSearchBox({ width, height, setstate, document, type }) {
  const [classification, setclassification] = useState([]);
  const [selectedClassArray, setselectedClassArray] = useState([]);
  const [searchText, setsearchText] = useState("");
  const itemCategoryList =
    classification &&
    classification.map((item, i) => {
      return (
        <CategorizedTree
          key={i}
          width="120px"
          name={item.name}
          lv2Data={item.c2SelectDtos}
          setselectedClassArray={(val) => {
            setselectedClassArray(val);
          }}
          lv2Only={document}
        />
      );
    });
  const itemRowList =
    Array.isArray(selectedClassArray) &&
    selectedClassArray.map((item, i) => {
      return (
        <TableRow
          key={i}
          onClick={() => {
            setstate({
              value: item.value,
              classification: item.classification,
              tag: item.tag ? item.tag : "",
              id: item.id,
              history2: item.value,
            });
          }}
          widthArray={[1, 1, 1]}
          itemArray={[
            ...(item.value && item.value.split("/")),
            item.tag && item.tag.name,
          ]}
        />
      );
    });

  const getItemTreeData = async (dtype) => {
    const response = await tokenAxios.get(`classification/${dtype}`);
    setclassification(response.data.result.data);
  };

  const searchFromTree = (Data, Textt) => {
    const tempClassArr = [];
    const callTree = (data, text) => {
      if (data) {
        data.forEach((item) => {
          if (item.value && item.value.match(text) && item.last === 1) {
            const newVal = {
              value: item.value,
              classification: item.classification,
              tag: item.c3SelectDtos && item.c3SelectDtos[0],
            };
            if (document) {
              if (item.c3SelectDtos && item.c3SelectDtos[0]) {
                tempClassArr.push(newVal);
              }
            } else {
              tempClassArr.push(newVal);
            }
          }
          const children = [item.c2SelectDtos, item.c3SelectDtos].filter(
            (a) => a && a[0]
          );
          callTree(children[0], text);
        });
      }
    };
    callTree(Data, Textt);
    setselectedClassArray(tempClassArr);
  };
  useEffect(() => {
    setsearchText("");
    setselectedClassArray([]);
    if (type) {
      getItemTreeData(type);
    }
  }, [type]);
  useEffect(() => {
    if (searchText) {
      searchFromTree(classification, searchText);
    }
  }, [searchText]);

  return (
    <DataSearchBoxStyle width={width} height={height} activate={type}>
      <div className="left">{itemCategoryList}</div>
      <div className="right">
        <div className="searchPart">
          <SearchBar
            width="170px"
            height="30px"
            placeholder="Search Items"
            state={searchText}
            setState={setsearchText}
          />
          <br />
        </div>
        <br />
        <Table width="100%" minHeight="200px">
          <TableIndexRow
            widthArray={[1, 1, 1]}
            itemArray={
              ["인덱스"] // 이제 백에서 인덱스도 받아와
            }
          />
          {itemRowList}
        </Table>
      </div>
    </DataSearchBoxStyle>
  );
}
export default React.memo(DataSearchBox);
