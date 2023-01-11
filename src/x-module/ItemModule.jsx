import React from "react";
import { Outlet } from "react-router-dom";
import ModuleTopNavigation from "../molecule/ModuleTopNavigation";
import { ModuleStyle } from "../Style";
import LoadingBox from "../organism/LoadingBox";
import LoadingArrowAnimation from "../molecule/LoadingArrowAnimation";
import BoldText from "../atom/BoldText";
import defaultStore from "../store/defaultStore";

export default function ItemModule() {
  const { isLoading } = defaultStore();
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
        title="Item"
        navList={[
          {
            name: "List",
            to: "/project/list",
          },
        ]}
      />
      <Outlet />
    </ModuleStyle>
  );
}
