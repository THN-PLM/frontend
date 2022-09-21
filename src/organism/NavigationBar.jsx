import React, { useState } from "react";
import styled from "styled-components";

import NavBarCategoryBox from "../molecule/NavBarCategoryBox";

import { userStore } from "../store/commonStore";
import NavBarLogoBox from "../molecule/NavBarLogoBox";
import NavBarBackground from "../molecule/NavBarBackground";
import NavBarUserBox from "../molecule/NavBarUserBox";

const NavigationBarStyle = styled.div`
  height: 100vh;
  width: ${(props) => (props.isHover ? "150px" : "70px")};
  padding-top: 50px;

  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  z-index: 1;

  background-color: transparent;
  border-radius: 0 30px 30px 0;

  font-family: Helvetica;
`;

export default function NavigationBar({ isHover, setisHover }) {
  const { userData } = userStore();
  const moduleArray = ["", "project"]; // 모듈 추가시 여기 수정
  const [currentModuleNum, setcurrentModuleNum] = useState(
    moduleArray.indexOf(window.location.pathname.split("/")[1])
  );
  const navBarArray = [
    { name: "Home", src: "home", to: "/" },
    { name: "Project", src: "lightbulb", to: "/project/list" },
    { name: "Design Change", src: "published_with_changes", to: "/" },
    { name: "Item", src: "build", to: "/item" },
  ];
  const navBarList = navBarArray.map((module, i) => {
    return (
      <NavBarCategoryBox
        key={i}
        src={module.src}
        name={module.name}
        to={module.to}
        onClick={() => setcurrentModuleNum(i)}
        isHover={isHover}
        isCurrent={i === currentModuleNum}
      />
    );
  });
  return (
    <NavigationBarStyle
      isHover={isHover}
      onMouseEnter={() => {
        setisHover(true);
      }}
      onMouseLeave={() => {
        setisHover(false);
      }}
    >
      <NavBarLogoBox isHover={isHover} />
      {navBarList}
      {/* {userData.admin && (
        <NavBarCategoryBox
          src="admin_panel_settings"
          name={resultText.common.NAVBAR.Admin}
          to="/admin/"
        />
      )} */}

      <NavBarBackground currentModuleNum={currentModuleNum} isHover={isHover} />
      <NavBarUserBox />
    </NavigationBarStyle>
  );
}
