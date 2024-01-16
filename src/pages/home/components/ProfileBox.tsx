import React from "react";
import styled from "styled-components";
import ProfileWrapper from "./ProfileWrapper";
import { useNavigate } from "react-router-dom";

export default function ProfileBox() {
  const navigate = useNavigate();

  const moveToMypage = () => {
    navigate("/mypage");
  };
  return (
    <Container>
      <ProfileWrapper />
      <ButtonWrapper>
        <BoxButton isColored={true} onClick={moveToMypage}>
          채팅 목록
        </BoxButton>
        <BoxButton isColored={false}>로그아웃</BoxButton>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  /* width: 100%; */
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
  width: 150px;
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
