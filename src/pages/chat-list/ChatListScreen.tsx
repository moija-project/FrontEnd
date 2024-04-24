import React from "react";
import CommonContainer from "../../components/CommonContainer";
import ChatListItem from "./components/ChatListItem";
import styled from "styled-components";

export default function ChatListScreen() {
  return (
    <CommonContainer
      boxStyle={{ width: 500, padding: 0 }}
      containerStyle={{ position: "relative", width: "100%" }}
    >
      <Title>채팅방 리스트</Title>
      <ListContainer>
        <ChatListItem />
        <ChatListItem />
      </ListContainer>
    </CommonContainer>
  );
}

const Title = styled.h1`
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
  margin: 1.5rem 0 1rem;
`;

const ListContainer = styled.div`
  padding: 1rem;
`;
