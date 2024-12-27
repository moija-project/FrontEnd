import { useState } from 'react';
import styled from 'styled-components';

type QuestionContainerProps = {
  setScore: (score: number, num: number) => void;
  qustionNum: number;
  questionText: string;
};

const scoresArr = [
  { score: 0.2, text: '전혀 아니다' },
  { score: 0.4, text: '아니다' },
  { score: 0.6, text: '보통이다' },
  { score: 0.8, text: '그렇다' },
  { score: 1, text: '매우 그렇다' },
];

export default function QuestionContainer({ setScore, qustionNum, questionText }: QuestionContainerProps) {
  const [checkedScore, setCheckedScore] = useState<number>();
  const onClickScore = (idx: number) => {
    setCheckedScore(idx);
    setScore(scoresArr[idx].score, qustionNum);
  };

  return (
    <ContentItem>
      <Question>{questionText}</Question>
      <ButtonsWrapper>
        {scoresArr.map((v, i) => (
          <ButtonWrapper key={`score-${i}`} onClick={() => onClickScore(i)} isChecked={i === checkedScore}>
            <RadioButton />
            <RadioButtonLabel>{v.text}</RadioButtonLabel>
          </ButtonWrapper>
        ))}
      </ButtonsWrapper>
    </ContentItem>
  );
}
const ContentItem = styled.div`
  margin-bottom: 3.75rem;
  display: flex;
  flex-direction: column;
`;
const Question = styled.span`
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const ButtonWrapper = styled.div<{ isChecked: boolean }>`
  cursor: pointer;
  width: 5rem;
  height: 5rem;
  border-radius: 5rem;
  background-color: ${({ isChecked }) => (isChecked ? 'var(--purple)' : 'var(--light-gray03)')};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RadioButton = styled.input`
  display: none;
`;
const RadioButtonLabel = styled.label`
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
`;
