import React, { useState } from "react";
import CommonContainer from "../../components/CommonContainer";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PreviewProfile from "../../components/PreviewProfile";
import ReviewContentContainer from "./components/ReviewContentContainer";
import { postReviewClub } from "../../api/service-api/clubPostApi";

/*
type - 'peer' / 'club' 
*/

export default function ReviewCredScreen() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [totalScore, setTotalScore] = useState(0);
  let type = state.type;
  let postId = state.postId;

  const handleSumScore = (sum: number) => {
    setTotalScore(sum);
  };

  const postClubReview = async () => {
    const res = await postReviewClub(postId,totalScore) ;
    return res.isSuccess
  }

  const handleSubmit = () => {
    // Post api 로 데이터 보내기
    // 게시물 상세 페이지로 이동
    let res ;
    if (window.confirm("신뢰도 평가를 제출하시겠습니까?")) {
      if (type === 'club') { // 모임 평가
        res = postClubReview()
      } else { // 개인 평가

      }

      if (res) {
        alert("제출되었습니다!");
        navigate("/clubList");
      }
    }
  };

  return (
    <CommonContainer>
      <Title>{type === "peer" ? "개인" : "모임"} 신뢰도 평가하기</Title>
      {type === "peer" && <PreviewProfile hasBorder />}
      <ReviewContentContainer
        postId={state.postId}
        type={type}
        setSumScore={handleSumScore}
      />

      <TotalScoreWrapper>
        <CalculatedTotal>
          {totalScore === 0 ? " " : totalScore + " 점"}
        </CalculatedTotal>
        <DefaultTotal>/ 5점</DefaultTotal>
      </TotalScoreWrapper>
      {totalScore === 0 ? (
        <SubmitButton disabled onClick={handleSubmit} pressable={false}>
          모든 질문에 답해주세요
        </SubmitButton>
      ) : (
        <SubmitButton onClick={handleSubmit} pressable>
          신뢰도 평가 제출하기
        </SubmitButton>
      )}
    </CommonContainer>
  );
}
const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;
const SubmitButton = styled.button<{ pressable: boolean }>`
  ${({ pressable }) => !pressable && "pointer-events: none;"}
  width: 100%;
  border-radius: 4px;
  background-color: var(--purple);
  background-color: ${({ pressable }) =>
    pressable ? "var(--purple)" : "var(--gray01)"};
  color: white;
  text-align: center;
  padding: 0.7rem;
  display: flex;
  justify-content: center;
  margin: 2.6rem 0;
`;

const TotalScoreWrapper = styled.div`
  margin: auto;
  width: 100%;
  text-align: center;
`;
const CalculatedTotal = styled.span`
  font-size: 2rem;
  font-weight: 600;
  margin-right: 0.25rem;
`;
const DefaultTotal = styled.span`
  font-size: 1.125rem;
  font-weight: 400;
`;
