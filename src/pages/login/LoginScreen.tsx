import React, { useEffect, useState } from "react";
import CommonContainer from "../../components/CommonContainer";
import styled from "styled-components";

export default function LoginScreen() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [activeSubBtn, setActiveSubBtn] = useState(false);

  const handleId = (val: string) => {
    setId(val);
  };
  const handlePw = (val: string) => {
    setPw(val);
  };
  const handleSubmit = () => {
    // 로그인 처리
  };

  useEffect(() => {
    if (id.trim().length > 0 && pw.trim().length > 0) {
      setActiveSubBtn(true);
    } else {
      setActiveSubBtn(false);
    }
  }, [id, pw]);

  return (
    <CommonContainer>
      <Title>로그인</Title>
      <InputContainer>
        <InputBox
          type="text"
          placeholder="Id"
          onChange={(e) => handleId(e.target.value)}
          value={id}
        />
        <InputBox
          type="password"
          placeholder="Password"
          onChange={(e) => handlePw(e.target.value)}
          value={pw}
        />
      </InputContainer>
      <SubmitButton
        disabled={!activeSubBtn}
        isActive={activeSubBtn}
        type="submit"
        onClick={handleSubmit}
      >
        로그인
      </SubmitButton>
    </CommonContainer>
  );
}
const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
`;
const InputContainer = styled.div`
  margin: 7rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
const InputBox = styled.input`
  width: 100%;
  padding: 0.6rem 1rem;
  border-radius: 4px;
  border: 1px solid var(--purple);
  &::placeholder {
    color: var(--gray01);
  }
`;

const SubmitButton = styled.button<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  color: white;
  font-size: 1rem;
  width: 100%;
  padding: 0.8rem;
  background-color: ${({ isActive }) =>
    isActive ? "var(--purple)" : "var(--light-gray03)"};
  /* background-color: var(--purple); */
  border-radius: 4px;
`;
