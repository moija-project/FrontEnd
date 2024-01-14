import React from "react";
import styled from "styled-components";

export default function ButtonsContainer() {
  return (
    <Container>
      <SettingWrapper>
        <ColoredButton>모집 종료하기</ColoredButton>
        <NonColoredButton>모집하기</NonColoredButton>
      </SettingWrapper>
      <ColoredButton>모집 종료하기</ColoredButton>
      <NonColoredButton>모집하기</NonColoredButton>
      <RedBorderButton>삭제하기</RedBorderButton>
      <DisabledButton disabled>모집이 종료됐어요</DisabledButton>
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
  font-size: 16px;
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
  font-size: 16px;
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
  font-size: 16px;
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
  font-size: 16px;
`;
