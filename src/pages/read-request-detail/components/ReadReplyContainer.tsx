import React from "react";
import styled from "styled-components";

export default function ReadReplyContainer() {
  const _renderReplyItems = (idx: number, question: string, answer: string) => {
    return (
      <ItemWrapper key={`question-item-${idx}`}>
        <Question>
          {idx + 1}. 가입 질문가입 질문가입 질문가입 질문가입 질문가입 질문가입
          질문가입 질문가입 질문
        </Question>
        <Answer>
          작성한 답변작성한 답변작성한 답변작성한 답변작성한 답변작성한
          답변작성한 답변
        </Answer>
      </ItemWrapper>
    );
  };
  return (
    <Container>
      <Line />

      <Title>
        [참여하고싶은사람닉네임] 님 께서 작성한
        <br />
        가입 조건 질문 답변을 확인해보세요!
      </Title>
      <ItemsContainer>
        {[1, 1, 1, 1].map((item, idx) => _renderReplyItems(idx, "", ""))}
      </ItemsContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;
const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.8rem;
  margin-bottom: 2.5rem;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--light-gray03);
  margin: 4.3rem 0;
`;
const ItemsContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Question = styled.span`
  color: var(--gray01);
  font-size: 1rem;
  line-height: 1.5rem;
`;
const Answer = styled.span`
  color: black;
  font-size: 1rem;
  line-height: 1.5rem;
`;
