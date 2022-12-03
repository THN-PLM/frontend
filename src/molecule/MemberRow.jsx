import React, { useState } from "react";
import styled from "styled-components";
import RoundImgBox from "../atom/RoundImgBox";
import TableRow from "../atom/TableRow";

const MemberRowStyle = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
`;
export default function MemberRow({
  data,
  setmemberArray,
  members,
  deletememberArray,
}) {
  return (
    <MemberRowStyle>
      <TableRow
        widthArray={[1, 1, 2, 3, 3, 3]}
        onClick={() => {
          if (members && members.indexOf(data.id) >= 0) {
            deletememberArray(data.id);
          } else {
            setmemberArray(data);
          }
        }}
        itemArray={[
          <input
            type="checkbox"
            value="1"
            checked={!!(members && members.indexOf(data.id) >= 0)}
            onChange={() => {}}
          />,
          <RoundImgBox
            width="15px"
            height="15px"
            src={data.profileImage && data.profileImage.replace()}
          />,
          data.username,
          data.contact,
          data.department,
        ]}
      />
    </MemberRowStyle>
  );
}
