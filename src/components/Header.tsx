import React from "react";
import styled from "styled-components";

export default function Header() {
  return (
    <Container>
      <Logo src={require("../assets/images/logo-01.png")} />
      <MenuList>
        <Menu>홈</Menu>
        <Menu>모임</Menu>
        <Menu>마이페이지</Menu>
      </MenuList>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 70px;
  padding: 10px 60px;
  background-color: var(--purple);
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Logo = styled.img`
  width: 100px;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;
const Menu = styled.button`
  color: white;
  font-size: 16px;
  font-weight: 400;
  text-decoration: underline;
  text-underline-position: under;
`;
