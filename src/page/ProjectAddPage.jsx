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
import { useappendProjectForm, useSave } from "../utility/Utility";

export default function ProjectAddPage() {
  // 페이지 상태 관리
  const {
    isRouteActive,
    // searchBox
    DataSearchBoxType,
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
  } = projectStore();

  const projectstore = projectStore();
  const saveProject = useSave(
    "project",
    useappendProjectForm,
    projectstore
    // temp,
    // edit,
  );
  const saveTempProject = useSave(
    "project",
    useappendProjectForm,
    projectstore,
    true
    // edit,
  );
  // 페이지 탈출시 init
  useEffect(() => {
    // init
  }, []);
  return (
    <PageStyle>
      <ScrollContainer
        scrollRefList={[
          [informationRef, "Project Information"],
          [attachmentRef, "Project Attachment"],
          [routeRef, "Route Information"],
        ]}
        searchBoxComponent={[
          <SearchBox
            key={0}
            width="100%"
            height="100vh - 218px"
            type={searchBoxType}
            setproperty={setsearchBoxProperty}
            propertyIndex={targetMember}
            members={members}
            deletememberArray={deletemember}
          />,
          <DataSearchBox
            key={1}
            width="100%"
            activate={DataSearchBoxType}
            setstate={(val) => setDataSearchBoxProperty(DataSearchBoxType, val)}
            type={DataSearchBoxType}
          />,
        ]}
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
            condition={!!true}
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
