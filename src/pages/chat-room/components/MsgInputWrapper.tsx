import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

type MsgInputWrapperProps = {
  setMsg: (msg: string) => void;
  msg: string;
};

export default function MsgInputWrapper({ setMsg, msg }: MsgInputWrapperProps) {
  const handleSendMsg = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // 보내지는 로직
    setMsg("");
  };
  return (
    <InputWrapper>
      <MsgInput
        placeholder="채팅을 남겨보세요"
        onChange={(e) => setMsg(e.target.value)}
        value={msg}
      />
      <SendBtn onClick={(e) => handleSendMsg(e)}>
        <FontAwesomeIcon icon={faPaperPlane} size="lg" color="#ffffff" />
      </SendBtn>
    </InputWrapper>
  );
}
const InputWrapper = styled.form`
  border: 1px solid var(--purple);
  border-radius: 2rem;
  padding: 0.6rem 1rem;
  margin: 2rem 2rem 3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
`;
const MsgInput = styled.input`
  width: 100%;
  border: none;
  font-weight: 600;
`;
const SendBtn = styled.button`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: var(--purple);
  cursor: pointer;
`;
