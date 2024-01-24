import React, { useEffect } from "react";
import CommonContainer from "../../components/CommonContainer";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import PreviewProfile from "../../components/PreviewProfile";
import ReadReplyContainer from "./components/ReadReplyContainer";

export default function ReadRequestDetailScreen() {
  const { state } = useLocation();
  return (
    <CommonContainer>
      <Title>
        [참여하고싶은사람닉네임] 님 께서
        <br />
        [내가작성한게시물제목]을 보고 <br />
        1대1 채팅을 요청했어요!
      </Title>
      <PreviewProfile hasBorder />
      <ReadReplyContainer />
      <AcceptButton>1대1 채팅 요청 수락하기</AcceptButton>
    </CommonContainer>
  );
}

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.8rem;
  margin-bottom: 2.5rem;
`;
const AcceptButton = styled.button`
  width: 100%;
  border-radius: 4px;
  background-color: var(--purple);
  color: white;
  display: flex;
  justify-content: center;
  padding: 0.85rem 0;
  margin: 10rem 0;
`;
