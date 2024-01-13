import React from "react";
import styled from "styled-components";

const menuItems = ["전체", "어학", "학업", "취업", "취미 및 소모임", "기타"];

export default function MenuNavBar() {
  return (
    <Container>
      <MenuWrapper>
        {menuItems.map((item) => (
          <MenuItem>{item}</MenuItem>
        ))}
      </MenuWrapper>
    </Container>
  );
}

const Container = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: white;
`;
const MenuWrapper = styled.ul`
  display: flex;
  gap: 30px;
  height: 100%;
  justify-content: center;
`;
const MenuItem = styled.li`
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
`;
