import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";

// !!! 로그인했을 때만 클릭 가능하도록!!

export default function LikeScrapContainer() {
  const [likeCnt, setLikeCnt] = useState(10);
  const [scrapCnt, setScrapCnt] = useState(10);
  const [isLiked, setIsLiked] = useState(false);
  const [isScrapped, setIsScrapped] = useState(false);

  const onClickLike = () => {
    isLiked ? setLikeCnt(likeCnt - 1) : setLikeCnt(likeCnt + 1);
    setIsLiked(!isLiked);
  };
  const onClickScrap = () => {
    isScrapped ? setScrapCnt(scrapCnt - 1) : setScrapCnt(scrapCnt + 1);
    setIsScrapped(!isScrapped);
  };
  return (
    <Container>
      <ButtonWrapper isChecked={isLiked} onClick={() => onClickLike()}>
        <FontAwesomeIcon
          icon={faHeart}
          color={!isLiked ? "#DFDFDF" : "#ffffff"}
          size="2x"
        />
        <ButtonCnt isChecked={isLiked}>{likeCnt}</ButtonCnt>
      </ButtonWrapper>

      <ButtonWrapper isChecked={isScrapped} onClick={() => onClickScrap()}>
        <FontAwesomeIcon
          icon={faStar}
          color={isScrapped ? "#ffffff" : "#DFDFDF"}
          size="2x"
        />
        <ButtonCnt isChecked={isScrapped}>{scrapCnt}</ButtonCnt>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
`;
const ButtonWrapper = styled.button<{ isChecked: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 60px;
  border: 1px solid
    ${({ isChecked }) => (isChecked ? "var(--purple)" : "var(--light-gray03)")};
  background-color: ${({ isChecked }) =>
    isChecked ? "var(--purple)" : "white"};
`;
const ButtonCnt = styled.span<{ isChecked: boolean }>`
  margin-top: 3px;
  color: ${({ isChecked }) => (isChecked ? "white" : "var(--purple)")};
  font-size: 0.875rem;
`;
