import React, { useEffect, useRef } from "react";
import styled from "styled-components";

type TextMsgBoxProps = {
  isMe: boolean;
  text: string;
  time: string;
};
export default function TextMsgBox({ isMe, text, time }: TextMsgBoxProps) {
  const textRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (textRef.current) {
      const div = textRef.current;
      const textWidth = div.scrollWidth;
      if (textWidth > 100) {
        div.style.wordWrap = "break-word";
        div.style.height = "auto";
      } else {
      }
    }
  }, [text]);
  return (
    <Container isMe={isMe}>
      {isMe ? (
        <>
          <TimeText>{time}</TimeText>
          <ChatBubble isMe={isMe} ref={textRef}>
            {text}
          </ChatBubble>
        </>
      ) : (
        <>
          <ChatBubble isMe={isMe} ref={textRef}>
            {text}
          </ChatBubble>
          <TimeText>{time}</TimeText>
        </>
      )}
    </Container>
  );
}
const Container = styled.div<{ isMe: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  width: 100%;
  align-items: flex-end;
  padding: 0 2rem;
  ${({ isMe }) => isMe && `justify-content: flex-end;`}
`;
const ChatBubble = styled.div<{ isMe: boolean }>`
  background-color: ${({ isMe }) => (isMe ? "var(--purple)" : "#ECECEC")};
  color: ${({ isMe }) => (isMe ? "#ffffff" : "#000000")};
  max-width: 20rem;
  display: inline-block;
  padding: 0.9rem;
  border-radius: 4rem;
`;
const TimeText = styled.p`
  color: var(--gray01);
  font-size: 0.8rem;
  margin-bottom: 0.3rem;
`;
