import React, { useEffect, useState } from "react";
import CommonContainer from "../../components/CommonContainer";
import styled from "styled-components";
import { postLogin } from "../../api/service-api/userApi";
import { setCookie } from "../../utils/cookie";
import { useRecoilState } from "recoil";
import {
  accessTokenState,
  getAccessTokenState,
  isLoggedInState,
  myProfileInfoState,
  myUserIdState,
} from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import { postMyProfile } from "../../api/service-api/profileApi";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [isLoggedin, setIsLoggedin] = useRecoilState(isLoggedInState);
  const [userProfile, setUserProfile] = useRecoilState(myProfileInfoState);
  const [userId, setUserId] = useRecoilState(myUserIdState); // maybe fix
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [activeSubBtn, setActiveSubBtn] = useState(false);

  const handleId = (val: string) => {
    setId(val);
  };
  const handlePw = (val: string) => {
    setPw(val);
  };
  const fetchProfile = async () => {
    const res = await postMyProfile({});
    res && setUserProfile(res);
  };
  const handleSubmit = async () => {
    // 로그인 처리
    if (!activeSubBtn) return;
    const res = await postLogin(id, pw);
    console.log("!!!!!! ", res);
    if (res?.isSuccess && res.result) {
      // setAccessToken(res.result.accessToken);
      console.log("----------------------", res.result.accessToken);
      localStorage.setItem("accessToken", res.result.accessToken);
      // setCookie("accessToken", res.result.accessToken);
      setIsLoggedin(true);
      setUserId(id); // maybe fix
      // setUserProfile()
      // fetchProfile();
      navigate("/");
    } else {
      window.alert(res?.message);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (id.trim().length > 0 && pw.trim().length > 0) {
      setActiveSubBtn(true);
    } else {
      setActiveSubBtn(false);
    }
  }, [id, pw]);

  return (
    <CommonContainer>
      <Title>로그인</Title>
      <InputContainer>
        <InputBox
          type="text"
          placeholder="Id"
          onChange={(e) => handleId(e.target.value)}
          value={id}
          onKeyDown={handleKeyDown}
        />
        <InputBox
          type="password"
          autoComplete="off"
          placeholder="Password"
          onChange={(e) => handlePw(e.target.value)}
          value={pw}
          onKeyDown={handleKeyDown}
        />
      </InputContainer>
      <SubmitButton
        disabled={!activeSubBtn}
        isActive={activeSubBtn}
        type="submit"
        onClick={handleSubmit}
      >
        로그인
      </SubmitButton>
    </CommonContainer>
  );
}
const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
`;
const InputContainer = styled.form`
  margin: 7rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
const InputBox = styled.input`
  width: 100%;
  padding: 0.6rem 1rem;
  border-radius: 4px;
  border: 1px solid var(--purple);
  &::placeholder {
    color: var(--gray01);
  }
`;

const SubmitButton = styled.button<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  color: white;
  font-size: 1rem;
  width: 100%;
  padding: 0.8rem;
  background-color: ${({ isActive }) =>
    isActive ? "var(--purple)" : "var(--light-gray03)"};
  /* background-color: var(--purple); */
  border-radius: 4px;
`;
