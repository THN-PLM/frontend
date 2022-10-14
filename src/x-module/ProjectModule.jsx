import React from "react";
import { Outlet } from "react-router-dom";
import ModuleTopNavigation from "../molecule/ModuleTopNavigation";
import { ModuleStyle } from "../Style";
import projectStore from "../store/projectStore";
import LoadingBox from "../organism/LoadingBox";
import LoadingArrowAnimation from "../molecule/LoadingArrowAnimation";
import BoldText from "../atom/BoldText";

export default function ProjectModule() {
  const { isLoading } = projectStore();
  return (
    <ModuleStyle>
      <LoadingBox isLoading={isLoading}>
        <LoadingArrowAnimation />
        <BoldText fontSize="26px" color="var(--eciBlue)">
          S a v i n g
        </BoldText>
        <br />
        <br />
        Please wait while we set
        <br />
        thing up for you!
      </LoadingBox>{" "}
      <ModuleTopNavigation
        title="Project"
        navList={[
          {
            name: "List",
            to: "/project/list",
          },
          {
            name: "Add New Project",
            to: "/project/add",
          },
        ]}
      />
      <Outlet />
    </ModuleStyle>
  );
}
