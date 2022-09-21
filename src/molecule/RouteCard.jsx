import React from "react";
import styled, { css } from "styled-components";

import logo1 from "../static/logo1.svg";
/*eslint-disable */

const RouteCardStyle = styled.div`
  width: 260px;
  height: ${(props) =>
    props.complete ? "40px" : `calc(40px + ${props.member * 40}px)`};
  position: relative;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding-bottom:70px;
  .cardTitle {
    font-size: 12px;
    width:160px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: Helvetica;
    color: ${(props) => (props.complete ? "var(--todoGreen)" : props.color)};
    position: absolute;
    left: 60px;
    top: 12px;
  }
  .card{
    width:90%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 30px;
    border-bottom:solid var(--textGray) 1px;
  }
  .name {
    position: absolute;
    left: 60px;
    top: 40px;

    color: var(--deemGray);
    div {
      font-size: 9px;
      line-height: 16px;
      height:36px;
    }
  }
  .icon {
    width: 15px;
    height: 15px;

    border: solid 2px
      ${(props) =>
        props.complete || props.isPassed ? "var(--todoGreen)" : props.color};
    background-color: ${(props) =>
      props.isPassed
        ? "var(--todoGreen)"
        : props.isPresent
        ? props.color
        : "white"};

    border-radius: 40px;
    position: absolute;
    top: -10px;
    left: 24px;
    z-index: 1;
    box-shadow: 0px 4px 4px 0px #00000040;

  }
  .img {
    width: 20px;
    height: 20px;

    position: absolute;
    top: 10px;
    right: 10px;

    border: solid 1px var(--eclBlue);
    border-radius: 40px;
    opacity: ${(props) => (props.complete ? 0 : 1)};
  }
  .line {
    position: absolute;
    top: 6px;
    right: 123px;
    transform: perspective(10px) rotate(270deg) rotateX(15deg);
    background: linear-gradient(
      270deg,
      ${(props) => props.color} 0%,
      rgba(10, 0, 85, 0) 100%
    );

    width: 1px;
    height: 59px;
    border: 0px solid var(--eciBlue);
  }
  .upperLine {
    height: 40px;
    border-left: solid 3px;
    border-color: ${(props) =>
      props.complete|| props.isPassed  ? "var(--todoGreen)" : props.color};
    position: absolute;
    top: -40px;
    left: 30px;
  }
  .search {
    background-color: transparent;
    border: none;
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 14px;
    color: var(--textGray);
    cursor: pointer;
  }
  
  ${props=>props.isRejected&&css`
      background-color: var(--disableGray);
      .icon{
        background-color:var(--disableGray) ;
        border-color:var(--disableGray) ;
      }
      .upperLine {
    border-color: var(--disableGray);
  }
  `}
  ${props=>props.isRefusal&&css`
      /* background-color: var(--disableGray); */
      .icon{
        background-color:var(--required) ;
        border-color:var(--required) ;
      }
      .upperLine {
    border-color: var(--required);
  }
  `}
  transition: 0.1s;
  border:${props=>props.highLight&&"solid var(--eciBlue) 2px"};

`;
export default function RouteCard({
  title,
  member,
  color,
  upperLine,
  onClick,
  complete,
  isPassed,
  isPresent,
  isRejected,
  isRefusal,
  openMember,
  highLight
}) {
  //member는 [{username:use,department:...,contact...,email...}]
  //if 아래 버전은 단일 선택 버전. 나중에 다중선택 버전으로 바뀌겠다
  const memberList = !complete&&member&&(Array.isArray(member)?
    member.map((item, i) => {
        return (
          <div key={i} className="card">
            {item.username}/{item.department}
            <br />
            {item.contact}/{item.email}
          </div>
        );
      
        
      }):<div>
      {member.username}/{member.department}
      <br />
      {member.contact}/{member.email}
    </div>)

  return (
    <RouteCardStyle
      color={color}
      isPassed={isPassed}
      isPresent={isPresent}
      complete={complete}
      member={Array.isArray(member)&&member.length}
      isRejected={isRejected}
      isRefusal={isRefusal}
      highLight={highLight}
    >
      <span className=" icon" />
      {upperLine ? <div className="upperLine" /> : ""}
      <div className="cardTitle" title={title}>{title}</div>
      <div className="name">{memberList?memberList:<div> <br /></div>}</div>

      {complete ? "" : <div className="line" />}

      {complete ? (
        ""
      ) :openMember? (<span className="material-icons img search" onClick={openMember}>search</span>
      ): member&&member[0].profileImage ? (
        <img
          className="img"
          src={member[0].profileImage.replace(
            "src/main/prodmedia",
            `${process.env.REACT_APP_BASE_URL}`
          )}
          alt=""
        />
      ) : (<div></div>
      )}

      {onClick ? (
        <button
          type="button"
          className="material-icons search"
          onClick={() => {
            onClick();
          }}
        >
          search
        </button>
      ) : (
        ""
      )}
    </RouteCardStyle>
  );
}
