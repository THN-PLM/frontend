import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BoldText from "../atom/BoldText";
// import Logo from "../../static/logo-long1.svg";

const NotFoundStyle = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  background-color: var(--eciBlue);
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10%;
  img {
    margin-bottom: 15vh;
  }
  .cont {
    display: flex;
    justify-content: space-around;
    margin-top: 20vh;
    width: 60%;

    .buon {
      color: white;
      font-size: 16px;
      cursor: pointer;
    }
    span {
      transform: translate(-10px, 5px);
    }
  }
`;
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <NotFoundStyle>
      {/* <img src={Logo} alt="?" /> */}

      <BoldText fontSize="30px" color="white">
        에러가 발생했습니다
      </BoldText>
      <div className="cont">
        <div
          className="buon"
          onClick={() => {
            navigate(-1);
          }}
        >
          <span className="material-icons icon">arrow_back</span>
          이전 페이지로 돌아가기
        </div>
        <div
          className="buon"
          onClick={() => {
            navigate("/");
          }}
        >
          <span className="material-icons icon">home </span>
          홈으로 돌아가기
        </div>
      </div>
    </NotFoundStyle>
  );
}
