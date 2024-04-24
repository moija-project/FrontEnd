import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

type ChatMenuType = "exit" | "invite" | "accuse";

const chatMenuList: { type: ChatMenuType; name: string }[] = [
  { type: "exit", name: "채팅방 나가기" },
  { type: "invite", name: "모임에 초대하기" },
  // {type : 'accuse' , name : '신고하기'},
];

export default function ChatRoomHeader() {
  const menuRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target as Node) &&
      !buttonRef.current?.contains(e.target as Node)
    ) {
      setIsMenuOpened(false);
    }
  };

  const handleMenuButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMenuOpened(!isMenuOpened);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <Container>
      <LeftWrapper>
        <PostImg src="https://i.pinimg.com/564x/d3/37/b3/d337b361e7aa9041e5564782906d6068.jpg" />
        <TitleWrapper>
          <PostTitle>게시물제목</PostTitle>
          <UserName>유저닉네임</UserName>
        </TitleWrapper>
      </LeftWrapper>
      <MenuBtn onClick={handleMenuButtonClick} ref={buttonRef}>
        <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
      </MenuBtn>
      {isMenuOpened && (
        <MenuModal ref={menuRef} id="menu-modal">
          {chatMenuList.map((menu, i) => (
            <MenuItem key={`menu-${i}-${menu.type}`}>{menu.name}</MenuItem>
          ))}
        </MenuModal>
      )}
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
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;
const PostTitle = styled.h1`
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--gray01);
  white-space: nowrap;
`;
const UserName = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
`;
const MenuBtn = styled.button``;

const MenuModal = styled.ul`
  position: absolute;
  top: 3rem;
  right: 1.5rem;
  background-color: white;
  border: 1px solid var(--purple);
  border-radius: 4px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MenuItem = styled.li`
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  &:hover {
    color: var(--purple);
  }
`;
