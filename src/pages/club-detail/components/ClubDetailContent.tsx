import React from "react";
import styled from "styled-components";
import Carousel from "./Carousel";
import PreviewProfile from "../../../components/PreviewProfile";

export default function ClubDetailContent() {
  return (
    <Container>
      <Carousel />
      <PreviewProfile />
      <Line />
      <PostHeader>
        <LeftWrapper>
          <PostTitle>게시물제목</PostTitle>
          <DateWrapper>
            <Date style={{ marginBottom: 4 }}>
              작성일자 2024.01.01 00:00:00
            </Date>
            <Date>수정일자 2024.01.01 00:00:00</Date>
          </DateWrapper>
        </LeftWrapper>
        <RightWrapper>
          <State>모집중</State>
          <CheckText>가입 조건 있음 · 보증금 있음</CheckText>
        </RightWrapper>
      </PostHeader>
      <Content>
        게시물 내용입니다 게시물 내용입니다 게시물 내용입니다 게시물 내용입니다
        게시물 내용입니다 게시물 내용입니다 게시물 내용입니다 게시물 내용입니다
        게시물 내용입니다 게시물 내용입니다 게시물 내용입니다 게시물 내용입니다
        게시물 내용입니다 게시물 내용입니다 게시물 내용입니다 게시물 내용입니다
        게시물 내용입니다 게시물 내용입니다 게시물 내용입니다 게시물 내용입니다
        게시물 내용입니다 게시물 내용입니다 게시물 내용입니다 게시물 내용입니다
        게시물 내용입니다 게시물 내용입니다 게시물 내용입니다 게시물 내용입니다
        게시물 내용입니다 게시물 내용입니다 게시물 내용입니다 게시물 내용입니다
        게시물 내용입니다 게시물 내용입니다 게시물 내용입니다 게시물 내용입니다
        게시물 내용입니다 게시물 내용입니다 게시물 내용입니다 게시물 내용입니다
        게시물 내용입니다 게시물 내용입니다 게시물 내용입니다 게시물 내용입니다
        게시물 내용입니다 게시물 내용입니다 게시물 내용입니다 게시물 내용입니다
        게시물 내용입니다 게시물 내용입니다
      </Content>
      <Hits>조회수 10</Hits>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 0.625rem;
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  margin: 30px 0;
  background-color: var(--light-gray03);
`;
const PostHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const PostTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
`;
const DateWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
`;
const Date = styled.span`
  font-size: 0.95rem;
  color: var(--gray01);
`;
const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;
const State = styled.div`
  padding: 5px 0.625rem;
  background-color: var(--purple);
  border-radius: 0.94rem;
  color: white;
  font-size: 0.75rem;
  max-width: fit-content;
  margin-bottom: 8px;
`;
const CheckText = styled.span`
  color: var(--purple);
  font-size: 0.8rem;
`;
const Content = styled.div`
  font-size: 1.125rem;
  margin: 45px 0 25px;
  line-height: 25px;
`;
const Hits = styled.span`
  color: var(--gray01);
  font-size: 1.125rem;
  margin: 0.94rem 0;
`;
