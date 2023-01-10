import React, { useEffect, useRef, useState } from "react";
import ProjectInformationSection from "../organism/ProjectInformationSection";
import ScrollContainer from "../organism/ScrollContainer";
import AttachmentSection from "../organism/AttachmentSection";
import projectStore from "../store/projectStore";
import { PageStyle } from "../Style";
import Button from "../atom/Button";
import RouteInitSection from "../organism/RouteInitSection";
import SearchBox from "../organism/SearchBox";
import DataSearchBox from "../organism/DataSearchBox";
import { appendProjectForm, useSave, usetempSave } from "../utility/Utility";
import MemberSearchBox from "../organism/MemberSearchBox";
import ItemInformationSection from "../organism/ItemInformationSection";

export default function ProjectAddPage() {
  // 페이지 상태 관리
  const {
    isRouteActive,
    //  route
    type,
    id,
    // searchBox
    dataSearchBoxType,
    setdataSearchBoxProperty,
    searchBoxType,
    setsearchBoxProperty,
    // ref
    informationRef,
    attachmentRef,
    routeRef,
    initProjectModule,
    getisConditionFullfill,
  } = projectStore();
  const projectstore = projectStore();
  const searchBoxComponentArray = [
    // <SearchBox
    //   key={0}
    //   width="100%"
    //   height="100vh - 218px"
    //   type={searchBoxType}
    //   setproperty={setsearchBoxProperty}
    //   propertyIndex={targetMember}
    //   members={members}
    //   deletememberArray={deletemember}
    // />,
    <MemberSearchBox
      key={0}
      width="100%"
      height="100vh - 218px"
      isActive={searchBoxType === "members"}
      moduleStore={projectstore}
    />,
    <DataSearchBox
      key={1}
      width="100%"
      setstate={(val) => {
        setdataSearchBoxProperty(dataSearchBoxType, val);
      }}
      type={dataSearchBoxType}
    />,
  ];
  const saveProject = useSave(
    "project",
    appendProjectForm,
    projectstore
    // edit,
  );
  const saveTempProject = usetempSave(
    "project",
    appendProjectForm,
    projectstore
  );
  // 페이지 탈출시 init
  useEffect(() => {
    return () => {
      initProjectModule();
    };
  }, []);
  return (
    <PageStyle>
      <ScrollContainer
        isWideScroll
        scrollRefList={[
          [informationRef, "Project Information"],
          [attachmentRef, "Project Attachment"],
          [routeRef, "Route Information"],
        ]}
        searchBoxComponent={searchBoxComponentArray}
        tempButtonTitle="Save as Draft"
        tempButtonOnclick={saveTempProject}
      >
        <ItemInformationSection />
        <ProjectInformationSection readOnly={isRouteActive} />
        <AttachmentSection
          title="Project Attachment"
          readOnly={isRouteActive}
          moduleStore={projectStore}
        />
        <br />
        {!isRouteActive && (
          <Button
            backgroundColor="var(--eciBlue)"
            width="100%"
            height="30px"
            color="white"
            onClick={saveProject}
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
          moduleStore={projectstore}
          afterUrl="/project/list"
        />
      </ScrollContainer>
    </PageStyle>
  );
}
