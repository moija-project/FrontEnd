import React from "react";
import styled from "styled-components";
import ProfileWrapper from "./ProfileWrapper";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  accessTokenState,
  isLoggedInState,
  myProfileInfoState,
} from "../../../store/userStore";
import { removeCookie } from "../../../utils/cookie";
import { postLogout } from "../../../api/service-api/userApi";

export default function ProfileBox() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [isLoggedin, setIsLoggedin] = useRecoilState(isLoggedInState);
  const [myProfile, setMyProfile] = useRecoilState(myProfileInfoState);

  const moveToMypage = () => {
    if (localStorage.getItem("accessToken")) navigate("/mypage");
    else {
      window.alert("로그인을 다시해주세요");
      navigate("/login");
    }
  };

  const getLogout = async () => {
    const res = await postLogout();
    if (res?.status === 200) {
      localStorage.removeItem("accessToken");
      removeCookie("REFRESH_TOKEN");
      setMyProfile({
        nickname: "",
        user_id: "",
        birth_year: "",
        photo_profile: "",
        reliability_user: 0,
        gender: "",
      });
      setIsLoggedin(false);
    } else {
      localStorage.removeItem("accessToken");
    }
  };

  const handleLogout = () => {
    if (window.confirm("정말 로그아웃 하실 건가요?")) {
      getLogout();
      // localStorage.removeItem("accessToken");
      // removeCookie("REFRESH_TOKEN");
      // setIsLoggedin(false);
    }
  };
  return (
    <Container>
      <ProfileWrapper />
      <ButtonWrapper>
        <BoxButton isColored={true} onClick={moveToMypage}>
          채팅 목록
        </BoxButton>
        <BoxButton onClick={handleLogout} isColored={false}>
          로그아웃
        </BoxButton>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-width: 324px;
  padding: 20px;
  border-radius: 4px;
  background-color: white;
`;

const ButtonWrapper = styled.div`
  margin-top: 26px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
`;
const BoxButton = styled.button<{ isColored: boolean }>`
  /* width: 150px; */
  white-space: nowrap;
  width: 100%;
  height: 50px;
  font-size: 1.125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ isColored }) =>
    isColored ? "var(--purple)" : "white"};
  color: ${({ isColored }) => (isColored ? "white" : "var(--purple)")};
  border-radius: 4px;
  ${({ isColored }) => !isColored && "border: 1px solid var(--purple);"}
`;
