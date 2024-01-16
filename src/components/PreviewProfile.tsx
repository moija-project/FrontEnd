import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import ProfileModal from "./ProfileModal";

type PreviewProfileProps = {
  hasBorder?: boolean;
};

export default function PreviewProfile({
  hasBorder = false,
}: PreviewProfileProps) {
  const [showModal, setShowModal] = useState(false);
  const handleClickProfile = () => {
    setShowModal(!showModal);
  };
  return (
    <Container hasBorder={hasBorder}>
      {showModal && <ProfileModal setOpen={(open) => setShowModal(open)} />}

      <ProfileImg
        onClick={handleClickProfile}
        src={require("../assets/images/default-img-01.png")}
      />
      {/* </button> */}
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
  padding: 0.94rem ${({ hasBorder }) => (hasBorder ? "20px" : "0")};
  border-radius: 90px;
  ${({ hasBorder }) => hasBorder && "border: 1px solid var(--purple);"}
`;
const ProfileImg = styled.img`
  cursor: pointer;
  width: 4.1rem;
  height: 4.1rem;
  border-radius: 4.1rem;
  margin-right: 0.75rem;
`;
const ProfileContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Nickname = styled.span`
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;
const Content = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
`;
const CredibilityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  align-items: end;
`;
const CredibilityTitle = styled.span`
  font-size: 0.75rem;
  color: var(--gray01);
  margin-bottom: 0.5rem;
`;
const CredibilityScore = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
`;
