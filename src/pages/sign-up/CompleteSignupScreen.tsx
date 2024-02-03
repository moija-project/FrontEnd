import React from "react";
import CommonContainer from "../../components/CommonContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

export default function CompleteSignupScreen() {
  return (
    <CommonContainer>
      <IconWrapper>
        <FontAwesomeIcon
          icon={faEnvelopeCircleCheck}
          size="4x"
          color="#CEA1E7"
        />
      </IconWrapper>
      <TextWrapper>
        <Title>이메일로 인증 메일을 보냈어요!</Title>
        <Content>
          작성해주셨던 이메일 주소로 회원 인증 주소 링크를 보냈어요. <br />{" "}
          이메일을 확인하시고 링크로 들어가서 회원 인증을 마무리 해주세요.{" "}
          <br />
          회원 인증까지 마무리해야 회원 가입이 정상적으로 완료가 돼요!
        </Content>
      </TextWrapper>
    </CommonContainer>
  );
}

const IconWrapper = styled.div`
  margin: 7rem auto 4rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Title = styled.h1`
  font-size: 1.5rem;
  color: var(--purple);
`;
const Content = styled.span`
  text-align: center;
  font-size: 1rem;
  line-height: 1.5rem;
`;
