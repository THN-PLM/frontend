import React, { useState } from "react";
import styled from "styled-components";

const CategorizedTreeStyle = styled.div`
  width: calc(${(props) => props.width});
  line-height: 20px;
  .lv1 {
    color: var(--textDarkGray);
    font-size: 8px;
    font-weight: 600;
    .spin {
      transform: ${(props) => props.isToggle && "rotate(-90deg)"};
      cursor: pointer;
    }
  }
  .child {
    width: 100%;
    background-color: white;
    border-radius: 5px;
    padding: 5px;
    display: ${(props) => props.isToggle && "none"};
  }

  .lv2BoxStyle {
    padding-left: 10px;
    color: var(--textDarkGray);
    .lv2Name {
      border-bottom: solid var(--textDarkGray) 1px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    span {
      color: var(--textDarkGray);
      font-size: 11px;
    }
    .click {
      font-size: 12px;
    }
    cursor: pointer;
  }
  .lv3BoxStyle {
    color: var(--textDarkGray);
    font-size: 12px;
    height: 24px;
    padding-left: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: var(--textDarkGray);
      font-size: 11px;
    }
    .click {
      font-size: 12px;
    }
    cursor: pointer;
  }
`;

export default function CategorizedTree({
  name,
  lv2Data,
  setselectedClassArray,
  width,
  lv2Only,
}) {
  const [isToggle, setisToggle] = useState(false);

  const lv2List =
    lv2Data &&
    lv2Data.map((item, i) => {
      const lv3List = lv2Only
        ? ""
        : item.c3SelectDtos &&
          item.c3SelectDtos.map((item2, i2) => {
            return (
              <div
                className="lv3BoxStyle"
                key={i2}
                onClick={() => {
                  setselectedClassArray([
                    {
                      value: item2.value,
                      classification: item2.classification,
                    },
                  ]);
                }}
              >
                <span> {item2.name}</span>
                {item2.last === 1 && (
                  <span
                    className="material-icons click"
                    onClick={() => {
                      setselectedClassArray([
                        {
                          value: item2.value,
                          classification: item2.classification,
                        },
                      ]);
                    }}
                  >
                    navigate_next
                  </span>
                )}
              </div>
            );
          });
      return (
        <div
          className="lv2BoxStyle"
          key={i}
          onClick={() => {
            if (lv2Only) {
              setselectedClassArray([
                {
                  value: item.value,
                  classification: item.classification,
                  tag: item.c3SelectDtos && item.c3SelectDtos[0],
                },
              ]);
            }
          }}
        >
          <div className="lv2Name">
            <span>{item.name}</span>
            {item.last === 1 && (
              <span
                className="material-icons click"
                onClick={() => {
                  if (lv2Only) {
                    setselectedClassArray([
                      {
                        value: item.value,
                        classification: item.classification,
                        tag: item.c3SelectDtos && item.c3SelectDtos[0],
                      },
                    ]);
                  } else {
                    setselectedClassArray([
                      {
                        value: item.value,
                        classification: item.classification,
                      },
                    ]);
                  }
                }}
              >
                navigate_next
              </span>
            )}
          </div>

          {lv3List}
        </div>
      );
    });
  return (
    <CategorizedTreeStyle isToggle={isToggle} width={width}>
      <div className="lv1">
        <span
          className="material-icons spin"
          onClick={() => {
            setisToggle(!isToggle);
          }}
        >
          arrow_drop_down
        </span>
        {name}
      </div>
      <div className="child">{lv2List}</div>
    </CategorizedTreeStyle>
  );
}
