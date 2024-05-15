import React, { useEffect } from "react";
import CommonContainer from "../../components/CommonContainer";
import ChatListItem from "./components/ChatListItem";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { chatListState } from "../../store/chatStore";
import { useFetchChatList } from "../../api/service-api/chat/useFetchChatList";

export default function ChatListScreen() {
  const { data, isLoading } = useFetchChatList();
  useEffect(() => {
    console.log("채팅 목록 데이터", data);
  }, [data]);
  return (
    <CommonContainer
      boxStyle={{ width: 500, padding: 0 }}
      containerStyle={{ position: "relative", width: "100%" }}
    >
      <Title>채팅방 리스트</Title>
      <ListContainer>
        {data &&
          data.map(
            (item, i) =>
              item.chatRoom.chatRoomId && (
                <ChatListItem chatInfo={item} key={`chat-list-item-${i}`} />
              )
          )}
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
