import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function ClubListTopMenu() {
  const navigate = useNavigate();
  const onClickPost = () => {
    navigate("/postClub");
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
        <FilterItem>최신순</FilterItem>
        <FilterItem>조회수순</FilterItem>
        <FilterItem>좋아요순</FilterItem>
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
const FilterItem = styled.li`
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--gray01);
  cursor: pointer;
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--light-gray02);
  margin: 0.75rem 0 26px;
`;
