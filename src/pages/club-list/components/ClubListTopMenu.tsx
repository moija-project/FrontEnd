import { faCaretDown, faCaretUp, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SearchType, ViewType } from '../../../interfaces/post-type';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from '../../../store/userStore';

type ClubListTopMenuProps = {
  setViewType: (cate: ViewType) => void;
  searchType: SearchType;
  setSearchType: (type: SearchType) => void;
  setKeyword: (word: string) => void;
  onSearch: () => void;
};

const viewItems: { data: ViewType; name: string }[] = [
  { data: 'latest', name: '최신순' },
  { data: 'most_view', name: '조회수순' },
  { data: 'most_like', name: '좋아요순' },
];

const searchTypesList: { id: SearchType; name: string }[] = [
  { id: 'title', name: '제목' },
  { id: 'contents', name: '내용' },
  { id: 'leader', name: '작성자' },
  { id: 'all', name: '전체' },
];

export default function ClubListTopMenu({
  setViewType,
  searchType,
  setSearchType,
  setKeyword,
  onSearch,
}: ClubListTopMenuProps) {
  const [activeView, setActiveView] = useState<ViewType>('latest');
  const [isDropdownViewed, setIsDropdownViewed] = useState(false);
  // const
  const isLoggedin = useRecoilValue(isLoggedInState);

  const navigate = useNavigate();
  const onClickPost = () => {
    if (localStorage.getItem('accessToken')) navigate('/postClub');
    // if (isLoggedin) navigate("/postClub");
    else {
      window.alert('로그인을 먼저 해주세요');
      navigate('/login');
    }
  };
  const handleViewType = (type: ViewType) => {
    setActiveView(type);
    setViewType(type);
  };
  const handleClickSearchType = (value: SearchType) => {
    setSearchType(value);
    setIsDropdownViewed(false);
  };
  const changeToTypeName = (id: SearchType) => {
    let typename;
    searchTypesList.forEach((item) => {
      if (item.id === id) {
        typename = item.name;
      }
    });
    return typename;
  };
  return (
    <Container>
      <TopWrapper>
        <PostButton onClick={onClickPost}>글쓰기</PostButton>
        <InputWrapper>
          <SearchTypeWrapper>
            <TypeWrapper onClick={() => setIsDropdownViewed(!isDropdownViewed)}>
              <SearchTypeText>{changeToTypeName(searchType)}</SearchTypeText>
              {isDropdownViewed ? (
                <FontAwesomeIcon icon={faCaretUp} color="#8F8F8F" />
              ) : (
                <FontAwesomeIcon icon={faCaretDown} color="#8F8F8F" />
              )}
            </TypeWrapper>
            {isDropdownViewed && (
              <DropDownBox>
                {searchTypesList.map((type, i) => (
                  <DropdownType
                    key={`searchType-${type.id}-${i}`}
                    onClick={(e) => handleClickSearchType(type.id)}
                    isSelected={type.id === searchType}
                  >
                    {type.name}
                  </DropdownType>
                ))}
              </DropDownBox>
            )}
          </SearchTypeWrapper>
          <InputBox
            type="text"
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSearch();
            }}
          />
          <SearchButton onClick={onSearch}>
            <FontAwesomeIcon icon={faMagnifyingGlass} color="#8F8F8F" />
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
const SearchTypeWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;
const TypeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
  align-items: center;
  width: 3.3rem;
`;
const DropDownBox = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 0.25rem;
  width: 3.5rem;
  gap: 0.9rem;
  background-color: white;
  border: 1px solid var(--light-gray02);
  padding: 0.7rem 0.4rem;
`;
const DropdownType = styled.li<{ isSelected: boolean }>`
  color: ${({ isSelected }) => (isSelected ? 'var(--purple)' : 'var(--gray01)')};
  font-size: 0.8rem;
`;
const SearchTypeText = styled.span`
  font-size: 0.8rem;
  color: var(--gray01);
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
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 1rem;
  border: 1px solid var(--light-gray03);
  border-radius: 80px;
`;
const InputBox = styled.input`
  font-weight: 400;
  background-color: white;
  min-width: 120px;
  border: none;
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
  color: ${({ isActive }) => (isActive ? 'var(--purple)' : 'var(--gray01)')};
  cursor: pointer;
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--light-gray02);
  margin: 0.75rem 0 26px;
`;
