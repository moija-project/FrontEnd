import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostListContainer from './PostListContainer';
import ChatRequestListContainer from './ChatRequestListContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { postListIWrote, postMyJoinedClub, postScrapList } from '../../../api/service-api/mypageApi';
import { postListResType } from '../../../interfaces/post-type';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { fetchMyHostListState, fetchMyJoinListState, fetchMyScrapListState } from '../../../store/mypageStore';

type ListContainerProps = {
  listType: 'host' | 'join' | 'scrap' | 'chat-request' | 'chat-list';
};

export default function ListContainer({ listType }: ListContainerProps) {
  const navigate = useNavigate();
  const [scrapList, setScrapList] = useRecoilState(fetchMyScrapListState);
  const [hostList, setHostList] = useRecoilState(fetchMyHostListState);
  const [joinList, setJoinList] = useRecoilState(fetchMyJoinListState);
  let postListTypeName =
    listType === 'host'
      ? '내가 주최한 모임'
      : listType === 'join'
        ? '내가 참여한 모임'
        : listType === 'scrap'
          ? '내가 스크랩한 모임'
          : listType === 'chat-request'
            ? '1대1 채팅 요청'
            : listType === 'chat-list'
              ? '1대1 채팅 목록'
              : '';
  // const [postList, setPostList] = useState<postListResType[] | undefined>(); // 내가 주최한 모임

  const moveToMoreList = () => {
    if (listType === 'host' || listType === 'scrap' || listType === 'join') navigate(`/mypage-morePost/${listType}`);
  };

  const moveToMypage = () => {
    if (localStorage.getItem('accessToken')) navigate('/chatList');
    else {
      window.alert('로그인을 다시해주세요');
      navigate('/login');
    }
  };

  useEffect(() => {
    const getData = async () => {
      if (listType === 'host') {
        let res = await postListIWrote(0);
        res && setHostList(res);
      } else if (listType === 'scrap') {
        let res = await postScrapList();
        res && setScrapList(res);
      } else if (listType === 'join') {
        // join
        let res = await postMyJoinedClub(0);
        res && setJoinList(res);
      }
    };
    getData();
  }, []);
  return (
    <Container>
      <HeaderWrapper>
        <Title>{postListTypeName}</Title>
        {listType !== 'chat-list' && (
          <MoreButton onClick={moveToMoreList}>
            <MoreButtonText>더보기</MoreButtonText> <FontAwesomeIcon icon={faArrowRight} />
          </MoreButton>
        )}
      </HeaderWrapper>

      {(listType === 'host' || listType === 'join' || listType === 'scrap') && (
        <PostListContainer
          data={listType === 'host' ? hostList : listType === 'scrap' ? scrapList : joinList}
          postlistType={listType}
        />
      )}
      {listType === 'chat-request' && <ChatRequestListContainer />}

      {listType === 'chat-list' && (
        <MoveToChatListButton>
          <MoveToChatListText onClick={moveToMypage}>채팅 목록 보기</MoveToChatListText>
          <FontAwesomeIcon icon={faArrowRight} color="#FFFFFF" />
        </MoveToChatListButton>
      )}
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  border: 1px solid var(--purple);
  border-radius: 4px;
  margin-top: 3.125rem;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
`;
const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
`;
const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
`;
const MoreButton = styled.button``;
const MoreButtonText = styled.span`
  font-size: 0.825rem;
  margin-right: 0.35rem;
`;

const MoveToChatListButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--purple);
  border-radius: 1rem;
  padding: 0.5rem 1rem;
`;
const MoveToChatListText = styled.span`
  color: white;
  font-size: 1rem;
  text-align: center;
`;
