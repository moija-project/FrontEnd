import React, { useState } from "react";
import styled from "styled-components";
import { CategoryType } from "../../../interfaces/post-type";

type MenuNavBarProps = {
  setCate: (cate: CategoryType) => void;
};

// const menuItems = ["전체", "어학", "학업", "취업", "취미 및 소모임", "기타"];
const menuItems: { data: CategoryType; name: string }[] = [
  { data: "all", name: "전체" },
  { data: "language", name: "어학" },
  { data: "hobby", name: "취미 및 소모임" },
  { data: "study", name: "학업" },
  { data: "employ", name: "취업" },
  { data: "etc", name: "기타" },
];

export default function MenuNavBar({ setCate }: MenuNavBarProps) {
  const [activeCate, setActiveCate] = useState<CategoryType>("all");

  const handleCate = (cate: CategoryType) => {
    setActiveCate(cate);
    setCate(cate);
  };
  return (
    <Container>
      <MenuWrapper>
        {menuItems.map((item) => (
          <MenuItem
            onClick={() => handleCate(item.data)}
            isSelected={activeCate === item.data}
            key={`cate-${item.data}`}
          >
            {item.name}
          </MenuItem>
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
  z-index: 10;
`;
const MenuWrapper = styled.ul`
  display: flex;
  gap: 30px;
  height: 100%;
  justify-content: center;
`;
const MenuItem = styled.li<{ isSelected: boolean }>`
  cursor: pointer;
  font-size: 1.125rem;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  color: ${({ isSelected }) => (isSelected ? "var(--purple) " : "black")};
`;
