import React from "react";
import { Outlet } from "react-router-dom";
import ModuleTopNavigation from "../molecule/ModuleTopNavigation";
import { ModuleStyle } from "../Style";

export default function ProjectModule() {
  return (
    <ModuleStyle>
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
