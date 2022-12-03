import React, { useRef } from "react";
import styled from "styled-components";
import Button from "../atom/Button";
import ScrollController from "../molecule/ScrollController";
import { TempButtonContainerStyle } from "../Style";

const ScrollContainerStyle = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;
const FormSectionStyle = styled.div`
  position: relative;
  width: calc(50% - 120px);
  height: calc(100vh - 230px); //여기 픽셀 수정
  overflow: scroll;
  padding-left: 60px;
  padding-right: 30px;

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
  width: 46%;
  position: relative;
  :nth-child() {
    position: absolute;
    left: 0;
  }
`;
export default function ScrollContainer({
  children, // form에 들어갈 애들
  scrollRefList, // [[ref,name],[]]
  searchBoxComponent,
  tempButtonTitle, // temp에 들어갈 버튼 이름
  tempButtonOnclick,
}) {
  const formRef = useRef();

  return (
    <ScrollContainerStyle>
      <ScrollController
        width="100px"
        buttonArray={scrollRefList}
        scrollRef={formRef}
      />
      <TempButtonContainerStyle>
        {tempButtonTitle && (
          <Button
            backgroundColor="transparent"
            onClick={tempButtonOnclick}
            fontSize="12px"
            color="var(--textDarkGray)"
            condition
          >
            {tempButtonTitle}
          </Button>
        )}
      </TempButtonContainerStyle>
      <FormSectionStyle ref={formRef}>{children}</FormSectionStyle>
      <SearchBoxSectionStyle>{searchBoxComponent}</SearchBoxSectionStyle>
    </ScrollContainerStyle>
  );
}
