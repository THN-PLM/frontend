import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import FormData from "form-data";

import Input from "../atom/Input";
import commonStore, { userStore } from "../store/commonStore";
import Button from "../atom/Button";
import logoLong from "../static/logo-long1.svg";
import Logo from "../static/logo1.svg";

const SignUpStyle = styled.div`
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
      }
    }
  }
  .profileImg {
    display: flex;
    flex-direction: column;
    height: 80px;
    align-items: center;
    justify-content: space-evenly;
    color: var(--textGray);
    font-size: 14px;
    position: relative;
    .sp {
      font-size: 12px;
      color: black;
      margin: 0 auto;
      text-align: center;
    }
    img {
      width: 45px;
      height: 45px;
      border-radius: 400px;
      background-color: white;
    }
    label {
      width: 16px;
      height: 16px;
      position: absolute;
      top: 40px;
      right: -5px;
      background-color: white;
      border-radius: 3px;
      border: solid black 1px;
    }
  }
`;
export default function SignUp() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setpasswordCheck] = useState("");
  const [userName, setuserName] = useState("");
  const [contact, setcontact] = useState("");
  const [profileImage, setprofileImage] = useState("");
  const [imagePreview, setimagePreview] = useState("");
  const navigate = useNavigate();
  const sendSignUp = async () => {
    const formData = new FormData();
    formData.append("email", id);
    formData.append("password", password);
    formData.append("passwordcheck", passwordCheck);
    formData.append("username", userName);
    formData.append("contact", contact);
    formData.append("prodileImage", profileImage);
    formData.append("positionId", 1);
    formData.append("departmentId", 1);

    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/sign-up`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      if (error.response && error.response.data && error.response.data.result) {
        alert(error.response.data.result.msg);
      } else {
        navigate("/notFound");
      }
    }
  };
  const onChangeFiles = (e) => {
    const { files } = e.target;
    setprofileImage(files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (eve) => {
      setimagePreview(eve.target.result);
    };
  };
  return (
    <SignUpStyle>
      <img src={logoLong} alt="" className="logoTop" />
      <div className="center">
        <div className="title">
          Synchronize Every Work <br />
          <img src={logoLong} alt="" className="logo" />
        </div>
        <div className="profileImg">
          <img src={imagePreview || Logo} alt="" />
          <label htmlFor="profileImage">
            <span className="material-icons sp">mode_edit</span>
            <input
              type="file"
              style={{ display: "none" }}
              id="profileImage"
              onChange={onChangeFiles}
            />
          </label>
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
            type="password"
          />

          <Input
            width="320px"
            height="40px"
            setState={setpasswordCheck}
            placeholder="PasswordCheck"
            color="white"
            type="password"
          />
          <Input
            width="320px"
            height="40px"
            setState={setuserName}
            placeholder="username"
            color="white"
          />
          <Input
            width="320px"
            height="40px"
            setState={setcontact}
            placeholder="contact"
            color="white"
          />
        </div>
        <div className="buttonContainer">
          <Button
            // backgroundColor="white"
            color="var(--eciBlue)"
            width="320px"
            height="50px"
            onClick={sendSignUp}
            condition={!!id && !!password}
          >
            SignUp
          </Button>
        </div>
      </div>
    </SignUpStyle>
  );
}
