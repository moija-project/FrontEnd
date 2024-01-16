import React from "react";
import styled from "styled-components";
import PreviewProfile from "../../components/PreviewProfile";
import PostListContainer from "./components/PostListContainer";
import ListContainer from "./components/ListContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CommonContainer from "../../components/CommonContainer";

export default function MyPageScreen() {
  return (
    <CommonContainer>
      <Title>마이페이지</Title>
      <PreviewProfile hasBorder />

      <ListContainer listType="chat-list" />
      <ListContainer listType="host" />
      <ListContainer listType="join" />
      <ListContainer listType="scrap" />
      <ListContainer listType="chat-request" />
    </CommonContainer>
  );
}

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.29rem;
`;
