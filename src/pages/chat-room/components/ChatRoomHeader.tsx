import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

export default function ChatRoomHeader() {
  return (
    <Container>
      <LeftWrapper>
        <PostImg src="https://i.pinimg.com/564x/d3/37/b3/d337b361e7aa9041e5564782906d6068.jpg" />
        <PostTitle>게시물제목</PostTitle>
      </LeftWrapper>
      <MenuBtn>
        <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
      </MenuBtn>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid var(--light-gray03);
  padding: 0.8rem 1.5rem;
  justify-content: space-between;
  align-items: center;
`;
const LeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.6rem;
`;
const PostImg = styled.img`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 4px;
`;
const PostTitle = styled.h1`
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--gray01);
`;
const MenuBtn = styled.button``;
