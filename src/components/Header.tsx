import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type HeaderProps = {
  RightOption?: React.ReactNode;
};

export default function Header({ RightOption }: HeaderProps) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = debounce(() => setScreenWidth(window.innerWidth), 1000); // 1100px 기준으로!

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <Container>
        <Logo src={require("../assets/images/logo-01.png")} />
        <MenuListWrapper>
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
        </MenuListWrapper>
      </Container>
    </>
  );
}

const ToggleMenu = styled.ul`
  width: 100%;
`;
const Container = styled.div`
  overflow-x: hidden;
  width: 100%;
  padding: 0.94rem 3.75rem;
  background-color: var(--purple);
  display: flex;
  flex-direction: row;
  align-items: center;
  @media screen and (max-width: 1100px) {
    flex-direction: column;
    height: fit-content;
  }
`;

const Logo = styled.img`
  width: 100px;
  @media screen and (max-width: 1100px) {
    margin: 0 auto;
    width: 70px;
  }
`;
const MenuListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 1100px) {
    align-items: center;
    /* display: inline-block; */
  }
`;
const MenuList = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  max-width: 100%;
  @media screen and (max-width: 1100px) {
    margin: auto;
    flex-direction: column;
  }
`;

const Menu = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: white;
  font-size: 1.125rem;
  font-weight: 400;
  text-decoration: underline;
  text-underline-position: under;
  @media screen and (max-width: 1100px) {
    width: 100%;
  }
`;
