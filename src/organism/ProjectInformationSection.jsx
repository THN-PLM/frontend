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
import DataSearchBox from "./DataSearchBox";
import Input from "../atom/Input";

export default function ProjectInformationSection({
  readOnly,
  tempButtonTitle,
  tempButtonOnclick,
}) {
  // 상태state
  const [isModalBox, setisModalBox] = useState(false);
  // states from store
  const {
    dataSearchBoxType,
    setsearchBoxType,
    setdataSearchBoxType,
    setinformationRef,
    type,
    period,
    number,
    name,
    allDoStartPeriod,
    allDoOverPeriod,
    protoStartPeriod,
    protoOverPeriod,
    p1StartPeriod,
    p1OverPeriod,
    p2StartPeriod,
    p2OverPeriod,
    mStartPeriod,
    mOverPeriod,
    productId,
    buyerOrganization,
    produceOrganization,
    carTypeId,
    settype,
    setperiod,
    setnumber,
    setname,
    setallDoStartPeriod,
    setallDoOverPeriod,
    setprotoStartPeriod,
    setprotoOverPeriod,
    setp1StartPeriod,
    setp1OverPeriod,
    setp2StartPeriod,
    setp2OverPeriod,
    setmStartPeriod,
    setmOverPeriod,
    setproductId,
    setbuyerOrganization,
    setproduceOrganization,
    setcarTypeId,
  } = projectStore();
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
      <Input
        state={name}
        setState={setname}
        fontSize="16px"
        placeholder="Type Project Name"
        readOnly={readOnly}
      />
      <br />
      <br />
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
          state={number}
          setState={setnumber}
          readOnly
          required
          backgroundColor="var(--textGray)"
        />

        <AnimationSelectBox
          width="100%"
          height="40px"
          placeholder="개발 유형"
          state={type}
          setState={settype}
          required
          readOnly={readOnly}
        >
          <option value="1">양산개발</option>
          <option value="2">선행개발</option>
        </AnimationSelectBox>
      </GridContainerStyle>
      {/* 양산개발일 때 period */}
      {type && (
        <PeriodBox
          leftText="Project Period"
          title={type === "1" ? "All도" : "초도"}
          required
          startState={type === "1" ? allDoStartPeriod : mStartPeriod}
          startSetState={type === "1" ? setallDoStartPeriod : setmStartPeriod}
          overState={type === "1" ? allDoOverPeriod : mOverPeriod}
          overSetState={type === "1" ? setallDoOverPeriod : setmOverPeriod}
          readOnly={readOnly || period > 1}
        />
      )}
      {period > 1 && (
        <PeriodBox
          title="Proto"
          required
          startState={protoStartPeriod}
          startSetState={setprotoStartPeriod}
          overState={protoOverPeriod}
          overSetState={setprotoOverPeriod}
          readOnly={readOnly || period > 2}
        />
      )}
      {period > 2 && (
        <PeriodBox
          title="P1"
          required
          startState={p1StartPeriod}
          startSetState={setp1StartPeriod}
          overState={p1OverPeriod}
          overSetState={setp1OverPeriod}
          readOnly={readOnly || period > 3}
        />
      )}
      <GridContainerStyle rows={1}>
        <AnimationSearchInput
          width="100%"
          height="40px"
          placeholder="생산조직"
          isNow={dataSearchBoxType === "produceOrganization"}
          state={produceOrganization.history2 || ""}
          onClick={() => {
            // setsearchBoxType("");
            setdataSearchBoxType("produceOrganization");
          }}
          readOnly={readOnly}
        />
        <AnimationSearchInput
          width="100%"
          height="40px"
          placeholder="발주처"
          isNow={dataSearchBoxType === "buyerOrganization"}
          state={buyerOrganization.history2 || ""}
          onClick={() => {
            // setsearchBoxType();
            setdataSearchBoxType("buyerOrganization");
          }}
          readOnly={readOnly}
        />
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
          readOnly={readOnly}
        />
        <Table width="100%" minHeight="120px">
          <TableIndexRow
            widthArray={[3, 3, 6]}
            itemArray={["제품번호", "제품명", "제품군"]}
          />
          {[1] &&
            [1].map((item, i) => {
              return (
                <TableRow
                  key={i}
                  widthArray={[3, 3, 6]}
                  itemArray={["제품번호", "제품명", "제품군"]}
                />
              );
            })}
        </Table>
      </div>
    </PageStyle>
  );
}
