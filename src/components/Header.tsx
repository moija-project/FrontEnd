import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  return (
    <Container>
      <Logo src={require("../assets/images/logo-01.png")} />
      <MenuList>
        <Link to={"/"}>
          <Menu>홈</Menu>
        </Link>
        <Link to={"/clubList"}>
          <Menu>모임</Menu>
        </Link>
        <Link to={"/mypage"}>
          <Menu>마이페이지</Menu>
        </Link>
      </MenuList>
    </Container>
  );
}

const Container = styled.div`
  overflow-x: hidden;
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
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  max-width: 100%;
`;

const Menu = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-weight: 400;
  text-decoration: underline;
  text-underline-position: under;
`;
