import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import commonStore from "../store/commonStore";

const NavBarCategoryBoxStyle = styled.div`
  width: 100%;
  height: 24px;
  padding-left: 8px;
  margin: 7px 0;
  margin-left: 10px;
  z-index: 2;

  display: flex;
  align-items: center;

  background-color: transparent;

  font-size: 12px;
  color: ${(props) => (props.isCurrent ? "var(--eciBlue  )" : "white")};

  transition: 0.2s;

  span {
    margin-right: 16px;
    font-size: 16px;
  }
`;
export default function NavBarCategoryBox({
  name,
  src,
  to,
  onClick,
  isHover,
  isCurrent,
}) {
  return (
    <Link to={to} onClick={onClick} style={{ textDecoration: "none" }}>
      <NavBarCategoryBoxStyle isCurrent={isCurrent}>
        <span className="material-icons">{src}</span> {isHover ? name : " "}
      </NavBarCategoryBoxStyle>
    </Link>
  );
}
