import React from "react";
import styled from "styled-components";
import Input from "../atom/Input";

const SearchBarStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  height: ${(props) => props.height};
  width: calc(${(props) => `${props.width} + ${props.height} + 30px`});
  background-color: white;
  border: 1px solid var(--deemGray);
  border-radius: 10px;
  font-size: 1.6rem;
  padding-right: 13px;
  .material-icons {
    color: var(--deemGray);
  }
`;
export default function SearchBar({
  width,
  height,
  placeholder,
  state,
  setState,
}) {
  return (
    <SearchBarStyle width={width} height={height}>
      <span className="material-icons">search</span>
      <Input
        width={width}
        height={height}
        placeholder={placeholder}
        state={state}
        setState={setState}
        late
      />
    </SearchBarStyle>
  );
}
