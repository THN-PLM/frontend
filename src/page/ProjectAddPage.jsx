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
import { appendProjectForm, useSave } from "../utility/Utility";

export default function ProjectAddPage() {
  // 페이지 상태 관리
  const {
    isRouteActive,
    // searchBox
    dataSearchBoxType,
    setDataSearchBoxProperty,
    searchBoxType,
    setsearchBoxProperty,
    deletemember,
    // ref
    informationRef,
    attachmentRef,
    routeRef,
    setrouteRef,
    // routeInit
    targetMember,
    settargetMember,
    members,
    setsearchBoxType,
    initProjectModule,
    getisConditionFullfill,
  } = projectStore();
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
    <DataSearchBox
      key={1}
      width="100%"
      setstate={(val) => setDataSearchBoxProperty(dataSearchBoxType, val)}
      type={dataSearchBoxType}
    />,
  ];
  const projectstore = projectStore();
  const saveProject = useSave(
    "project",
    appendProjectForm,
    projectstore
    // temp,
    // edit,
  );
  const saveTempProject = useSave(
    "project",
    appendProjectForm,
    projectstore,
    true
    // edit
  );
  // 페이지 탈출시 init
  useEffect(() => {
    initProjectModule();
  }, []);
  return (
    <PageStyle>
      <ScrollContainer
        scrollRefList={[
          [informationRef, "Project Information"],
          [attachmentRef, "Project Attachment"],
          [routeRef, "Route Information"],
        ]}
        searchBoxComponent={searchBoxComponentArray}
        tempButtonTitle="Save as Draft"
        tempButtonOnclick={saveTempProject}
      >
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
            condition={getisConditionFullfill}
          >
            Save and Route
          </Button>
        )}
        <br />
        <RouteInitSection
          activate={isRouteActive}
          //   itemType={typeId}
          setrouteRef={setrouteRef}
          //   itemId={itemId}
          setsearchBoxType={setsearchBoxType}
          targetMember={targetMember}
          settargetMember={settargetMember}
          members={members}
        />
      </ScrollContainer>
    </PageStyle>
  );
}
