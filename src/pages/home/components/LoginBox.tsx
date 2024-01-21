import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function LoginBox() {
  const navigate = useNavigate();

  return (
    <Container>
      <Content>
        로그인하고 <br /> 모임에 참여하거나 직접 모임을 만들어보세요!
      </Content>
      <ButtonWrapper>
        <BoxButton isColored={true} onClick={() => navigate("/login")}>
          로그인
        </BoxButton>
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
  line-height: 1.5rem;
`;

const Content = styled.span`
  white-space: nowrap;
`;

const ButtonWrapper = styled.div`
  margin-top: 26px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1.8rem;
`;
const BoxButton = styled.button<{ isColored: boolean }>`
  width: 100%;
  height: 50px;
  font-size: 1.125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ isColored }) =>
    isColored ? "var(--purple)" : "white"};
  color: ${({ isColored }) => (isColored ? "white" : "var(--purple)")};
  border-radius: 4px;
  ${({ isColored }) => !isColored && "border: 1px solid var(--purple);"}
`;
