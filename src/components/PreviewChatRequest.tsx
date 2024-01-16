import React from "react";
import styled from "styled-components";

export default function PreviewChatRequest() {
  return (
    <MessageItem>
      내가 쓴 [게시물 제목...] 모임 게시물에 [요청보낸사람닉네임..]님이 1대1
      채팅 요청을 보냈어요
    </MessageItem>
  );
}

const MessageItem = styled.div`
  cursor: pointer;
  border: 1px solid var(--purple);
  padding: 0.35rem 0.5rem;
  font-size: 1rem;
  width: 100%;
`;
