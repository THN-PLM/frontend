import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import LineTitle from "../atom/LineTitle";
import UploadedList from "../molecule/UploadedList";

const AttachmentSectionStyle = styled.div`
  pointer-events: ${(props) => (props.readOnly ? "none" : "")};
  .history,
  a {
    cursor: pointer;
    pointer-events: all;
  }
  .history {
    font-size: 20px;
    transform: translate(4px, 5px);
  }
`;
export default function AttachmentSection({
  title,
  oneLine,
  readOnly,
  moduleStore,
  editMode,

  // setattachmentRef,
  // attachmentTagOptionList,
  // attachmentIdArray,
  // attachmentOriginArray,
  // attachmentDateArray,
  // attachmentUploaderArray,
  // attachmentModifiedAtArray,
  // setattachmentIdArray,

  // setattachmentOriginArray,
  // setattachmentDateArray,
  // setattachmentUploaderArray,
  // deletedFileIdArray, // [1,3,5] : deleted = true인 애들 id값,history용

  // // edit
  // attachmentFileArray,
  // attachmentTagArray,
  // attachmentCommentArray,
  // setattachmentFileArray,
  // setattachmentTagArray,
  // setattachmentCommentArray,

  // deletedAttachmentArray, // 밖에다가 전달할 애
  // addedAttachmentArray,
  // setdeletedAttachmentArray,
  // setaddedAttachmentArray,
}) {
  const attachmentRef = useRef();
  const [isHistory, setisHistory] = useState(false);

  const {
    setattachmentRef,
    attachmentTagOptionList,

    attachmentIdArray,
    attachmentOriginArray,
    attachmentDateArray,
    attachmentUploaderArray,
    attachmentModifiedAtArray,
    setattachmentIdArray,

    setattachmentOriginArray,
    setattachmentDateArray,
    setattachmentUploaderArray,
    deletedFileIdArray, // [1,3,5] : deleted = true인 애들 id값,history용

    // edit
    attachmentFileArray,
    attachmentTagArray,
    attachmentCommentArray,
    setattachmentFileArray,
    setattachmentTagArray,
    setattachmentCommentArray,

    deletedAttachmentArray, // 밖에다가 전달할 애
    addedAttachmentArray,
    setdeletedAttachmentArray,
    setaddedAttachmentArray,
  } = moduleStore();
  const [fileArray, setfileArray] = useState(attachmentFileArray);
  const [tagArray, settagArray] = useState(attachmentTagArray);
  const [commentArray, setcommentArray] = useState(attachmentCommentArray);
  const [originArray, setoriginArray] = useState(attachmentOriginArray);
  const [dateArray, setdateArray] = useState(attachmentDateArray);
  const [uploaderArray, setuploaderArray] = useState(attachmentUploaderArray);
  const [modifiedAtArray, setmodifiedAtArray] = useState(
    attachmentModifiedAtArray
  );
  const [idArray, setidArray] = useState(attachmentIdArray);
  const setValidFile = (bool) => {
    // history에 맞게 deleted아닌 애들만 일단
    if (!bool) {
      const tmpfileArray = [];
      const tmptagArray = [];
      const tmpcommentArray = [];
      const tmporiginArray = [];
      const tmpdateArray = [];
      const tmpuploaderArray = [];
      const tmpmodifiedAtArray = [];
      const tmpidArray = [];
      for (let i = 0; i < attachmentFileArray.length; i += 1) {
        if (
          deletedFileIdArray &&
          deletedFileIdArray.indexOf(attachmentIdArray[i]) === -1
        ) {
          tmpfileArray.push(attachmentFileArray && attachmentFileArray[i]);
          tmptagArray.push(attachmentTagArray && attachmentTagArray[i]);
          tmpcommentArray.push(
            attachmentCommentArray && attachmentCommentArray[i]
          );
          tmporiginArray.push(
            attachmentOriginArray && attachmentOriginArray[i]
          );
          tmpdateArray.push(attachmentDateArray && attachmentDateArray[i]);
          tmpuploaderArray.push(
            attachmentUploaderArray && attachmentUploaderArray[i]
          );
          tmpmodifiedAtArray.push(
            attachmentModifiedAtArray && attachmentModifiedAtArray[i]
          );
          tmpidArray.push(attachmentIdArray && attachmentIdArray[i]);
        }
      }
      setfileArray(tmpfileArray);
      settagArray(tmptagArray);
      setcommentArray(tmpcommentArray);
      setoriginArray(tmporiginArray);
      setdateArray(tmpdateArray);
      setuploaderArray(tmpuploaderArray);
      setmodifiedAtArray(tmpmodifiedAtArray);
      setidArray(tmpidArray);
    } else {
      setfileArray(attachmentFileArray);
      settagArray(attachmentTagArray);
      setcommentArray(attachmentCommentArray);
      setoriginArray(attachmentOriginArray);
      setdateArray(attachmentDateArray);
      setuploaderArray(attachmentUploaderArray);
      setmodifiedAtArray(attachmentModifiedAtArray);
      setidArray(attachmentIdArray);
    }
  };
  useEffect(() => {
    setattachmentRef(attachmentRef);
    setValidFile(isHistory);
  }, [
    attachmentFileArray,
    attachmentTagArray,
    attachmentCommentArray,

    isHistory,
  ]);
  return (
    <AttachmentSectionStyle readOnly={readOnly} ref={attachmentRef}>
      <LineTitle
        fontSize="16px"
        color="var(--eciBlue)"
        width="100%"
        height="60px"
      >
        {title}
        {readOnly && (
          <span
            className="material-icons history"
            onClick={() => {
              setValidFile(isHistory);
              setisHistory(!isHistory);
            }}
          >
            history
          </span>
        )}
      </LineTitle>

      <UploadedList
        oneLine={oneLine}
        width="100%"
        htmlFor="projectFile"
        fileArray={fileArray}
        tagArray={tagArray}
        commentArray={commentArray}
        originArray={originArray}
        dateArray={dateArray}
        uploaderArray={uploaderArray}
        modifiedAtArray={modifiedAtArray}
        idArray={idArray}
        setfileArray={setattachmentFileArray}
        settagArray={setattachmentTagArray}
        setcommentArray={setattachmentCommentArray}
        setoriginArray={setattachmentOriginArray}
        setdateArray={setattachmentDateArray}
        setuploaderArray={setattachmentUploaderArray}
        readOnly={readOnly}
        attachmentTagOptionList={attachmentTagOptionList}
        editMode={editMode}
        isDeletedArray={deletedFileIdArray} // [1,3,5] : deleted = true인 애들 id값
        setidArray={setattachmentIdArray}
        deletedArray={deletedAttachmentArray}
        setdeletedArray={setdeletedAttachmentArray}
        addedfileArray={addedAttachmentArray}
        setaddedfileArray={setaddedAttachmentArray}
      />
    </AttachmentSectionStyle>
  );
}
