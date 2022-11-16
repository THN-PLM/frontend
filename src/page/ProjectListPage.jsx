import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PageStyle, ListPageStyle } from "../Style";
import TableIndexRow from "../atom/TableIndexRow";
import TableRow from "../atom/TableRow";

import PaginationTable from "../molecule/PaginationTable";
import { tokenAxios, usePageConditionList } from "../utility/Utility";
import SearchBar from "../molecule/SearchBar";
import DropdownButton from "../organism/DropdownButton";
import OptionModal from "../molecule/OptionModal";
import ProjectManageButton from "../molecule/ProjectManageButton";

export default function ProjectListPage() {
  const navigate = useNavigate();
  const [pageCondition, setpageCondition, projectListData] =
    usePageConditionList("project", "searchText", "isManager");
  console.log(projectListData);
  const projectRowList =
    projectListData &&
    projectListData.map((item, i) => {
      return (
        <TableRow
          key={i}
          onClick={
            pageCondition.isManager
              ? () => {
                  navigate(`project/edit/${item.id}`);
                }
              : () => {}
          }
          itemArray={[
            item.itemNumber,
            item.projectName,
            item.type,
            "계획시작일", // 여기나오면 하기
            "계획종료일",
            "생산 조직",
            "발주처",
            "Phase",
            "Status",
            pageCondition.isManager && (
              <ProjectManageButton
                // disable={item.delete}
                onClick={async () => {
                  await tokenAxios.put(`/project-delete/${item.id}`);
                }}
              >
                삭제
              </ProjectManageButton>
            ),
            pageCondition.isManager && (
              <ProjectManageButton
                // disable={item.delete}
                onClick={async () => {
                  await tokenAxios.put(`/project-pending/${item.id}`);
                }}
              >
                Drop
              </ProjectManageButton>
            ),
          ]}
          widthArray={
            pageCondition.isManager
              ? [4, 5, 4, 4, 4, 3, 3, 3, 5, 4, 4]
              : [4, 5, 4, 4, 4, 3, 3, 3, 5]
          }
        />
      );
    });

  return (
    <PageStyle>
      <ListPageStyle>
        <div className="searchSection">
          <SearchBar
            width="170px"
            height="30px"
            placeholder="Search Items"
            state={pageCondition.searchText}
            setState={(val) => {
              setpageCondition("searchText", val);
            }}
          />
          <div className="filter">
            <DropdownButton
              buttonTitle="Filters"
              width="80px"
              height="30px"
              right
              title="Refine Results"
              uiObject={{
                "Project Manager": {
                  "Show Every Project": false,
                  "Managing Projects": true,
                },
              }}
              setStateList={[
                (val) => {
                  setpageCondition("isManager", val);
                },
              ]}
            />
          </div>
        </div>
        <PaginationTable
          width="100%"
          minHeight="300px"
          innerWidth="100%"
          totalPage={pageCondition.totalPage}
          rowsPerPageDefault={10}
          pageNum={pageCondition.pageNum}
          setRowsPerPage={(val) => {
            setpageCondition("rowsPerPage", val);
          }}
          rowsPerPage={pageCondition.rowsPerPage}
          setPageNum={(val) => {
            setpageCondition("pageNum", val);
          }}
          noshadow
        >
          <TableIndexRow
            itemArray={[
              "Number",
              "Project Name",
              "개발 유형",
              "계획시작일",
              "계획종료일",
              "생산 조직",
              "발주처",
              "Phase",
              "Status",
              pageCondition.isManager && "삭제 여부",
              pageCondition.isManager && "Drop 여부",
            ]}
            widthArray={
              pageCondition.isManager
                ? [4, 5, 4, 4, 4, 3, 3, 3, 5, 4, 4]
                : [4, 5, 4, 4, 4, 3, 3, 3, 5]
            }
            width="100%"
          />
          {projectRowList}
        </PaginationTable>
      </ListPageStyle>
    </PageStyle>
  );
}
