import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
// import FormData from "form-data";

import Input from "../atom/Input";
import commonStore, { userStore } from "../store/commonStore";
import Button from "../atom/Button";
// import logoLong from "../static/logo-long1.svg";

const LoginStyle = styled.div`
  background-color: var(--eciBlue);
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Noto Sans KR", sans-serif;
  .logoTop {
    position: fixed;
    top: 20px;
    left: 20px;
  }
  .center {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 500px;
    height: 500px;
    .title {
      width: 100%;
      color: white;
      font-weight: 500;
      font-size: 24px;
      text-align: center;
      .logo {
        width: 190px;
      }
    }
    .inputContainer {
      width: 320px;
      input {
        border-bottom: solid white 1px;
        font-family: "NotoSansKR";
      }
      input::placeholder {
        font-family: "NotoSansKR";
      }
    }
    .buttonContainer {
      width: 320px;
      height: 150px;
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      .line {
        border-top: solid var(--textGray) 1px;
        width: 100%;
        position: relative;
        .or {
          position: absolute;
          top: -10px;
          left: 135px;
          color: var(--textGray);
          width: 30px;
          height: 20px;
          background-color: var(--eciBlue);
          text-align: center;
        }
      }
      button {
        font-family: "Noto Sans KR", sans-serif;
        font-weight: 800;
        outline: 0;
        /* border: white solid 1px; */
      }
    }
  }
`;
export default function LogIn() {
  const { setUserToken } = commonStore();
  const { setUserData } = userStore();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const sendLogIn = async () => {
    const formData = new FormData();
    formData.append("email", id);
    formData.append("password", password);
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/sign-in`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUserToken(response.data.result.data);
      setUserData(response.data.result.data.member);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.result) {
        alert(error.response.data.result.msg);
      } else {
        navigate("/notFound");
      }
    }
  };
  return (
    <LoginStyle>
      {/* <img src={logoLong} alt="" className="logoTop" /> */}
      <div className="center">
        <div className="title">
          Synchronize Every Work <br />
          {/* <img src={logoLong} alt="" className="logo" /> */}
        </div>
        <div className="inputContainer">
          <Input
            width="320px"
            height="40px"
            setState={setId}
            placeholder="Email"
            color="white"
          />

          <Input
            width="320px"
            height="40px"
            setState={setPassword}
            placeholder="Password"
            color="white"
            // pattern={`^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$`}
            // errorMessage={txt.common.loginErrorMessage}
            type="password"
          />
        </div>
        <div className="buttonContainer">
          <Button
            backgroundColor="white"
            color="var(--eciBlue)"
            width="320px"
            height="50px"
            fontSize="14px"
            onClick={sendLogIn}
            condition={!!id && !!password}
          >
            Login
          </Button>
        </div>
      </div>
    </LoginStyle>
  );
}
