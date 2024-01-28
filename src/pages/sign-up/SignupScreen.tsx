import React from "react";
import CommonContainer from "../../components/CommonContainer";
import styled from "styled-components";

export default function SignupScreen() {
  return (
    <CommonContainer>
      <Title>회원가입</Title>
      <Container>
        <InputContainer style={{ marginBottom: "2.3rem" }}>
          <InputWrapper>
            <InputBox placeholder="아이디" type="text" />
            <InputButton>중복 확인</InputButton>
          </InputWrapper>
          <InputMsgText isWarning>중복된 아이디입니다.</InputMsgText>
        </InputContainer>

        <InputContainer>
          <InputBox placeholder="비밀번호" type="password" />
        </InputContainer>
        <InputContainer style={{ marginBottom: "2.3rem" }}>
          <InputWrapper>
            <InputBox placeholder="비밀번호 확인" type="password" />
          </InputWrapper>
          <InputMsgText isWarning>비밀번호가 다릅니다</InputMsgText>
        </InputContainer>

        <InputContainer>
          <InputWrapper>
            <InputBox placeholder="휴대폰 번호 (ex: 01011112222)" type="text" />
            <InputButton>인증번호 전송</InputButton>
          </InputWrapper>
        </InputContainer>
        <InputContainer style={{ marginBottom: "2.3rem" }}>
          <InputWrapper>
            <InputBox placeholder="인증번호" type="text" />
            <InputButton>인증번호 확인</InputButton>
          </InputWrapper>
          <InputMsgText isWarning>인증번호가 다릅니다</InputMsgText>
        </InputContainer>

        <InputContainer>
          <InputWrapper>
            <InputBox placeholder="이메일" type="email" />
          </InputWrapper>
        </InputContainer>
        <InputContainer>
          <InputWrapper>
            <InputBox placeholder="닉네임" type="text" />
            <InputButton>중복 확인</InputButton>
          </InputWrapper>
          <InputMsgText isWarning>중복된 닉네임입니다.</InputMsgText>
        </InputContainer>
        <InputContainer style={{ marginTop: "1.2rem" }}>
          <InputWrapper>
            <InstructionTitle>생년월일</InstructionTitle>
            <InputBox type="date" />
          </InputWrapper>
        </InputContainer>
        <InputContainer>
          <InputWrapper>
            <InstructionTitle>성별</InstructionTitle>
            <GenderWrapper>
              <GenderCheckboxWrapper>
                <InputBox
                  type="checkbox"
                  id="female"
                  style={{ display: "none" }}
                />
                <Label isChecked={false} htmlFor="female">
                  여성
                </Label>
              </GenderCheckboxWrapper>
              <GenderCheckboxWrapper>
                <InputBox
                  type="checkbox"
                  id="female"
                  style={{ display: "none" }}
                />
                <Label isChecked={false} htmlFor="male">
                  남성
                </Label>
              </GenderCheckboxWrapper>
            </GenderWrapper>
          </InputWrapper>
        </InputContainer>
      </Container>
    </CommonContainer>
  );
}

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.29rem;
`;
const Container = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
`;
const InputButton = styled.button`
  padding: 0.5rem 0.8rem;
  border-radius: 4px;
  background-color: var(--light-gray03);
  white-space: nowrap;
`;
const InputBox = styled.input`
  width: 100%;
  border-radius: 4px;
  border: 1px solid var(--purple);
  padding: 0.5rem;
`;
const InputMsgText = styled.span<{ isWarning: boolean }>`
  color: ${({ isWarning }) => (isWarning ? "var(--red)" : "var(--purple)")};
  font-size: 0.7rem;
`;
const InstructionTitle = styled.span`
  font-size: 1rem;
  white-space: nowrap;
`;
const Label = styled.label<{ isChecked: boolean }>`
  color: white;
  background-color: ${({ isChecked }) =>
    isChecked ? "var(--purple)" : "var(--gray01)"};
  border-radius: 4px;
  padding: 0.5rem 1rem;
`;
const GenderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  margin-top: 1.2rem;
`;
const GenderCheckboxWrapper = styled.div``;
