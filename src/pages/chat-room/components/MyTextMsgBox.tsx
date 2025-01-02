import { useEffect, useRef } from 'react';
import styled from 'styled-components';

type MyTextMsgBoxProps = {
  text: string;
  time: string;
  isRead?: boolean;
};

export default function MyTextMsgBox({ text, time, isRead = false }: MyTextMsgBoxProps) {
  const textRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (textRef.current) {
      const div = textRef.current;
      const textWidth = div.scrollWidth;
      if (textWidth > 100) {
        div.style.wordWrap = 'break-word';
        div.style.height = 'auto';
      } else {
      }
    }
  }, [text]);

  return (
    <Container>
      <TimeText>{time}</TimeText>
      <ChatBubble ref={textRef}>{text}</ChatBubble>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  width: 100%;
  align-items: flex-end;
  padding: 0 2rem;
  justify-content: flex-end;
`;
const ChatBubble = styled.div`
  background-color: var(--purple);
  color: white;
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
