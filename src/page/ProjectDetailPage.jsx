import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectInformationSection from "../organism/ProjectInformationSection";
import ScrollContainer from "../organism/ScrollContainer";
import AttachmentSection from "../organism/AttachmentSection";
import projectStore from "../store/projectStore";
import { PageStyle } from "../Style";
import RouteSection from "../organism/RouteSection";

import { usegetProjectData } from "../utility/Utility";
import defaultStore from "../store/defaultStore";

export default function ProjectDetailPage() {
  // 페이지 상태 관리
  const {
    // route
    // ref
    informationRef,
    attachmentRef,
    routeRef,
    //  etc
    initProjectModule,
  } = projectStore();
  const { isRouteActive, initDefaultStore } = defaultStore();
  const projectstore = projectStore();
  const params = useParams();
  const getprojectData = usegetProjectData(params.projectId, projectstore);
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
      >
        <ProjectInformationSection readOnly />
        <AttachmentSection
          title="Project Attachment"
          moduleStore={projectstore}
          readOnly
        />
        <br />
        <RouteSection activate readOnly moduleStore={projectstore} />
      </ScrollContainer>
    </PageStyle>
  );
}
