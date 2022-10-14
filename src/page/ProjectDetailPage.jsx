import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectInformationSection from "../organism/ProjectInformationSection";
import ScrollContainer from "../organism/ScrollContainer";
import AttachmentSection from "../organism/AttachmentSection";
import projectStore from "../store/projectStore";
import { PageStyle } from "../Style";
import Button from "../atom/Button";
import RouteSection from "../organism/RouteSection";
import SearchBox from "../organism/SearchBox";
import DataSearchBox from "../organism/DataSearchBox";
import { usegetProjectData } from "../utility/Utility";

export default function ProjectDetailPage() {
  // 페이지 상태 관리
  const {
    // route
    isRouteActive,
    routeNumber,
    routeData,
    setrouteData,
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

    // getData
    setattachmentFileArray,
    setattachmentIdArray,
    setattachmentCommentArray,
    setattachmentTagArray,
    setattachmentOriginArray,
    setattachmentDateArray,
    setattachmentUploaderArray,
    setdeletedFileIdArray,
    setattachmentModifiedAtArray,
  } = projectStore();
  const params = useParams();
  const getprojectData = usegetProjectData(
    params.projectId,
    setattachmentFileArray,
    setattachmentIdArray,
    setattachmentCommentArray,
    setattachmentTagArray,
    setattachmentOriginArray,
    setattachmentDateArray,
    setattachmentUploaderArray,
    setdeletedFileIdArray,
    setattachmentModifiedAtArray
  );
  useEffect(() => {
    getprojectData();
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
      >
        <ProjectInformationSection readOnly />
        <AttachmentSection
          title="Project Attachment"
          moduleStore={projectStore}
          readOnly
        />
        <br />
        {!isRouteActive && (
          <Button
            backgroundColor="var(--eciBlue)"
            width="100%"
            height="30px"
            color="white"
            // onClick={saveProject}
            condition={!!true}
          >
            Save and Route
          </Button>
        )}
        <br />
        <RouteSection
          activate
          routeNumber={routeNumber}
          setrouteRef={setrouteRef}
          routeData={routeData}
          setrouteData={setrouteData}
          readOnly
        />
      </ScrollContainer>
    </PageStyle>
  );
}
