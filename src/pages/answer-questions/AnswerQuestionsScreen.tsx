import React, { useEffect, useState } from "react";
import CommonContainer from "../../components/CommonContainer";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPostQuestion,
  postAnswering,
} from "../../api/service-api/clubPostApi";
import { useRecoilState } from "recoil";
import { postQuestionAnswerState } from "../../store/postStore";
import ContentsContainer from "./components/ContentsContainer";
import { AnsweringReqType } from "../../interfaces/post-type";

export default function AnswerQuestionsScreen() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [postQuestion, setPostQuestion] = useRecoilState(
    postQuestionAnswerState
  );
  const [answers, setAnswers] = useState<string[] | []>();

  const handleSubmit = async () => {
    if (answers?.some((item) => item.trim() === "")) {
      window.alert("모든 질문에 대해 답변해주세요!");
      return;
    }
    let data: AnsweringReqType = {
      user_id: "testman1",
      num_answer: answers?.length ?? 0,
      is_ask: true,
      answers: answers ?? [],
    };
    const res = await postAnswering(data, Number(postId));
    if (res?.data.isSuccess) {
      window.alert("1대1 채팅 요청됐습니다!");
      navigate("/clubList");
    } else window.alert("1대1 채팅 요청에 실패했습니다. 다시 시도해주세요.");
  };

  useEffect(() => {
    const getData = async () => {
      // 질문 세팅 (보여주기)
      const res = await getPostQuestion({
        user_id: "testman1", //fix
        post_id: Number(postId),
      });
      if (res === undefined || res.length === 0) return;
      setPostQuestion(res);
    };
    getData();
  }, []);

  useEffect(() => {
    setAnswers(postQuestion?.map((item) => item.answer ?? ""));
    console.log(answers);
  }, [postQuestion]);
  return (
    <CommonContainer>
      <Title>가입 조건 질문 답변하기</Title>
      <Instruction>
        작성자에게 1대1 채팅을 요청하기 위해서는 작성자가 만든 가입 조건 질문에
        답해야해요!
      </Instruction>
      <ContentsContainer />
      <SubmitBtn isActive onClick={handleSubmit}>
        1대1 채팅 요청하기
      </SubmitBtn>
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

const SubmitBtn = styled.button<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: 4px;
  color: white;
  text-align: center;
  padding: 11px;
  background-color: ${({ isActive }) =>
    isActive ? "var(--purple)" : "var(--gray01)"};
  font-size: 1.125rem;
`;
