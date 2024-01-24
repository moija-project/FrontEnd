import React, { useState } from "react";
import CommonContainer from "../../components/CommonContainer";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import {
  personalInfoText,
  termsText,
} from "../../utils/regulationAgreementText";
import { useNavigate } from "react-router-dom";

export default function RegulationAgreementScreen() {
  const navigate = useNavigate();
  const [terms, setTerms] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(false);

  const handleAll = () => {
    if (terms && personalInfo) {
      setTerms(false);
      setPersonalInfo(false);
    } else {
      setTerms(true);
      setPersonalInfo(true);
    }
  };
  const handleAgreement = (type: "terms" | "personalInfo") => {
    if (type === "terms") setTerms(!terms);
    else setPersonalInfo(!personalInfo);
  };
  const onSubmit = () => {
    navigate("/signup");
  };
  return (
    <CommonContainer>
      <Title>이용 약관 동의</Title>
      <Line />

      <ButtonWrapper onClick={handleAll}>
        <AgreeLabel style={{ fontWeight: 600 }}>
          회원가입 약관에 모두 동의합니다
        </AgreeLabel>
        <AgreeButton isChecked={terms && personalInfo}>
          <FontAwesomeIcon icon={faCheck} color="white" />
        </AgreeButton>
      </ButtonWrapper>
      <DivLine />

      <AgreementContainer>
        <ButtonWrapper onClick={() => handleAgreement("terms")}>
          <AgreeLabel style={{ fontWeight: 600 }}>
            이용약관 동의 <span style={{ color: "var(--red)" }}>(필수)</span>
          </AgreeLabel>
          <AgreeButton isChecked={terms}>
            <FontAwesomeIcon icon={faCheck} color="white" />
          </AgreeButton>
        </ButtonWrapper>
        <AgreementContent>{termsText}</AgreementContent>
      </AgreementContainer>

      <AgreementContainer>
        <ButtonWrapper onClick={() => handleAgreement("personalInfo")}>
          <AgreeLabel style={{ fontWeight: 600 }}>
            개인정보 수집 및 이용 동의{" "}
            <span style={{ color: "var(--red)" }}>(필수)</span>
          </AgreeLabel>
          <AgreeButton isChecked={personalInfo}>
            <FontAwesomeIcon icon={faCheck} color="white" />
          </AgreeButton>
        </ButtonWrapper>
        <AgreementContent>{personalInfoText}</AgreementContent>
      </AgreementContainer>
      <SubmitBtn
        disabled={!(terms && personalInfo)}
        onClick={onSubmit}
        isActive={terms && personalInfo}
      >
        {terms && personalInfo
          ? "회원가입 하기"
          : "모두 동의해야 가입할 수 있어요"}
      </SubmitBtn>
    </CommonContainer>
  );
}

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.29rem;
`;
const Line = styled.div`
  width: 100%;
  margin-bottom: 3rem;
  height: 1.5px;
  background-color: var(--gray01);
`;
const DivLine = styled.div`
  width: 100%;
  background-color: var(--light-gray03);
  height: 1px;
  margin: 1.3rem 0;
`;
const ButtonWrapper = styled.button`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const AgreeLabel = styled.span`
  font-size: 1rem;
`;
const AgreeButton = styled.div<{ isChecked: boolean }>`
  width: 15px;
  height: 15px;
  border: 1px solid var(--purple);
  background-color: ${({ isChecked }) =>
    isChecked ? "var(--purple)" : "white"};
  border-radius: 2px;
`;
const AgreementContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 2rem;
`;
const AgreementContent = styled.div`
  width: 100%;
  height: 15rem;
  border-radius: 4px;
  border: 1px solid var(--purple);
  padding: 1rem;
  overflow: scroll;
  line-height: 1.5rem;
`;
const SubmitBtn = styled.button<{ isActive: boolean }>`
  cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
  margin: 6rem 0 2rem;
  width: 100%;
  padding: 1.2rem;
  display: flex;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
  background-color: ${({ isActive }) =>
    isActive ? "var(--purple)" : "var(--light-gray03)"};
  border-radius: 4px;
  color: white;
`;
