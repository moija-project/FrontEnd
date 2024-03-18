import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import {  ProfileResType } from "../interfaces/user-type";
import { useRecoilState } from "recoil";
import { myProfileInfoState } from "../store/userStore";
import {
  patchMyProfileImg,
  patchMyProfileNickname,
  postMyProfile,
} from "../api/service-api/profileApi";
import useUserProfile from "../hook/useUserProfile";

type ProfileModalProps = {
  setOpen: (open: boolean) => void;
  profileData?: ProfileResType;
};

export default function ProfileModal({
  setOpen,
  profileData,
}: ProfileModalProps) {
  let defaultNickname = profileData?.nickname;
  const [postImg, setPostImg] = useState<any>();
  // const
  const [previewImg, setPreviewImg] = useState<any>();
  const [inpuNickname, setInputNickname] = useState(defaultNickname);
  const [myProfile, setMyProfile] = useRecoilState(myProfileInfoState);

  let isUser = myProfile.user_id === profileData?.user_id;

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();
    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setPostImg(e.target.files[0]);
      reader.onloadend = () => {
        const previewImgUrl = reader.result;

        if (previewImgUrl) {
          setPreviewImg(previewImgUrl);
        }
      };
    }
  };

  const handleModal = (close: boolean) => {
    close && setOpen(false);
  };
  const handleEditSubmit = async () => {
    console.log(inpuNickname === defaultNickname);
    let formData = new FormData();
    formData.append("file", postImg);
    if (window.confirm("수정하시겠습니까?")) {
      // 수정하기
      let nicknameRes;
      if (inpuNickname && inpuNickname !== defaultNickname) {
        nicknameRes = await patchMyProfileNickname(inpuNickname);
        console.log(nicknameRes);
      }
      const imgRes = await patchMyProfileImg(formData);

      if (
        (inpuNickname === defaultNickname && imgRes?.data.isSuccess) ||
        (inpuNickname !== defaultNickname &&
          nicknameRes?.data.isSuccess &&
          imgRes?.data.isSuccess)
      ) {
        setMyProfile({
          ...myProfile,
          photo_profile: previewImg,
          nickname: inpuNickname ?? defaultNickname ?? "",
        });
        alert("수정되었습니다!");
        setOpen(false);
      } else {
        alert("프로필 수정에 문제가 생겼습니다.");
      }
    }
  };
  const _renderColoredHeart = (score: number) => {
    let rate = score * 19.5;
    return (
      <HeartWrapper
        style={{ width: rate, overflow: "hidden", whiteSpace: "nowrap" }}
      >
        {[1, 2, 3, 4, 5].map((v, i) => (
          <FontAwesomeIcon
            key={`default-heart-${i}`}
            icon={faHeart}
            color="#CEA1E7"
          />
        ))}
      </HeartWrapper>
    );
  };
  const _renderDefaultHeart = () => {
    return (
      <HeartWrapper style={{ width: 95 }}>
        {[1, 2, 3, 4, 5].map((v, i) => (
          <FontAwesomeIcon
            key={`default-heart-${i}`}
            icon={faHeart}
            color="#e3e3e3"
          />
        ))}
      </HeartWrapper>
    );
  };

  useEffect(() => {
    setPreviewImg(
      !profileData?.photo_profile || profileData.photo_profile === ""
        ? require("../assets/images/default-img-01.png")
        : profileData.photo_profile
    );
  }, []);

  return (
    <Modal setClose={handleModal} open>
      <Container>
        <ProfileImgWrapper>
          <ProfileImg
            src={
              // !profileData?.photo_profile || profileData.photo_profile === ""
              //   ? require("../assets/images/default-img-01.png")
              //   : profileData.photo_profile
              previewImg
            }
          />

          {myProfile.user_id === profileData?.user_id && (
            <>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                style={{ display: "none" }}
                id="file_btn"
                onChange={(e) => onUploadImage(e)}
              />
              <ProfileImgEdit htmlFor="file_btn">
                <FontAwesomeIcon icon={faPenToSquare} color="#ffffff" />
              </ProfileImgEdit>
            </>
          )}
        </ProfileImgWrapper>
        <Nickname
          type="text"
          placeholder={defaultNickname}
          disabled={!(myProfile.user_id === profileData?.user_id)}
          onChange={(e) => setInputNickname(e.target.value)}
          value={inpuNickname}
          defaultValue={profileData?.nickname}
        />

        <Birth>
          {profileData?.gender} {profileData?.birth_year}
        </Birth>
        <CredWrapper>
          <CredTitle>신뢰도 점수</CredTitle>
          <ScoreWrapper>
            {/* <HeartContainer>
              {_renderDefaultHeart()}
              {_renderColoredHeart(2.5)}
            </HeartContainer> */}
            <MyScore>
              {profileData?.reliability_user} 점 <TotalScore> / 5점</TotalScore>
            </MyScore>
          </ScoreWrapper>
        </CredWrapper>
        {myProfile.user_id === profileData?.user_id && (
          <EditButton onClick={handleEditSubmit}>수정하기</EditButton>
        )}
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const ProfileImgWrapper = styled.div`
  width: 9rem;
  height: 9rem;
  position: relative;
`;
const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
`;
const ProfileImgEdit = styled.label`
  object-fit: none;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  background-color: var(--purple);
  border: 0.25rem solid white;
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 2.3rem;
  position: absolute;
  top: 0;
  right: 0;
`;

const Nickname = styled.input`
  margin: 1.62rem 0 0.7rem;
  font-size: 1.25rem;
  font-weight: 500;
  border: 1px solid var(--light-gray02);
  border-radius: 4px;
  padding: 3px;
  text-align: center;
  &:focus {
    border-color: var(--purple);
  }
  &:disabled {
    background-color: white;
    border: none;
  }
`;
const Birth = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--purple);
`;
const CredWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  margin: 1.6rem 0 1.25rem;
`;
const CredTitle = styled.span`
  font-size: 0.75rem;
  text-align: center;
  color: var(--gray01);
`;
const HeartContainer = styled.div`
  position: relative;
  display: flex;
  /* justify-content: flex-start; */
`;
const HeartWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  gap: 0.25rem;
`;
const ScoreWrapper = styled.div`
  margin-top: 0.4rem;
  display: flex;
  flex-direction: row;
`;
const MyScore = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  margin-right: 0.3rem;
`;
const TotalScore = styled.span`
  font-size: 0.88rem;
  font-weight: 400;
`;
const EditButton = styled.button`
  max-width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  color: white;
  background-color: var(--purple);
  border-radius: 4px;
  padding: 0.5rem 6.8rem;
  font-size: 1rem;
  white-space: nowrap;
  text-align: center;
  @media (max-width: 580px) {
    font-size: 0.7rem;
  }
`;
