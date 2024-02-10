import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { postDetailQuestions } from "../../../store/postStore";

type CreateQuestionnaireProps = {
  setListArr: (listArr: string[]) => void;
};

export default function CreateQuestionnaire({
  setListArr,
}: CreateQuestionnaireProps) {
  const [questions, setQuestions] = useRecoilState(postDetailQuestions);
  const [isChecked, setIsChecked] = useState(questions?.length !== 0);
  const [questionCnt, setQuestionCnt] = useState<number>(
    questions?.length && questions?.length !== 0 ? questions.length : 1
  );
  const [questionList, setQuestionList] = useState<any[]>([]);
  const onToggle = () => {
    setIsChecked(!isChecked);
  };
  const onClickAddButton = () => {
    setQuestionCnt(questionCnt + 1);
  };
  const onClickDeleteButton = (idx: number) => {
    const filteredList = questionList.filter((q, i) => i !== idx);
    setQuestionList(filteredList);
    setQuestionCnt(questionCnt - 1);
  };
  const onChangeQuestion = (
    idx: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedList = [...questionList];
    updatedList[idx] = e.target.value;
    setQuestionList(updatedList);
  };

  useEffect(() => {
    console.log("------------- ", questions);
    let questionsSetting = questions?.map((value) => value.question);
    setQuestionList(questionsSetting ?? []);
  }, [questions]);
  useEffect(() => {
    setListArr(questionList);
  }, [questionList]);

  return (
    <Container>
      <TopContainer>
        <TopTextWrapper>
          <TopTitle>가입 조건 질문 등록하기</TopTitle>
          <TopInstruction>
            1대1 채팅을 하기 전에 가입을 원하는 사용자들에게 질문할 수 있어요.
            <br />
            사용자의 답변을 보고 1대1 채팅을 수락하여 팀에 초대할 지
            결정해보세요.
          </TopInstruction>
        </TopTextWrapper>
        <ToggleButton isChecked={isChecked} onClick={() => onToggle()}>
          <ToggleButtonCircle isChecked={isChecked} />
        </ToggleButton>
      </TopContainer>
      {isChecked && (
        <ContentContainer>
          <InstructionText>
            가입을 원하는 사람에게 궁금한 점을 작성해보세요. 질문은 최대
            10개이며, 모든 질문은 단답형 입니다.
          </InstructionText>
          <QuestionsContainer>
            {[...Array(questionCnt)].map((v, i) => (
              <QuestionWrapper id={`${i}`}>
                <QuestionNumber>{i + 1}</QuestionNumber>
                <QuestionInput
                  value={questionList[i] || ""}
                  onChange={(e) => onChangeQuestion(i, e)}
                  placeholder="질문을 작성해주세요. (ex : 토익 점수가 어떻게 되나요?, 어떤 자격증을 준비 중이신가요? 등)"
                />
                <DeleteButton onClick={() => onClickDeleteButton(i)}>
                  <FontAwesomeIcon icon={faXmark} color="#ED4343" />
                </DeleteButton>
              </QuestionWrapper>
            ))}
          </QuestionsContainer>
          <AddButton
            isMax={questionCnt >= 10}
            onClick={() => onClickAddButton()}
          >
            질문 추가하기
          </AddButton>
        </ContentContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 20px 0;
`;
const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const TopTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const TopTitle = styled.h2`
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 8px;
`;
const TopInstruction = styled.span`
  font-size: 0.75rem;
  color: var(--gray01);
`;
const ToggleButton = styled.button<{ isChecked: boolean }>`
  position: relative;
  width: 55px;
  height: 28px;
  border-radius: 55px;
  background-color: ${({ isChecked }) =>
    isChecked ? "var(--purple)" : "var(--light-gray02)"};
`;
const ToggleButtonCircle = styled.div<{ isChecked: boolean }>`
  position: absolute;
  top: 4px;
  ${({ isChecked }) => (isChecked ? "right : 4px;" : "left : 4px;")}
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background-color: white;
`;
const ContentContainer = styled.div`
  margin: 40px 0;
`;
const InstructionText = styled.span`
  font-size: 0.75rem;
`;
const AddButton = styled.button<{ isMax?: boolean }>`
  padding: 6px 0.625rem;
  margin: auto;
  border-radius: 50px;
  background-color: white;
  border: 1px solid var(--purple);
  ${({ isMax }) => isMax && "display : none ;"}
`;
const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.94rem;
`;
const QuestionNumber = styled.label`
  font-size: 1.125rem;
  font-weight: 600;
  margin-right: 0.94rem;
`;
const QuestionInput = styled.input`
  font-size: 1rem;
  font-weight: 400;
  width: 100%;
  padding: 5px 0;
  border: none;
`;
const DeleteButton = styled.button``;
