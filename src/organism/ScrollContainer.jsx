import React, { useRef } from "react";
import styled from "styled-components";
import ScrollController from "../molecule/ScrollController";

const ScrollContainerStyle = styled.div`
  width: 100%;
  display: flex;
`;
const FormSectionStyle = styled.div`
  position: relative;
  width: calc(58% - 100px);
  height: calc(100vh - 230px); //여기 픽셀 수정
  overflow: scroll;
  padding-left: 36px;
  padding-right: 1.5%;

  ::-webkit-scrollbar {
    width: 5px;
    height: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    border: 15px solid transparent;
    width: 5px;
    background: rgba(4, 8, 15, 0.3);
    border-radius: 8px;
  }
`;
const SearchBoxSectionStyle = styled.div`
  width: 42%;
`;
export default function ScrollContainer({
  children, // form에 들어갈 애들
  scrollRefList, // [[ref,name],[]]
  searchBoxComponent,
}) {
  const formRef = useRef();

  return (
    <ScrollContainerStyle>
      <ScrollController
        width="100px"
        buttonArray={scrollRefList}
        scrollRef={formRef}
      />
      <FormSectionStyle ref={formRef}>a{children}</FormSectionStyle>
      <SearchBoxSectionStyle>b{searchBoxComponent}</SearchBoxSectionStyle>
    </ScrollContainerStyle>
  );
}
