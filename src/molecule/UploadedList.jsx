import React, { useEffect } from "react";
import styled from "styled-components";
import DeleteButton from "../atom/DeleteButton";
import SelectBox from "../atom/SelectBox";
import TableIndexRow from "../atom/TableIndexRow";
import TableRow from "../atom/TableRow";
import { userStore } from "../store/commonStore";
import CommentInput from "./CommentInput";
import DragDropBox from "./DragDropBox";
import Table from "./Table";

const UploadedListStyle = styled.div`
  width: calc(${(props) => props.width});
  .gap {
    height: 30px;
  }
  .dragDrop {
    display: ${(props) => (props.readOnly ? "none" : "")};
  }
  .line {
    text-decoration: line-through;
  }
`;

export default function UploadedList({
  oneLine,
  htmlFor,
  width,
  tagOptionList, // [{id:"a",name:"lee"}]
  readOnly,

  idArray,
  originArray,
  uploaderArray,
  dateArray,
  modifiedAtArray,
  isDeletedArray,

  setidArray,

  setoriginArray,
  setuploaderArray,
  setdateArray,

  // editmode
  fileArray,
  tagArray,
  commentArray,
  editMode,
  setfileArray,
  settagArray,
  setcommentArray,

  deletedArray,
  setdeletedArray,
  addedfileArray,
  setaddedfileArray,
}) {
  const newfileArray = Array.isArray(fileArray) && [...fileArray];
  const newtagArray = Array.isArray(tagArray) && [...tagArray];
  const newcommentArray = Array.isArray(commentArray) && [...commentArray];
  const neworiginArray = Array.isArray(originArray) && [...originArray];
  const newuploaderArray = Array.isArray(uploaderArray) && [...uploaderArray];
  const newdateArray = Array.isArray(dateArray) && [...dateArray];
  // editMode
  const newidArray = Array.isArray(idArray) && [...idArray];
  let newaddedFileArray;

  let newdeletedArray = Array.isArray(deletedArray) && [...deletedArray];
  if (editMode) {
    newaddedFileArray = Array.isArray(fileArray) && [...addedfileArray];

    newdeletedArray = Array.isArray(deletedArray) && [...deletedArray];
  }

  const userData = userStore((state) => state.userData);
  const setFile = (file) => {
    if (file) {
      if (editMode) {
        const nfileArray = [...addedfileArray];
        nfileArray.push(file);
        setaddedfileArray(nfileArray);
      }
      const nfileArray = [...fileArray];
      nfileArray.push(file);
      setfileArray(nfileArray);
      setidArray([...idArray, ""]);
      settagArray([
        ...tagArray,
        tagOptionList && tagOptionList[0] && tagOptionList[0].id,
      ]);

      setcommentArray([...commentArray, ""]);
      setoriginArray([...originArray, ""]);
      setuploaderArray([...uploaderArray, ""]);
      setdateArray([...dateArray, ""]);
    }
  };
  const now = new Date();
  const optionList =
    tagOptionList &&
    tagOptionList.length > 0 &&
    tagOptionList.map((item, i) => {
      return (
        <option key={i} value={item.id}>
          {item.name}
        </option>
      );
    });
  const FileList =
    Array.isArray(fileArray) &&
    fileArray.map((fileName, i) => {
      const setCommentState = (val) => {
        // 만약 기존 파일을 수정하는거면..?

        newcommentArray[i] = val;
        setcommentArray(newcommentArray);
      };

      const setTagState = (val) => {
        newtagArray[i] = val;
        settagArray(newtagArray);
      };

      const deleteFile = (index) => {
        if (editMode) {
          newdeletedArray.push(newidArray[index]);
          setdeletedArray(newdeletedArray);
          // delete in added attachment if it's in there
          if (newaddedFileArray.indexOf(newfileArray[index]) !== -1) {
            newaddedFileArray.splice(
              newaddedFileArray.indexOf(newfileArray[index]),
              1
            );
          }
        }
        newidArray.splice(index, 1);

        newfileArray.splice(index, 1);
        newtagArray.splice(index, 1);
        newcommentArray.splice(index, 1);
        if (Array.isArray(neworiginArray)) neworiginArray.splice(index, 1);
        newuploaderArray.splice(index, 1);
        newdateArray.splice(index, 1);
        setidArray(newidArray);
        setfileArray(newfileArray);
        settagArray(newtagArray);
        setcommentArray(newcommentArray);
        setoriginArray(neworiginArray);
        setuploaderArray(newuploaderArray);
        setdateArray(newdateArray);
      };
      const isDeleted = isDeletedArray.indexOf(idArray[i]) !== -1;

      return (
        <div key={i}>
          <TableRow
            noBorder
            backgroundColor={isDeleted && "var(--textGray)"}
            widthArray={[5, 3, 3, 4, 2]}
            itemArray={[
              <span className={`${isDeleted ? "line" : ""}`}>
                <a
                  target="_blank"
                  href={
                    originArray[i] &&
                    originArray[i].replace(
                      "src/main/prodmedia",
                      `${process.env.REACT_APP_BASE_URL}`
                    )
                  }
                  rel="noreferrer"
                >
                  {fileName && fileName.name ? fileName.name : fileName}
                </a>
              </span>,
              uploaderArray && uploaderArray[i]
                ? uploaderArray[i]
                : userData.username,
              dateArray && dateArray[i]
                ? dateArray[i]
                : `${now.getFullYear()}-${
                    now.getMonth() + 1 > 10
                      ? now.getMonth() + 1
                      : `0${now.getMonth() + 1}`
                  }-${now.getDate()}`,
              !oneLine && (
                <SelectBox
                  width="100px"
                  height="30px"
                  backgroundColor="var(--lightGray)"
                  color="var(--deemGray)"
                  face="Specification"
                  fontSize="8px"
                  state={
                    tagArray[i] && tagArray[i] !== 1
                      ? tagArray[i].name
                      : tagOptionList &&
                        tagOptionList[0] &&
                        tagOptionList[0].name
                  }
                  value={
                    tagArray[i] &&
                    (tagArray[i].name ? tagArray[i].name : tagArray[i])
                  }
                  setState={setTagState}
                >
                  {optionList || (tagArray[i] && tagArray[i].name)}
                </SelectBox>
              ),

              !readOnly && isDeleted === -1 ? (
                <DeleteButton
                  onDelete={() => {
                    deleteFile(i);
                  }}
                />
              ) : (
                ""
              ),
            ]}
          />
          {!oneLine && (
            <TableRow
              widthArray={[5, 12]}
              backgroundColor={isDeleted && "var(--textGray)"}
              itemArray={[
                isDeleted ? `Deleted At :${modifiedAtArray[i]}` : "",
                <CommentInput
                  width="80%"
                  height="25px"
                  placeholder="Add Coments"
                  state={newcommentArray[i] || ""}
                  setState={setCommentState}
                  backgroundColor="var(--lightGray)"
                  noBorder
                />,
              ]}
            />
          )}
        </div>
      );
    });
  return (
    <UploadedListStyle width={width} readOnly={readOnly}>
      <div className="dragDrop">
        <DragDropBox
          setState={setFile}
          width="100%"
          height="80px"
          border="dashed var(--eciBlue) 2px"
          htmlFor={htmlFor}
        />
      </div>

      <div className="gap" />
      <Table width="100%">
        <TableIndexRow
          widthArray={[5, 3, 3, 5]}
          itemArray={
            oneLine
              ? ["File", "Upload", "Date", ""]
              : ["File", "Upload", "Date", "Tag"]
          }
        />
        {FileList}
      </Table>
    </UploadedListStyle>
  );
}
