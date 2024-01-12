import React from "react";
import styled from "styled-components";

export default function LoginBox() {
  return (
    <Container>
      <Content>
        로그인하고 <br /> 모임에 참여하거나 직접 모임을 만들어보세요!
      </Content>
      <ButtonWrapper>
        <BoxButton isColored={true}>로그인</BoxButton>
        <BoxButton isColored={false}>회원가입</BoxButton>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: white;
`;

const Content = styled.span``;

const ButtonWrapper = styled.div`
  margin-top: 26px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const BoxButton = styled.button<{ isColored: boolean }>`
  max-width: 120px;
  height: 50px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ isColored }) =>
    isColored ? "var(--purple)" : "white"};
  color: ${({ isColored }) => (isColored ? "white" : "var(--purple)")};
  border-radius: 4px;
  ${({ isColored }) => !isColored && "border: 1px solid var(--purple);"}
`;
