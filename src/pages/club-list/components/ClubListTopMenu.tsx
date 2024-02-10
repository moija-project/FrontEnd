import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ViewType } from "../../../interfaces/post-type";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../../../store/userStore";

type ClubListTopMenuProps = {
  setViewType: (cate: ViewType) => void;
};

const viewItems: { data: ViewType; name: string }[] = [
  { data: "latest", name: "최신순" },
  { data: "most_view", name: "조회수순" },
  { data: "most_like", name: "좋아요순" },
];

export default function ClubListTopMenu({ setViewType }: ClubListTopMenuProps) {
  const [activeView, setActiveView] = useState<ViewType>("latest");
  const isLoggedin = useRecoilValue(isLoggedInState);

  const navigate = useNavigate();
  const onClickPost = () => {
    if (isLoggedin) navigate("/postClub");
    else {
      window.alert("로그인을 먼저 해주세요");
      navigate("/login");
    }
  };
  const handleViewType = (type: ViewType) => {
    setActiveView(type);
    setViewType(type);
  };
  return (
    <Container>
      <TopWrapper>
        <PostButton onClick={onClickPost}>글쓰기</PostButton>
        <InputWrapper>
          <InputBox></InputBox>
          <SearchButton>
            <FontAwesomeIcon
              style={{ position: "absolute", top: 8, right: 12 }}
              icon={faMagnifyingGlass}
              //   size="2xs"
              color="#8F8F8F"
            />
          </SearchButton>
        </InputWrapper>
      </TopWrapper>
      <FilterWrapper>
        {viewItems?.map((value) => (
          <FilterItem
            key={`view-menu-${value.data}`}
            onClick={() => handleViewType(value.data)}
            isActive={activeView === value.data}
          >
            {value.name}
          </FilterItem>
        ))}
      </FilterWrapper>
      <Line />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;
const TopWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 25px 0 40px;
`;
const PostButton = styled.button`
  padding: 0.625rem 35px;
  color: white;
  text-align: center;
  border-radius: 4px;
  background-color: var(--purple);
`;
const InputWrapper = styled.div`
  min-width: 120px;
  position: relative;
`;
const InputBox = styled.input`
  font-weight: 400;
  background-color: white;
  /* width: 250px; */
  min-width: 120px;
  padding: 8px 30px 8px 0.625rem;
  border: 1px solid var(--light-gray03);
  border-radius: 80px;
`;
const SearchButton = styled.button``;
const FilterWrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 0.94rem;
  padding: 0 20px;
`;
const FilterItem = styled.li<{ isActive: boolean }>`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${({ isActive }) => (isActive ? "var(--purple)" : "var(--gray01)")};
  cursor: pointer;
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--light-gray02);
  margin: 0.75rem 0 26px;
`;
