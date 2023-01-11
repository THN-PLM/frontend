import React, { useEffect, useRef, useState } from "react";
import ProjectInformationSection from "../organism/ProjectInformationSection";
import ScrollContainer from "../organism/ScrollContainer";
import AttachmentSection from "../organism/AttachmentSection";
import { PageStyle } from "../Style";
import Button from "../atom/Button";
import RouteInitSection from "../organism/RouteInitSection";
import SearchBox from "../organism/SearchBox";
import DataSearchBox from "../organism/DataSearchBox";
import { appendPCBForm, useSave, usetempSave } from "../utility/Utility";
import MemberSearchBox from "../organism/MemberSearchBox";
import defaultStore from "../store/defaultStore";
import PCBStore from "../store/PCBStore";

export default function PCBPage({ type }) {
  // 페이지 상태 관리
  const {
    //  route
    id,

    // ref
    informationRef,
    attachmentRef,
    routeRef,
    initPCBStore,
    getisConditionFullfill,
  } = PCBStore();
  const {
    isRouteActive,
    dataSearchBoxType,
    setdataSearchBoxProperty,
    searchBoxType,
    setsearchBoxProperty,
    initDefaultStore,
    targetMember,
  } = defaultStore();
  const pcbstore = PCBStore();
  const defaultstore = defaultStore();
  const searchBoxComponentArray = [
    <SearchBox
      key={0}
      width="100%"
      height="100vh - 218px"
      type={searchBoxType}
      setproperty={setsearchBoxProperty}
      propertyIndex={targetMember}
    />,
    <MemberSearchBox
      key={1}
      width="100%"
      height="100vh - 218px"
      isActive={searchBoxType === "members"}
      moduleStore={pcbstore}
    />,
    <DataSearchBox
      key={2}
      width="100%"
      setstate={(val) => {
        setdataSearchBoxProperty(dataSearchBoxType, val);
      }}
      type={dataSearchBoxType}
    />,
  ];
  const savePCB = useSave(
    "pcb",
    appendPCBForm,
    pcbstore // edit,
  );
  const saveTempPCB = usetempSave("pcb", appendPCBForm, pcbstore);
  // 페이지 탈출시 init
  useEffect(() => {
    return () => {
      initPCBStore();
      initDefaultStore();
    };
  }, []);

  return (
    <PageStyle>
      <ScrollContainer
        scrollRefList={[
          [informationRef, "PCB Information"],
          [attachmentRef, "PCB Attachment"],
          [routeRef, "Route Information"],
        ]}
        searchBoxComponent={searchBoxComponentArray}
        tempButtonTitle="Save as Draft"
        tempButtonOnclick={saveTempPCB}
      >
        <AttachmentSection
          title="Item Attachment"
          readOnly={isRouteActive}
          moduleStore={pcbstore}
        />
        <br />
        {!isRouteActive && (
          <Button
            backgroundColor="var(--eciBlue)"
            width="100%"
            height="30px"
            color="white"
            onClick={savePCB}
            condition={getisConditionFullfill()}
          >
            Save and Route
          </Button>
        )}
        <br />
        <RouteInitSection
          activate={isRouteActive}
          routeType="Proj"
          itemId={id}
          typeId={type}
          moduleStore={pcbstore}
          afterUrl="/item/list"
        />
      </ScrollContainer>
    </PageStyle>
  );
}
