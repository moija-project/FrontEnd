import React from "react";
import styled from "styled-components";

type NotificationBoxProps = {
  isFirst?: boolean;
};

export default function NotificationBox({
  isFirst = false,
}: NotificationBoxProps) {
  return (
    <Container isFirst={isFirst}>
      <IconImage src={require("../../../assets/images/icon-invite.png")} />
      <MessageWrapper>
        <MessageTitle>내 모임에 지원자가 생겼어요!</MessageTitle>
        <MessageContent>
          내 모임에 지원자가 생겼어요!내 모임에 지원자가 생겼어요!내 모임에
          지원자가 생겼어요!내 모임에 지원자가 생겼어요!내 모임에 지원자가
          생겼어요!
        </MessageContent>
      </MessageWrapper>
    </Container>
  );
}

const Container = styled.div<{ isFirst: boolean }>`
  padding-top: 0.94rem;
  ${({ isFirst }) => !isFirst && "border-top: 1px solid var(--light-gray02);"}
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: flex-start;
  background-color: white;
  margin-bottom: 0.94rem;
`;
const IconImage = styled.img`
  width: 45px;
  height: 45px;
  /* border-radius: 100%; */
  margin-right: 8px;
`;
const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const MessageTitle = styled.h2`
  font-size: 0.875rem;
  margin-bottom: 4px;
`;
const MessageContent = styled.span`
  width: 100%;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2; // 원하는 라인수
  -webkit-box-orient: vertical;
  font-size: 0.875rem;
  color: var(--gray01);
`;
