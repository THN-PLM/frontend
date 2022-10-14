import React, { useEffect, useRef, useState } from "react";
import LineTitle from "../atom/LineTitle";
import {
  GridContainerStyle,
  PageStyle,
  TempButtonContainerStyle,
} from "../Style";
import AnimationInput from "../molecule/AnimationInput";
import AnimationSearchInput from "../molecule/AnimationSearchInput";
import AnimationSelectBox from "../molecule/AnimationSelectBox";
import projectStore from "../store/projectStore";
import PeriodBox from "../molecule/PeriodBox";
import Table from "../molecule/Table";
import TableIndexRow from "../atom/TableIndexRow";
import TableRow from "../atom/TableRow";
import ModalBox from "./ModalBox";
import Button from "../atom/Button";

export default function ProjectInformationSection({
  readOnly,
  tempButtonTitle,
  tempButtonOnclick,
}) {
  // 상태state
  const [isModalBox, setisModalBox] = useState(false);
  // states from store
  const { projectType, projectPeriod, setsearchBoxType, setinformationRef } =
    projectStore();
  // scroll을 위한 ref관리
  const informationRef = useRef();
  useEffect(() => {
    setinformationRef(informationRef);
  }, []);
  // period에 따라 달라지는 ui 정리
  const periodBox = [];
  return (
    <PageStyle ref={informationRef}>
      <ModalBox isActivate={isModalBox} setisActivate={setisModalBox} />

      <LineTitle
        fontSize="16px"
        color="var(--eciBlue)"
        width="100%"
        height="60px"
      >
        Project Information
      </LineTitle>
      <GridContainerStyle rows={1}>
        <AnimationInput
          width="100%"
          height="40px"
          placeholder="Project Number"
          //   state={clientItemNumber}
          //   setState={setclientItemNumber}
          readOnly={readOnly}
          required
        />

        <AnimationSelectBox
          width="100%"
          height="40px"
          placeholder="개발 유형"
          //   state={projectType.id}
          //   setState={setprojectType}
          required
          readOnly={readOnly}
        >
          <option value="1">양산개발</option>
          <option value="2">선행개발</option>
        </AnimationSelectBox>
      </GridContainerStyle>
      {/* 양산개발일 때 projectPeriod */}
      {projectType && (
        <PeriodBox
          leftText="Project Period"
          title={projectType === "1" ? "All도" : "초도"}
          required
          //   startState
          //   startSetState
          //   overState
          //   overSetState
          readOnly={projectPeriod > 1}
        />
      )}
      {projectPeriod > 1 && (
        <PeriodBox
          title="Proto"
          required
          //   startState
          //   startSetState
          //   overState
          //   overSetState
          readOnly={projectPeriod > 1}
        />
      )}
      {projectPeriod > 2 && (
        <PeriodBox
          title="P1"
          required
          //   startState
          //   startSetState
          //   overState
          //   overSetState
          readOnly={projectPeriod > 1}
        />
      )}
      <GridContainerStyle rows={1}>
        <AnimationSearchInput
          width="100%"
          height="40px"
          placeholder="생산조직"
          //   state={carTypeId && carTypeId.name}
          onClick={() => {
            setsearchBoxType("carTypeId");
          }}
          readOnly={readOnly}
        />
        <AnimationSearchInput
          width="100%"
          height="40px"
          placeholder="발주처"
          //   state={carTypeId && carTypeId.name}
          onClick={() => {
            setsearchBoxType("carTypeId");
          }}
          readOnly={readOnly}
        />
        {/* <AnimationSearchInput
          width="100%"
          height="40px"
          placeholder="차종"
          //   state={carTypeId && carTypeId.name}
          onClick={() => {
            setsearchBoxType("carTypeId");
          }}
          required
          readOnly={readOnly}
        /> */}
      </GridContainerStyle>
      <br />
      <div>
        <AnimationSearchInput
          required
          width="100%"
          height="40px"
          placeholder="Product"
          onClick={() => {
            setisModalBox(true);
          }}
          backgroundColor="var(--eciBlue)"
        />
        <Table width="100%" minHeight="120px">
          <TableIndexRow
            widthArray={[3, 3, 4, 2]}
            itemArray={["제품번호", "제품명", "제품군", "차종"]}
          />
          {[1] &&
            [1].map((item, i) => {
              return (
                <TableRow
                  key={i}
                  widthArray={[3, 3, 4, 2]}
                  itemArray={["제품번호", "제품명", "제품군", "차종"]}
                />
              );
            })}
        </Table>
      </div>
    </PageStyle>
  );
}
