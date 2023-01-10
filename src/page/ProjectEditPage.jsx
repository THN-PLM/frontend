import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import ProjectInformationSection from "../organism/ProjectInformationSection";
import ScrollContainer from "../organism/ScrollContainer";
import AttachmentSection from "../organism/AttachmentSection";
import projectStore from "../store/projectStore";
import { PageStyle } from "../Style";
import Button from "../atom/Button";
import RouteInitSection from "../organism/RouteInitSection";
import SearchBox from "../organism/SearchBox";
import DataSearchBox from "../organism/DataSearchBox";
import {
  appendProjectForm,
  usegetProjectData,
  useSave,
} from "../utility/Utility";
import RouteSection from "../organism/RouteSection";
import defaultStore from "../store/defaultStore";

export default function ProjectEditPage() {
  // 페이지 상태 관리
  const {
    isLoading,
    setisLoading,

    // routeInit
    targetMember,
    settargetMember,
    members,
    setsearchBoxType,
  } = projectStore();

  const {
    // route
    id,
    type,
    // searchBox

    deletemember,
    // ref
    informationRef,
    attachmentRef,
    routeRef,
    //  etc
    initProjectModule,
  } = projectStore();
  const {
    isRouteActive,

    dataSearchBoxType,
    setdataSearchBoxProperty,
    searchBoxType,
    setsearchBoxProperty,
    initDefaultStore,
  } = defaultStore();
  const projectstore = projectStore();
  const params = useParams();
  const [isRouteInit, setisRouteInit] = useState(true);
  const [isRejecting, setisRejecting] = useState(false);
  const saveProject = useSave("project", appendProjectForm, projectstore, true);
  const saveTempProject = useSave(
    "project",
    appendProjectForm,
    projectstore
    // true
  );

  const getprojectData = usegetProjectData(
    params.projectId,
    projectstore,
    (data) => {
      // setisRouteActive(data.te);
      // setisRouteInit(data);
      //  setisRejecting()
    }
  );
  //   isRouteActive settings.
  //  temp save -> isRoute false , route init
  //  rejected - first => isRoute false , route init ?
  //  save and quit ->isRoute true , route init
  //  flow from list -> isRoute false , route init ?
  //  review -> isROute true , route
  //  rejected - after -> isRoute false , route
  useEffect(() => {
    getprojectData();
    return () => {
      initProjectModule();
      initDefaultStore();
    };
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
            activate={dataSearchBoxType}
            setstate={(val) => setdataSearchBoxProperty(dataSearchBoxType, val)}
            type={dataSearchBoxType}
          />,
        ]}
        tempButtonTitle="Save as Draft"
      >
        <ProjectInformationSection readOnly={isRouteActive} />
        <AttachmentSection
          title="Project Attachment"
          readOnly={isRouteActive}
          moduleStore={projectStore}
          editMode
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
        {isRouteInit ? (
          <RouteInitSection
            activate={isRouteActive}
            routeType="Proj"
            itemId={id}
            typeId={type}
            moduleStore={projectstore}
            afterUrl="/project/list"
          />
        ) : (
          <RouteSection
            activate={isRouteActive}
            readOnly={!isRouteActive}
            moduleStore={projectstore}
            rejecting={isRejecting}
          />
        )}
      </ScrollContainer>
    </PageStyle>
  );
}
