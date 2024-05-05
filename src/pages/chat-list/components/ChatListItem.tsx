import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const imgUrl =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq4iPRF0B7snYyA5v9Rn76ptVODPWbnb0Tt0dK6n523A&s";
const chatRoomId = 1; // 임시

type ChatListItemProps = {
  chatName: string;
  postId: number;
};

export default function ChatListItem({ chatName, postId }: ChatListItemProps) {
  const navigate = useNavigate();

  const moveToChatRoom = () => {
    navigate(`/chatRoom/${chatRoomId}`);
  };
  return (
    <Container onClick={moveToChatRoom}>
      <Image src={imgUrl} />
      <RightWrapper>
        <TextWrapper>
          <Title>{chatName}</Title>
          <LastMessage>마지막 채팅 메시지</LastMessage>
        </TextWrapper>
        <TimeWrapper>
          <TimeText>1시간 전</TimeText>
          <NewCnt>4</NewCnt>
        </TimeWrapper>
      </RightWrapper>
    </Container>
  );
}

const Container = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.6rem;
  gap: 0.6rem;
  border-radius: 6px;

  &:hover {
    background-color: var(--light-gray01);
  }
`;

const Image = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 6px;
`;

const RightWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 500;
`;
const LastMessage = styled.span`
  font-size: 0.875rem;
  color: var(--gray01);
`;
const TimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: flex-end;
`;
const TimeText = styled.span`
  font-size: 0.6rem;
  color: var(--purple);
`;
const NewCnt = styled.span`
  line-height: 1rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: white;
  width: fit-content;
  background-color: var(--red);
  padding: 0.3rem 0.6rem;
  border-radius: 1rem;
`;
