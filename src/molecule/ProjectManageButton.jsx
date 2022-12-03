import React from "react";
import styled from "styled-components";

const ProjectManageButtonStyle = styled.div`
  width: 80%;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border-radius: 4px;
  border: solid 1px var(--eciBlue);
  background-color: #f2f4f8;
  color: var(--eciBlue);
  font-weight: 600;
  opacity: ${(props) => (props.disable ? 0.4 : 1)};
  cursor: ${(props) => (props.disable ? "" : "pointer")};
`;
export default function ProjectManageButton({ children, onClick }) {
  return (
    <ProjectManageButtonStyle
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}
    </ProjectManageButtonStyle>
  );
}
