import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ScrollControllerButton from "./ScrollControllerButton";

const ScrollControllerStyle = styled.div`
  width: calc(${(props) => props.width});
  :nth-child(${(props) => props.currentButton}) {
    color: white;
    background-color: var(--eciBlue);
    font-size: 30px;
  }
`;

export default function ScrollController({ width, scrollRef, buttonArray }) {
  const [currentY, setCurrentY] = useState(0);
  const [currentButton, setcurrentButton] = useState(0);
  let buttonList;
  for (let j = 0; j < buttonArray.length; j += 1) {
    buttonList = (
      <ScrollControllerButton
        width={width}
        colorType={
          buttonArray.length - j - 1 === currentButton ? "blue" : "normal"
        }
        onClick={(e) => {
          scrollRef.current.scrollTo({
            top: buttonArray[buttonArray.length - j - 1][0].current.offsetTop,
            behavior: "smooth",
          });
          e.stopPropagation();
        }}
        upButton={buttonList}
      >
        {buttonArray[buttonArray.length - j - 1][1]}
      </ScrollControllerButton>
    );
  }

  useEffect(() => {
    scrollRef.current.addEventListener("scroll", () => {
      // 리팩토링 : ref가 다른 컴포넌트에서 useeffect로 넘어오다보니가 undefined 다음에 값이 넘어온다.
      if (buttonArray[buttonArray.length - 1]) {
        const current = scrollRef.current && scrollRef.current;
        for (let i = 1; i < buttonArray.length; i += 1) {
          if (
            buttonArray[i - 1][0].current &&
            buttonArray[buttonArray.length - 1][0].current
          ) {
            if (
              current.scrollTop >
                buttonArray[i - 1][0].current.offsetTop - 40 &&
              current.scrollTop <= buttonArray[i][0].current.offsetTop - 40
            ) {
              setcurrentButton(i - 1);
            }

            if (
              current.scrollTop >
              buttonArray[buttonArray.length - 1][0].current.offsetTop - 40
            ) {
              setcurrentButton(buttonArray.length - 1);
            }
          }
        }
      }
    });
  }, [scrollRef, buttonArray, currentButton]);
  return (
    <ScrollControllerStyle i={currentButton} width={width}>
      {buttonList}
    </ScrollControllerStyle>
  );
}
