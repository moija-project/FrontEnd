import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ChatRequestStoreType } from "../interfaces/mypage-type";

type PreviewChatRequestProps = {
  data?: ChatRequestStoreType;
  postId?: number;
};

export default function PreviewChatRequest({
  data,
  postId,
}: PreviewChatRequestProps) {
  const navigate = useNavigate();

  const moveToReadRequestDetail = () => {
    navigate("/readRequestDetail", { state: { data } });
  };
  useEffect(() => {
    console.log("@@ ", data);
  }, [data]);
  return (
    <>
      {data?.type === "received" ? (
        <MessageItem onClick={moveToReadRequestDetail}>
          내가 쓴{" "}
          <ColoredText>
            {!data?.title
              ? ""
              : data.title.length > 8
              ? data.title.slice(0, 8) + ".."
              : data.title}
          </ColoredText>
          모임 게시물에{" "}
          <ColoredText>
            {!data?.nickname
              ? ""
              : data.nickname.length > 8
              ? data.nickname.slice(0, 8) + ".."
              : data.nickname}
          </ColoredText>
          님이 1대1 채팅 요청을 보냈어요
        </MessageItem>
      ) : (
        <MessageItem onClick={moveToReadRequestDetail}>
          <ColoredText>
            {!data?.title
              ? ""
              : data.title.length > 8
              ? data.title.slice(0, 8) + ".."
              : data.title}
          </ColoredText>{" "}
          모임 게시물 작성자가 나의 요청을 수락해주었어요!
        </MessageItem>
      )}
    </>
  );
}

const MessageItem = styled.div`
  cursor: pointer;
  border: 1px solid var(--purple);
  padding: 0.35rem 0.5rem;
  font-size: 1rem;
  width: 100%;
  line-height: 1.4rem;
`;
const ColoredText = styled.span`
  color: var(--blue);
`;
