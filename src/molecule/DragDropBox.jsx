import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

const DragDropBoxStyle = styled.label`
  width: calc(${(props) => props.width});
  height: calc(${(props) => props.height});

  display: flex;
  justify-content: center;
  align-items: center;

  border: ${(props) => props.border};
  background-color: white;
  border-radius: 5px;
  /* margin-top: 5%; */
  cursor: pointer;

  .imagePreview {
    width: 100%;
    height: calc(${(props) => props.height});

    border-radius: 5px;
  }
`;

export default function DragDropBox({
  previewImage,
  setState,
  width,
  height,
  border,
  preview,
  htmlFor,
}) {
  const dragRef = useRef();
  const [ImagePreview, setImagePreview] = useState("");
  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const onChangeFiles = useCallback(
    (e) => {
      let files;
      if (e.type === "drop") {
        // 드래그 앤 드롭 했을때
        files = e.dataTransfer.files;
      } else {
        // "파일 첨부" 버튼을 눌러서 이미지를 선택했을때
        files = e.target.files;
      }
      setState(files[0]);
      if (preview) {
        const reader = new FileReader();
        reader.onload = (eve) => {
          setImagePreview(eve.target.result);
        };
        reader.readAsDataURL(files[0]);
      }
    },
    [preview, setState]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      onChangeFiles(e);
    },
    [onChangeFiles]
  );

  const initDragEvents = useCallback(() => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);
  //   }, [handleDrop]);

  const resetDragEvents = useCallback(() => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragIn);
      dragRef.current.removeEventListener("dragleave", handleDragOut);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);
  //   }, [handleDrop]);

  useEffect(() => {
    initDragEvents();
    setImagePreview(previewImage);
    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents, previewImage]);

  return (
    <DragDropBoxStyle
      width={width}
      height={height}
      border={border}
      htmlFor={htmlFor}
      ref={dragRef}
    >
      {ImagePreview ? (
        <img className="imagePreview" src={ImagePreview} alt="" />
      ) : (
        <span
          style={{
            textAlign: "center",
            color: "var(--textGray)",
          }}
        >
          Drag and Drop <br />
          or <br />
          Click and Attach
        </span>
      )}

      <input
        type="file"
        id={htmlFor}
        style={{ display: "none" }}
        multiple
        onChange={onChangeFiles}
      />
      {/* </label> */}
    </DragDropBoxStyle>
  );
}
