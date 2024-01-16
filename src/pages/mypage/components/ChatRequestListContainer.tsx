import React from "react";
import styled from "styled-components";
import PreviewChatRequest from "../../../components/PreviewChatRequest";

export default function ChatRequestListContainer() {
  return (
    <Container>
      <RequestContainer>
        <Title>받은 요청</Title>
        <MessageList>
          <PreviewChatRequest />
        </MessageList>
      </RequestContainer>
      <Line />
      <RequestContainer>
        <Title>보낸 요청</Title>
        <MessageList>
          {[1, 1, 1].map((item, idx) => (
            <PreviewChatRequest />
          ))}
        </MessageList>
      </RequestContainer>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.9rem;
`;

const Line = styled.div`
  height: 100%;
  width: 1px;
  background-color: var(--light-gray03);
`;
const RequestContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const Title = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;
const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const MessageItem = styled.div`
  cursor: pointer;
  border: 1px solid var(--purple);
  padding: 0.35rem 0.5rem;
  font-size: 1rem;
  width: 100%;
`;
