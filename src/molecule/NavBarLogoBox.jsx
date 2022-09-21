import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import commonStore from "../store/commonStore";

import logo1 from "../static/logo1.svg";
// import logoLong1 from "../static/logo-long1.svg";

const NavBarLogoBoxStyle = styled.div`
  .logo {
    height: 25px;
    margin-bottom: 45px;
    margin-left: 14px;
  }
  cursor: pointer;
`;

export default function NavBarLogoBox({ isHover }) {
  const navigate = useNavigate();
  return (
    <NavBarLogoBoxStyle
      onClick={() => {
        navigate("/");
      }}
    >
      {isHover ? (
        <img className="logo" src={logo1} alt="" />
      ) : (
        <img className="logo" src={logo1} alt="" />
      )}
    </NavBarLogoBoxStyle>
  );
}
