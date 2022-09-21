import React, { useRef } from "react";
import ScrollContainer from "../organism/ScrollContainer";
import { PageStyle } from "../Style";

export default function ProjectAddPage() {
  const ref = useRef();
  return (
    <PageStyle>
      <ScrollContainer
        scrollRefList={[
          ["ProjectInformation"],
          ["Project Attachment"],
          ["RouteInformation"],
        ]}
      />
    </PageStyle>
  );
}
