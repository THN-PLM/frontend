import React from "react";
import styled from "styled-components";
// import HeaderIconList from "../molecule/HeaderIconList";
import SearchBar from "../molecule/SearchBar";

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
`;

export default function Header({ isHover }) {
  return (
    <HeaderStyle isHover={isHover}>
      <SearchBar width="30vw" height="30px" placeholder="Search" />
      {/* <HeaderIconList /> */}
    </HeaderStyle>
  );
}
