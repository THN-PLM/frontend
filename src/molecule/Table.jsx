import React from "react";
import styled from "styled-components";

const TableStyle = styled.div`
  width: calc(${(props) => props.width});
  height: calc(${(props) => props.height});
  padding-right: 6px;
  min-height: ${(props) => props.minHeight};

  overflow-x: scroll;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
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

  background: #ffffff;
  box-shadow: ${(props) =>
    props.noshadow ? "none" : "4px 4px 4px rgba(0, 0, 0, 0.1)"};
  border-radius: 10px;
  .box {
    height: 100%;
    width: calc(${(props) => (props.innerWidth ? props.innerWidth : "99%")});
  }
  .scrollYBox {
    height: calc(100% - 50px);
    width: calc(100% + 5px);
    overflow-y: scroll;
    overflow-x: auto;

    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
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
  }
`;
export default function Table({
  width,
  innerWidth,
  height,
  children,
  noshadow,
  minHeight,
}) {
  return (
    <TableStyle
      width={width}
      height={height}
      noshadow={noshadow}
      minHeight={minHeight}
      innerWidth={innerWidth}
    >
      <div className="box">
        <div className="index"> {children[0]}</div>

        <div className="scrollYBox">
          <div className="rows">{children[1]}</div>
        </div>
      </div>
    </TableStyle>
  );
}
