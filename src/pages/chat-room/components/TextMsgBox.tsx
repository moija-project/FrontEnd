import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

type TextMsgBoxProps = {
  text: string;
  time: string;
  profile?: { name: string; profileImg: string }; // isMe = false 일 경우
};

/**
 *
 * @param profile : {name , profileImg}  있으면 상대방 / 없으면 본인
 *
 */
export default function TextMsgBox({ text, time, profile }: TextMsgBoxProps) {
  const [isMe, setIsMe] = useState<boolean>(true);
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

  useEffect(() => {
    if (profile && profile.name && profile.profileImg) setIsMe(false);
    else setIsMe(true);
  }, [profile]);

  return (
    <Container isMe={isMe}>
      {!profile ? (
        <>
          <TimeText>{time}</TimeText>
          <ChatBubble isMe={isMe} ref={textRef}>
            {text}
          </ChatBubble>
        </>
      ) : (
        <ChatContainer>
          <ProfileImg src={profile.profileImg} />
          <ChatWrapper>
            <ProfileName>name</ProfileName>
            <UserChatWrapper>
              <ChatBubble isMe={isMe} ref={textRef}>
                {text}
              </ChatBubble>
              <TimeText>{time}</TimeText>
            </UserChatWrapper>
          </ChatWrapper>
        </ChatContainer>
      )}
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
  margin-left: 0.9rem;
`;
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
const UserChatWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 0.5rem;
`;
