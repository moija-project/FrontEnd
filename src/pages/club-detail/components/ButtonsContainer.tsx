import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  deletePostDetail,
  postAnswering,
  postChangeClubState,
} from "../../../api/service-api/clubPostApi";
import { useRecoilState, useRecoilValue } from "recoil";
import { postDetailState } from "../../../store/postStore";
import { myUserIdState } from "../../../store/userStore";

type ButtonsContainerProps = {
  postId: number;
};

export default function ButtonsContainer({ postId }: ButtonsContainerProps) {
  const navigate = useNavigate();
  const [postDetail, setPostDetail] = useRecoilState(postDetailState);
  const myUserid = useRecoilValue(myUserIdState);
  const moveToClubCredReview = () => {
    navigate("/credReview", { state: { type: "club" } });
  };

  const handleClubState = async (changeTo: "start" | "stop") => {
    const res = await postChangeClubState(postId, changeTo);
    if (res?.data.isSuccess) {
      let newPost = { ...postDetail };
      newPost.state_recruit = !newPost.state_recruit;
      setPostDetail(newPost);
    }
  };
  const postRequestWithoutAnswers = async () => {
    const res = await postAnswering(
      // fix
      {
        user_id: "testman2",
        num_answer: postDetail.num_condition,
        is_ask: true,
        answers: [],
      },
      postId
    );
    if (res?.data.isSuccess) {
      window.alert("1대1 채팅 요청됐습니다!");
      navigate("/clubList");
    } else window.alert("1대1 채팅 요청에 실패했습니다. 다시 시도해주세요.");
  };
  const moveToAnswerQuestions = () => {
    if (!postDetail.num_condition) {
      // 가입조건 질문이 없는 경우 - 바로 요청 등록하기
      postRequestWithoutAnswers();
    } else {
      navigate(`/answerQuestions/${postId}`);
    }
  };
  const moveToRevise = () => {
    navigate(`/reviseClub`, { state: { postId } });
  };
  const handleDelete = () => {
    const deleteData = async () => {
      const res = await deletePostDetail({
        user_id: "testman1",
        post_id: postId,
      });
      if (res?.data.isSuccess) navigate("/clubList");
    };
    if (window.confirm("정말 게시물을 삭제하시겠습니까? ")) {
      deleteData();
    }
  };

  useEffect(() => {
    console.log("--- ", myUserid);
  }, []);

  return (
    <Container>
      <SettingWrapper>
        <NonColoredButton onClick={moveToRevise}>수정하기</NonColoredButton>
        <RedBorderButton onClick={handleDelete}>삭제하기</RedBorderButton>
      </SettingWrapper>
      <ColoredButton onClick={moveToClubCredReview}>
        모집 신뢰도 평가하기
      </ColoredButton>
      <ColoredButton onClick={moveToAnswerQuestions}>
        1대1 채팅 요청하기
      </ColoredButton>
      {postDetail.state_recruit ? (
        <ColoredButton onClick={() => handleClubState("stop")}>
          모집 종료하기
        </ColoredButton>
      ) : (
        <NonColoredButton onClick={() => handleClubState("start")}>
          모집하기
        </NonColoredButton>
      )}

      {!postDetail.state_recruit && (
        <DisabledButton disabled>모집이 종료됐어요</DisabledButton>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const SettingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  width: 100%;
`;

const ColoredButton = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: 4px;
  color: white;
  text-align: center;
  padding: 11px;
  background-color: var(--purple);
  font-size: 1.125rem;
`;

const NonColoredButton = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: 4px;
  border: 1px solid var(--purple);
  color: var(--purple);
  text-align: center;
  padding: 11px;
  background-color: white;
  font-size: 1.125rem;
`;
const RedBorderButton = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: 4px;
  border: 1px solid var(--red);
  color: var(--red);
  text-align: center;
  padding: 11px;
  background-color: white;
  font-size: 1.125rem;
`;

const DisabledButton = styled.button`
  pointer-events: none;
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: 4px;
  color: white;
  text-align: center;
  padding: 11px;
  background-color: var(--gray01);
  font-size: 1.125rem;
`;
