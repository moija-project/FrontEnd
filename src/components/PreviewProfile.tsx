import React, { useEffect, useId, useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import ProfileModal from "./ProfileModal";
import {
  ProfileResType,
  ProfileType,
  UserProfileResType,
} from "../interfaces/user-type";
import { getUserProfile } from "../api/service-api/profileApi";

type PreviewProfileProps = {
  hasBorder?: boolean;
  profileData?: ProfileResType; // 본인 프로필
  user_id?: string; // 타인
};

const defaultImg = require("../assets/images/default-img-01.png");

export default function PreviewProfile({
  hasBorder = false,
  profileData,
  user_id,
}: PreviewProfileProps) {
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState<ProfileResType>();
  const handleClickProfile = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (profileData) setProfile(profileData);
    else if (user_id) {
      const getUserData = async () => {
        const res = await getUserProfile(user_id);
        setProfile(res);
      };
      getUserData();
    }
  }, [user_id, profileData]);

  return (
    <Container hasBorder={hasBorder}>
      {showModal && (
        <ProfileModal
          setOpen={(open) => setShowModal(open)}
          profileData={profile ?? undefined}
        />
      )}
      <div>{user_id}</div>
      <ProfileImg
        onClick={handleClickProfile}
        src={profile?.photo_profile || defaultImg}
      />
      <ProfileContentWrapper>
        <Nickname>{profile?.nickname ?? "nickname"}</Nickname>
        <Content>
          {profile?.gender} {profile?.birth_year}
        </Content>
      </ProfileContentWrapper>
      <CredibilityWrapper>
        <CredibilityTitle>신뢰도 점수</CredibilityTitle>
        <CredibilityScore>{profile?.reliability_user}점</CredibilityScore>
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
