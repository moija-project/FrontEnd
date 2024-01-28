import React, { useEffect } from "react";
import CommonContainer from "../../components/CommonContainer";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getPostQuestion } from "../../api/service-api/clubPostApi";
import { useRecoilState } from "recoil";
import { postQuestionAnswerState } from "../../store/postStore";
import ContentsContainer from "./components/ContentsContainer";

export default function AnswerQuestionsScreen() {
  const { postId } = useParams();
  const [postQuestion, setPostQuestion] = useRecoilState(
    postQuestionAnswerState
  );
  useEffect(() => {
    const getData = async () => {
      const res = await getPostQuestion({
        user_id: "testman1",
        post_id: Number(postId),
      });
      if (res === undefined || res.length === 0) return;
      setPostQuestion(res);
    };
    getData();
  }, []);
  return (
    <CommonContainer>
      <Title>가입 조건 질문 답변하기</Title>
      <Instruction>
        작성자에게 1대1 채팅을 요청하기 위해서는 작성자가 만든 가입 조건 질문에
        답해야해요!
      </Instruction>
      <ContentsContainer />
    </CommonContainer>
  );
}

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;
const Instruction = styled.span`
  font-size: 1rem;
  color: var(--gray01);
  margin-top: 0 0 4.8rem;
`;
