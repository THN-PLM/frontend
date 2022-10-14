import styled from "styled-components";

// a모듈에 공통적으로 적용되는 스타일
export const ModuleStyle = styled.div`
  width: 100%;
`;

// 페이지에 공통적으로 적용되는 스타일
export const PageStyle = styled.div`
  width: 100%;
  padding-top: 20px;
`;

export const ListPageStyle = styled.div`
  //얘는 searchSection div를 넣어서 사용하자. 컴포넌트를 새로 파기에는 변동성이 크다.
  .searchSection {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
export const TempButtonContainerStyle = styled.div`
  height: 40px;
  display: flex;
  position: absolute;
  top: -62px;
  right: 46%;
`;
export const GridContainerStyle = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: repeat(${(props) => props.rows}, 60px);
  grid-column-gap: 15px;
  grid-row-gap: 10px;
`;
