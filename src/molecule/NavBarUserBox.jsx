import React from "react";
import styled from "styled-components";
import RoundImgBox from "../atom/RoundImgBox";
import commonStore, { userStore } from "../store/commonStore";
import logo1 from "../static/logo1.svg";

const NavbarUserBoxStyle = styled.div`
  width: 100%;
  height: 40px;
  padding: 0 8px;

  position: absolute;
  bottom: 48px;
  display: flex;
  color: white;
  overflow: hidden;

  .dataBox {
    width: 80%;
    font-family: Helvetica;
    padding-left: 14px;
    font-weight: 100;

    .name {
      font-size: 14px;
      font-weight: 600;
    }
    .department {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;
export default function NavBarUserBox({ isHover }) {
  const { userData } = userStore();
  return (
    <NavbarUserBoxStyle>
      <RoundImgBox
        src={
          userData.profileImage
            ? userData.profileImage.replace(
                "src/main/prodmedia",
                `${process.env.REACT_APP_BASE_URL}`
              )
            : logo1
        }
      />
      {isHover ? (
        <div className="dataBox">
          <div className="name"> {userData.username}</div>

          <div className="department" title={userData.department}>
            {" "}
            {userData.department}
          </div>
        </div>
      ) : (
        ""
      )}
    </NavbarUserBoxStyle>
  );
}
