import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { postQuestionAnswerState } from '../../../store/postStore';

export default function ContentsContainer() {
  const [postQuestion, setPostQuestion] = useRecoilState(postQuestionAnswerState);
  const handleAnswering = (answer: string, idx: number) => {
    if (!postQuestion) return;
    let newItem = [...postQuestion];
    newItem[idx] = { ...newItem[idx], answer };
    setPostQuestion(newItem);
  };
  const _renderQuestionItem = (question: string, idx: number) => {
    return (
      <ItemWrapper key={`club-question-${idx}`}>
        <Question>
          {idx + 1}. {question}
        </Question>
        <Answer
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAnswering(e.target.value, idx)}
          value={(postQuestion && postQuestion[idx].answer) || ''}
        />
      </ItemWrapper>
    );
  };

  return <Container>{postQuestion?.map((value, idx) => value && _renderQuestionItem(value.question, idx))}</Container>;
}

const Container = styled.div`
  margin: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Question = styled.span`
  font-size: 1rem;
`;
const Answer = styled.input`
  background-color: white;
  font-size: 1rem;
  color: black;
  padding: 0.5rem;
  width: 100%;
  border: 1px solid var(--purple);
  border-radius: 4px;
  font-weight: 400;
`;
