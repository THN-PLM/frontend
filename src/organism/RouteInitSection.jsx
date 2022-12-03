import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../atom/Button";
import LineTitle from "../atom/LineTitle";
import RouteCommentRow from "../molecule/RouteCommentRow";
import { userStore } from "../store/commonStore";
import { tokenAxios } from "../utility/Utility";

const RouteInitSectionStyle = styled.div`
  position: relative;
`;
const RouteContainerStyle = styled.div`
  width: 100%;
  min-height: 800px;
  margin-top: 20px;
  display: ${(props) => (props.activate ? "" : "none")};
`;

export default function RouteInitSection({
  routeType, // 타입에 따라라우트 경로를 다르게 받기
  itemId,
  typeId,
  activate,
  moduleStore,
}) {
  const {
    setrouteRef,
    setsearchBoxType,
    targetMember,
    settargetMember,
    members,
    afterUrl,
  } = moduleStore;
  const { userData } = userStore();
  const [newComment, setnewComment] = useState("");
  const routeRef = useRef();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [routeData, setrouteData] = useState([]);

  const routerList =
    routeData &&
    routeData.map((router, i) => {
      if (i === 0) {
        return (
          <RouteCommentRow
            init
            key={i}
            title={router}
            member={[
              {
                username: userData.username,
                department: userData.department,
                contact: userData.contact,
                email: userData.email,
              },
            ]}
            present={i === 0}
            inputState={newComment}
            setinputState={setnewComment}
            upperLine={i > 0}
          />
        );
      }
      if (router === "CO 실행") {
        return (
          <RouteCommentRow
            init
            key={i}
            title={router}
            present={i === 0}
            inputState={newComment}
            setinputState={setnewComment}
            upperLine={i > 0}
          />
        );
      }
      return (
        <RouteCommentRow
          init
          key={i}
          title={router}
          member={members[i]}
          present={i === 0}
          inputState={newComment}
          setinputState={setnewComment}
          upperLine={i > 0}
          openMember={() => {
            settargetMember(i);
            setsearchBoxType("members");
          }}
          highLight={i === targetMember}
        />
      );
    });
  const createRoute = async () => {
    setisLoading(true);
    const formData = new FormData();
    formData.append("itemId", itemId);
    formData.append("requestComment", newComment);
    if (members && Array.isArray(members)) {
      members.forEach((item, i) => {
        // 첫 번째는 본인
        const eachIdList = item.map((it) => it.id);
        if (i > 0) {
          formData.append(`memberIds[${i - 1}]`, eachIdList);
        }
      });
    }
    const response = await tokenAxios.post(`/route/${routeType}`, formData);
    alert("Done !");
    if (afterUrl) {
      navigate(afterUrl);
    }
  };

  const getRouteByItem = async (itemIdd) => {
    //  여기 수정해야해

    if (itemIdd > 0) {
      const response = await tokenAxios.get(`routeBy${routeType}/${itemIdd}`);
      setrouteData(response.data.result.data);
    }
  };

  useEffect(() => {
    setrouteRef(routeRef);

    if (routeType) {
      getRouteByItem(typeId);
    }
  }, [setrouteRef, routeType, typeId]);
  return (
    <RouteInitSectionStyle ref={routeRef}>
      <LineTitle
        fontSize="16px"
        color="var(--eciBlue)"
        width="100%"
        height="60px"
      >
        Route Information
      </LineTitle>

      <RouteContainerStyle activate={activate}>
        {routerList}
        <RouteCommentRow
          title="Complete"
          upperLine
          isCommentBox={false}
          complete
          member={[]}
        />
        <Button
          backgroundColor="var(--eciBlue)"
          width="100%"
          height="30px"
          color="white"
          onClick={createRoute}
          condition={members && members.length >= routeData.length} // 멤버 가득차면
        >
          Save and Route
        </Button>
      </RouteContainerStyle>
    </RouteInitSectionStyle>
  );
}
