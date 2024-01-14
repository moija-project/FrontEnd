import React from "react";
import styled from "styled-components";

type PreviewProfileProps = {
  hasBorder?: boolean;
};

export default function PreviewProfile({
  hasBorder = false,
}: PreviewProfileProps) {
  return (
    <Container hasBorder={hasBorder}>
      <ProfileImg src={require("../assets/images/default-img-01.png")} />
      <ProfileContentWrapper>
        <Nickname>닉네임</Nickname>
        <Content>여 20대</Content>
      </ProfileContentWrapper>
      <CredibilityWrapper>
        <CredibilityTitle>신뢰도 점수</CredibilityTitle>
        <CredibilityScore>5점</CredibilityScore>
      </CredibilityWrapper>
    </Container>
  );
}

const Container = styled.div<{ hasBorder: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  padding: 15px ${({ hasBorder }) => (hasBorder ? "20px" : "0")};
  border-radius: 90px;
  ${({ hasBorder }) => hasBorder && "border: 1px solid var(--purple);"}
`;
const ProfileImg = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 65px;
  margin-right: 12px;
`;
const ProfileContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Nickname = styled.span`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
`;
const Content = styled.span`
  font-size: 14px;
  font-weight: 400;
`;
const CredibilityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  align-items: end;
`;
const CredibilityTitle = styled.span`
  font-size: 12px;
  color: var(--gray01);
  margin-bottom: 8px;
`;
const CredibilityScore = styled.span`
  font-size: 20px;
  font-weight: 600;
`;
