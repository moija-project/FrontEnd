import { useEffect, useRef } from "react";
import styled from "styled-components";

type TextMsgBoxProps = {
  text: string;
  time: string;
  name: string;
  profileImg: string;
};

/**
 * 상대방의 텍스트
 * @param profile : {name , profileImg}  있으면 상대방 / 없으면 본인
 *
 */
export default function TextMsgBox({
  text,
  time,
  name,
  profileImg,
}: TextMsgBoxProps) {
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
    <Container>
      <ChatContainer>
        {/* <ProfileImg src={profileImg} /> */}
        <ChatWrapper>
          <ProfileName>{name}</ProfileName>
          <UserChatWrapper>
            <ChatBubble ref={textRef}>{text}</ChatBubble>
            <TimeText>{time}</TimeText>
          </UserChatWrapper>
        </ChatWrapper>
      </ChatContainer>
    </Container>
  );
}
const ChatContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
  align-items: flex-start;
`;
const ProfileImg = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 100%;
`;
const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;
const ProfileName = styled.span`
  margin-left: 0.4rem;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  width: 100%;
  align-items: flex-end;
  padding: 0 2rem;
`;
const ChatBubble = styled.div`
  background-color: #ececec;
  color: #000000;
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
const UserChatWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 0.5rem;
`;
