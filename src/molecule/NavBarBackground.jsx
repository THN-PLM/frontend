import React from "react";
import styled from "styled-components";
import commonStore from "../store/commonStore";

import NavbarHole from "../static/NavbarHole.png";

const NavBarBackGroundStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${(props) => (props.isHover ? "150px" : "60px")};
  height: 100%;
  z-index: -1;
  transition: 0.3s;

  .backGroundBox {
    background-color: var(--eciBlue);
    border-radius: 0 20px 20px 0;
    width: 100%;
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
  }
  .firstBox {
    height: ${(props) => `${props.startY + props.arrayNum * 38 + 5}px`};
    //38은 NavBarCategoryBox의 높이. 하얀 부분을 얇게 만들기 위해 +5를 해준다.
    transition: 0.4s;
  }
  .secondBox {
    height: 28px;
    position: relative;
    transition: 0.4s;
    box-shadow: none;
  }
  img {
    height: 28px;
    display: block;
  }
  .secondInnerBox {
    width: calc(100% - 9px);
    height: 28px;
    margin-left: 10px;
    background-color: white;
    border-radius: 20px;
    transition: 0.4s;
  }
  .thirdBox {
    transition: 0.4s;

    height: calc(
      100vh - ${(props) => `${props.startY + props.arrayNum * 38 + 33}px`}
    );
    min-height: 300px;
  }
`;

export default function NavBarBackground({ currentModuleNum, isHover }) {
  const startYValue = 123;
  // ref로 가져오기
  return (
    <NavBarBackGroundStyle
      isHover={isHover}
      startY={startYValue}
      arrayNum={currentModuleNum}
    >
      <div className="firstBox backGroundBox" />
      <img src={NavbarHole} alt="" />

      <div className="thirdBox backGroundBox" />
    </NavBarBackGroundStyle>
  );
}
