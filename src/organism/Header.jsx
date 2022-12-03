import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import HeaderIconList from "../molecule/HeaderIconList";
import SearchBar from "../molecule/SearchBar";
import commonStore from "../store/commonStore";

const HeaderStyle = styled.div`
  height: 80px;
  min-width: 1000px;
  width: 100%;
  padding-left: ${(props) => (props.isHover ? "200px" : "160px")};
  padding-bottom: 10px;
  transition: 0.4s;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  background-color: white;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);
  span {
    cursor: pointer;
    margin: 0 15px;
  }
`;

export default function Header({ isHover }) {
  const navigate = useNavigate();
  const { setIsLogged } = commonStore();
  const logOut = async () => {
    /*eslint-disable */
    if (confirm("Log out?") === true) {
      setIsLogged(false);
      // const userId = JSON.parse(localStorage.getItem("undefined")).state
      //   .userData.id;
      // fetch(`${process.env.REACT_APP_BASE_URL}/logout/${userId}`, {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/x-www-form-urlencoded",
      //   },
      // });
      localStorage.removeItem("token");

      navigate("/");
    } else {
    }
  };
  return (
    <HeaderStyle isHover={isHover}>
      <SearchBar width="30vw" height="30px" placeholder="Search" />
      {/* <HeaderIconList /> */}
      <span className="material-icons" onClick={logOut}>
        logout
      </span>
    </HeaderStyle>
  );
}
