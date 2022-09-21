import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const ModuleTopAnimationStyle = styled.div`
  width: 100%;
  .title {
    font-size: 30px;
    font-weight: 800;
    color: var(--eciBlue);
    margin-bottom: 16px;
  }
  .navLinkContainer {
    width: 100%;
    height: 40px;

    display: flex;
    align-items: center;
    border-bottom: solid 1px var(--textDarkGray);
  }
  .plus {
    font-size: 16px;
    margin-right: 2px;
  }
`;
export default function ModuleTopNavigation({ title, navList }) {
  // navList : [{name,to},{}]

  const navLinkList = navList.map((item, i) => {
    return (
      <NavLink
        key={i}
        to={item.to}
        style={({ isActive }) => ({
          // width: "240px",
          textDecoration: "none",
          height: "40px",
          lineHeight: "40px",
          fontSize: "14px",
          fontWeight: "600",
          paddingRight: "100px",
          paddingLeft: "8px",
          borderBottom: isActive ? "solid 2px var(--eciBlue)" : "none",
          color: isActive ? "var(--eciBlue)" : "var(--textDarkGray)",
        })}
      >
        {item.name.split(" ")[0] === "Add" && (
          <span className="material-icons plus">add</span>
        )}
        {item.name}
      </NavLink>
    );
  });

  return (
    <ModuleTopAnimationStyle>
      <div className="title">{title}</div>
      <div className="navLinkContainer">{navLinkList}</div>
    </ModuleTopAnimationStyle>
  );
}
