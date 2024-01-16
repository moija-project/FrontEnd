import React from "react";
import styled from "styled-components";
import PreviewProfile from "../../components/PreviewProfile";
import PostListContainer from "./components/PostListContainer";
import ListContainer from "./components/ListContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function MyPageScreen() {
  return (
    <Container>
      <MainContainer>
        <Title>마이페이지</Title>
        <PreviewProfile hasBorder />

        <ListContainer listType="chat-list" />
        <ListContainer listType="host" />
        <ListContainer listType="join" />
        <ListContainer listType="scrap" />
        <ListContainer listType="chat-request" />
      </MainContainer>
    </Container>
  );
}

const Container = styled.div`
  background-color: var(--background-color);
`;
const MainContainer = styled.div`
  background-color: white;
  padding: 2.19rem 3.125rem;
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
  margin: auto;
  @media (max-width: 1400px) {
    width: 100%;
    padding: 1.5rem 2.2rem;
  }
`;
const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.29rem;
`;
const MoveToChatListButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--purple);
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  margin-top: 2rem;
`;
const MoveToChatListText = styled.span`
  color: white;
  font-size: 1rem;
  text-align: center;
`;
