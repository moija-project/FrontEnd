import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { postMyProfile } from '../api/service-api/profileApi';

type HeaderProps = {
  RightOption?: React.ReactNode;
};

export default function Header({ RightOption }: HeaderProps) {
  let path = window.location.pathname;

  const [openToggleBar, setOpenToggleBar] = useState(false);
  const navigate = useNavigate();
  const moveToHome = () => navigate('/');

  return (
    <>
      <Container>
        <LogoWrapper>
          <ToggleBarButton onClick={() => setOpenToggleBar(!openToggleBar)}>
            <FontAwesomeIcon icon={faBars} size="xl" color="#ffffff" />
          </ToggleBarButton>
          <Logo onClick={moveToHome} src={require('../assets/images/logo-01.png')} />
          <RightToggleBarButton>{RightOption}</RightToggleBarButton>
        </LogoWrapper>
        <MenuListWrapper isOpen={openToggleBar}>
          <MenuList isOpen={openToggleBar}>
            <Link to={'/'}>
              <Menu isActive={path === '/'}>홈</Menu>
            </Link>
            <Link to={'/clubList'}>
              <Menu isActive={path === '/clubList'}>모임</Menu>
            </Link>
            <Link to={localStorage.getItem('accessToken') ? '/mypage' : '/login'}>
              {/* <Link to={"/mypage"}> */}
              <Menu isActive={path === '/mypage'}>마이페이지</Menu>
            </Link>
          </MenuList>
        </MenuListWrapper>
      </Container>
    </>
  );
}

const ToggleBarButton = styled.button`
  display: none;
  @media screen and (max-width: 1100px) {
    display: flex;
    flex: 1;
  }
`;
const RightToggleBarButton = styled.button`
  display: none;
  @media screen and (max-width: 1100px) {
    flex: 1;
    display: flex;
    justify-content: end;
  }
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
    padding-bottom: 0;
  }
`;
const LogoWrapper = styled.div`
  background-color: var(--purple);
  height: 100%;
  @media screen and (max-width: 1100px) {
    width: 100vw;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
    padding: 0 0.6rem;
  }
`;
const Logo = styled.img`
  cursor: pointer;
  width: 100px;
  @media screen and (max-width: 1100px) {
    width: 70px;
  }
`;
const MenuListWrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 1100px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    align-items: center;
    background-color: var(--light-purple01);
    width: 100vw;
    padding: 0.4rem 0;
  }
`;
const MenuList = styled.div<{ isOpen: boolean }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  max-width: 100%;
  @media screen and (max-width: 1100px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    margin: auto;
    flex-direction: column;
    position: static;
    transform: none;
    width: 100vw;
  }
`;

const Menu = styled.button<{ isActive: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: ${({ isActive }) => (isActive ? 'var(--yellow)' : 'white')};
  font-size: 1.125rem;
  font-weight: 400;
  ${({ isActive }) => isActive && 'text-decoration: underline;'}
  ${({ isActive }) => isActive && 'text-underline-position: under;'}

  @media screen and (max-width: 1100px) {
    font-size: 1rem;
    color: black;
    width: 100%;
    padding: 0.2rem;
  }
`;
