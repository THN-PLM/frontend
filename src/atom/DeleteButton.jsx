import React from "react";
import styled from "styled-components";

const DeleteButtonStyle = styled.button`
  background-color: inherit;
  border: none;
  outline: none;
  cursor: pointer;
`;

export default function DeleteButton({ onDelete }) {
  return (
    <DeleteButtonStyle onClick={onDelete} type="button">
      <span className="material-icons">delete</span>
    </DeleteButtonStyle>
  );
}
