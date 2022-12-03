import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LineTitle from "../atom/LineTitle";
import SelectBox from "../atom/SelectBox";
import RouteCommentRow from "../molecule/RouteCommentRow";
import { tokenAxios } from "../utility/Utility";

const RouteSectionStyle = styled.div``;
const RouteContainerStyle = styled.div`
  width: 100%;
  /* min-height: 800px; */
  margin-top: 20px;
  display: ${(props) => (props.activate ? "" : "none")};
`;

export default function RouteSection({
  activate, //  isRouteActive
  readOnly,
  rejecting,
  moduleStore, // 해당 모듈의 스토어 객체
}) {
  const { setrouteRef, routeData, routeNumber, setrouteData } = moduleStore;
  const [workFlow, setworkFlow] = useState("work flow");
  const [newComment, setnewComment] = useState("");
  const [rejectTarget, setrejectTarget] = useState("");

  const routeRef = useRef();
  const navigate = useNavigate();

  const approveRoute = async () => {
    const formData = new FormData();
    formData.append("present", routeData.present);
    formData.append("comment", newComment);
    const response = await tokenAxios.put(
      `/approveRoute/${routeNumber}`,
      formData
    );
    alert("라우트 등록이 완료되었습니다.");
    navigate("/");
  };

  const rejectRoute = async () => {
    const formData = new FormData();
    formData.append("comment", newComment);
    formData.append("rejectedSequence", rejectTarget);
    const response = await tokenAxios.put(
      `/rejectRoute/${routeNumber}`,
      formData
    );
    alert("라우트 거절이 완료되었습니다.");
    navigate("/");
  };
  // 리젝트 타겟 기본값 넣어주기

  const routerList =
    activate && routeData && routeData.routeProductList
      ? routeData.routeProductList.map((router, i) => {
          return (
            <RouteCommentRow
              key={i}
              title={router.name}
              member={router.member}
              present={routeData.present === router.sequence}
              inputState={
                routeData.present === router.sequence
                  ? newComment
                  : router.comment
              }
              setinputState={setnewComment}
              upperLine={i > 0}
              onApprove={approveRoute}
              onReject={rejectRoute}
              isPassed={router.sequence < routeData.present}
              isRefusal={router.refusal.seq !== -1}
              isRejected={router.rejected || rejecting}
              readOnly={readOnly}
              rejectTarget={
                router.refusal.seq !== -1 ? router.refusal.name : rejectTarget
              }
              setrejectTarget={setrejectTarget}
              rejectTargetArray={routeData.response.rejectPossibleIds}
            />
          );
        })
      : "";

  const getData = useCallback(
    async (itemID) => {
      const response = await tokenAxios.get(`route/${itemID}`);
      const { data } = response.data.result;
      if (data.response.rejectPossibleIds[0] && !readOnly) {
        setrejectTarget(data.response.rejectPossibleIds[0].seq);
      }
      setrouteData(data);
      setworkFlow(data.workflowphase);
    },
    [tokenAxios]
  );

  useEffect(() => {
    setrouteRef(routeRef);
    if (routeNumber && routeNumber > 0) {
      getData(routeNumber);
    }
  }, [setrouteRef, getData, routeNumber]);

  return (
    <RouteSectionStyle ref={routeRef}>
      <LineTitle
        fontSize="16px"
        color={activate ? "var(--eciBlue)" : "var(--deemGray)"}
        width="100%"
        height="60px"
      >
        Route Information
      </LineTitle>
      <SelectBox
        width="100%"
        height="32px"
        fontSize="12px"
        color="var(--deemGray)"
        backgroundColor={activate ? "white" : "var(--disableGray)"}
        readOnly
        face="Workflow"
        state={workFlow}
      />
      <RouteContainerStyle activate={activate}>
        {routerList}
        <RouteCommentRow
          title="Complete"
          upperLine
          isCommentBox={false}
          complete
          member={[]}
        />
      </RouteContainerStyle>
    </RouteSectionStyle>
  );
}
