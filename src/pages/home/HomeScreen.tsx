import { useEffect, useState } from 'react';
import styled from 'styled-components';
import LoginBox from './components/LoginBox';
import ProfileBox from './components/ProfileBox';
import PreviewPost from '../../components/PreviewPost';
import { postListResType } from '../../interfaces/post-type';
import { getPostList } from '../../api/service-api/clubPostApi';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from '../../store/userStore';
import { NotifyWrapper } from './components/NotifyWrapper';

export default function HomeScreen() {
  const isLoggedin = useRecoilValue(isLoggedInState);
  const [postList, setPostList] = useState<postListResType[]>([]);

  useEffect(() => {
    setPostList([]);
    const getData = async () => {
      const res = await getPostList({
        category: 'all',
        view_type: 'latest',
      });
      res && setPostList(res);
    };
    getData();
  }, []);

  return (
    <Container>
      <LeftContainer>{isLoggedin && localStorage.getItem('accessToken') ? <ProfileBox /> : <LoginBox />}</LeftContainer>
      <MiddleContainer>
        <MiddleTitle>모임 모집</MiddleTitle>
        <MiddleInstruction>관심있는 모임에 참여해보세요</MiddleInstruction>
        <ClubListWrapper>
          {postList.length ? (
            postList
              .slice(0, 10)
              .map((v, i) =>
                i === 0 ? (
                  <PreviewPost key={`home-post-item-${i}`} postItem={v} isFirst={true} />
                ) : (
                  <PreviewPost key={`home-post-item-${i}`} postItem={v} />
                ),
              )
          ) : (
            <NoNotificationMsg>아직 등록된 게시글이 없어요</NoNotificationMsg>
          )}
        </ClubListWrapper>
      </MiddleContainer>
      <RightContainer>{isLoggedin && <NotifyWrapper />}</RightContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 20px;
  padding: 40px;
  align-items: flex-start;
  background-color: var(--background-color);
  @media screen and (max-width: 1500px) {
    flex-direction: column;
    align-items: center;
    margin: auto;
  }
`;
const LeftContainer = styled.div`
  /* padding: 0 0.94rem; */

  @media screen and (max-width: 1500px) {
    max-width: 100%;
  }
`;
const MiddleContainer = styled.div`
  /* padding: 0 0.94rem; */
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
  @media screen and (max-width: 1500px) {
    max-width: 800px;
    width: 100%;
    /* min-width: 100%; */
  }
`;
const ClubListWrapper = styled.div`
  margin: 25px auto 0;
  max-width: 100%;
`;
const RightContainer = styled.div`
  width: 300px;
  max-height: 530px;
  overflow-y: scroll;
  height: fit-content;
  position: sticky;
  right: 0;
  top: 40px;
  background-color: white;
  @media screen and (max-width: 1500px) {
    display: none;
  }
`;
const MiddleTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
`;
const MiddleInstruction = styled.h4`
  font-size: 0.75rem;
  color: var(--gray01);
  margin-top: 4px;
`;
const NoNotificationMsg = styled.span`
  text-align: center;
  font-size: 0.875rem;
  color: var(--gray01);
`;
