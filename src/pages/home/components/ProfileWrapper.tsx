import React from "react";
import styled from "styled-components";

export default function ProfileWrapper() {
  return (
    <ProfileContainer>
      <ProfileImage
        src={require("../../../assets/images/default-img-01.png")}
      />
      <ProfileMiddleWraaper>
        <NickName>닉네임 님</NickName>
        <ProfileContent>여 20대</ProfileContent>
      </ProfileMiddleWraaper>
      <ProfileRightWrapper>
        <Title>신뢰도 점수</Title>
        <Score>5점</Score>
      </ProfileRightWrapper>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: space-between; */
`;
const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;
const ProfileMiddleWraaper = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
`;
const NickName = styled.span`
  font-size: 14px;
  margin-bottom: 8px;
`;
const ProfileContent = styled.span`
  font-size: 14px;
  color: var(--gray01);
`;
const ProfileRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
`;
const Title = styled.span`
  font-size: 12px;
  color: var(--gray01);
  margin-bottom: 6px;
`;
const Score = styled.span`
  font-size: 18px;
  font-weight: 700;
`;
