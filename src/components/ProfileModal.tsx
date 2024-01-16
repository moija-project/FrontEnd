import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

type ProfileModalProps = {
  setOpen: (open: boolean) => void;
};
const sample =
  "https://i.pinimg.com/564x/21/b9/1e/21b91ef8c190540c9f6262dc92df015a.jpg";

export default function ProfileModal({ setOpen }: ProfileModalProps) {
  const [postImg, setPostImg] = useState<any>();
  const [previewImg, setPreviewImg] = useState<any>();

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
  const handleEditSubmit = () => {
    if (window.confirm("수정하시겠습니까?")) {
      // 수정하기
      alert("수정되었습니다!");
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
  return (
    <Modal setClose={handleModal} open>
      <Container>
        <ProfileImgWrapper>
          <ProfileImg src={previewImg ? previewImg : sample} />
          <input
            type="file"
            style={{ display: "none" }}
            id="file_btn"
            onChange={(e) => onUploadImage(e)}
          />
          <ProfileImgEdit htmlFor="file_btn">
            <FontAwesomeIcon icon={faPenToSquare} color="#ffffff" />
          </ProfileImgEdit>
        </ProfileImgWrapper>
        <Nickname>닉네임</Nickname>
        <Birth>2000년 생</Birth>
        <CredWrapper>
          <CredTitle>신뢰도 점수</CredTitle>
          <ScoreWrapper>
            {/* <HeartContainer>
              {_renderDefaultHeart()}
              {_renderColoredHeart(2.5)}
            </HeartContainer> */}
            <MyScore>
              5 점 <TotalScore> / 5점</TotalScore>
            </MyScore>
          </ScoreWrapper>
        </CredWrapper>
        <EditButton onClick={handleEditSubmit}>프로필 수정하기</EditButton>
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
const Nickname = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
  margin: 1.62rem 0 0.25rem;
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
  max-width: 36rem;
  margin: 1rem auto;
  color: white;
  background-color: var(--purple);
  border-radius: 4px;
  padding: 0.5rem 6.8rem;
`;
