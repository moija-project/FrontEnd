import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faL, faStar } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styled from "styled-components";

type PreviewPostProps = {
  isFirst?: boolean;
  hasSidePadding?: boolean;
};

export default function PreviewPost({
  isFirst = false,
  hasSidePadding = true,
}: PreviewPostProps) {
  return (
    <Container isFirst={isFirst} sidePadding={hasSidePadding}>
      <TopWrapper>
        <RecruitStatus isRecruiting>모집중</RecruitStatus>
        <Title>
          게시물제목제목제목게시물제목제목제목게시물제목제목제목게시물제목제목제목게시물제목제목제목게시물제목제목제목
        </Title>
      </TopWrapper>
      <MiddleWrapper>
        <Content>
          내용입니다다다다다다다다내용입니다다다다다다다다내용입니다다다다다다다다내용입니다다다다다다다다내용입니다다다다다다다다내용입니다다다다다다다다
        </Content>
      </MiddleWrapper>
      <BottomWrapper>
        <BottomLeft>작성자 · 2024년 01월 01일</BottomLeft>
        <BottomRight>
          <IconWrapper>
            <FontAwesomeIcon icon={faEye} color="#D9D9D9" />
            <IconNumber>1</IconNumber>
          </IconWrapper>
          <IconWrapper>
            <FontAwesomeIcon icon={faHeart} color="#D9D9D9" />
            <IconNumber>1</IconNumber>
          </IconWrapper>
          <IconWrapper>
            <FontAwesomeIcon icon={faStar} color="#D9D9D9" />
            <IconNumber>1</IconNumber>
          </IconWrapper>
        </BottomRight>
      </BottomWrapper>
    </Container>
  );
}

const Container = styled.div<{ isFirst: boolean; sidePadding?: boolean }>`
  ${({ isFirst }) => !isFirst && "border-top: 1px solid var(--light-gray02);"}
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background-color: white;
  padding: 1.25rem ${({ sidePadding }) => (sidePadding ? "1.25rem" : "0")};
  /* width: 100%; */
  max-width: 100%;
  /* @media (max-width: 1180px) {
    padding: 0.625rem;
    width: 80%;
  } */
`;
const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const MiddleWrapper = styled.div`
  margin-top: 0.5rem;
  max-width: 100%;
`;
const Content = styled.div`
  overflow: hidden;
  font-size: 0.94rem;
  font-weight: 600;
  color: var(--gray01);
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
`;
const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;
const BottomLeft = styled.span`
  font-size: 0.875rem;
  color: var(--gray01);
`;
const BottomRight = styled.div`
  display: flex;
  gap: 4px;
`;
const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 0.5rem;
`;
const IconNumber = styled.span`
  font-size: 0.75rem;
  color: var(--gray01);
  margin-left: 0.25rem;
`;

const RecruitStatus = styled.span<{ isRecruiting: boolean }>`
  font-size: 0.625rem;
  padding: 0.375rem 0.5625rem;
  text-align: center;
  min-width: 55px;
  border-radius: 0.94rem;
  background-color: ${({ isRecruiting }) =>
    isRecruiting ? "var(--purple)" : "var(--gray01)"};
  color: white;
  margin-right: 0.625rem;
`;
const Title = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
