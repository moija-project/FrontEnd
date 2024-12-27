import { useEffect, useState } from 'react';
import styled from 'styled-components';
import MenuNavBar from './components/MenuNavBar';
import PreviewPost from '../../components/PreviewPost';
import ClubListTopMenu from './components/ClubListTopMenu';
import { CategoryType, SearchType, ViewType, postListResType } from '../../interfaces/post-type';

import { useInView } from 'react-intersection-observer';
import { useClubPostList } from '../../api/service-api/clubPost/useClubPostList';
import { useLocation } from 'react-router-dom';

export default function ClubListScreen() {
  const [postCate, setPostCate] = useState<CategoryType>('all');
  const [postView, setPostView] = useState<ViewType>('latest');
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState<string>('');
  const [searchType, setSearchType] = useState<SearchType>('title');
  const [ref, inView] = useInView({ threshold: 1 });
  const [postList, setPostList] = useState<(postListResType | undefined)[]>([]);

  const location = useLocation();

  const { data, refetch, fetchNextPage, hasNextPage } = useClubPostList({
    category: postCate,
    view_type: postView,
    keyword,
    page: 0,
    search_type: searchType,
  });

  const handleSearch = () => {
    setPostList([]);
    setPage(0);
  };

  useEffect(() => {
    // 카테고리 혹은 정렬 클릭 시
    refetch();
  }, [postCate, postView, keyword]);

  useEffect(() => {
    // 다른 페이지에서 이 페이지로 올때 데이터 다시 받아오기
    refetch();
  }, [location]);

  // 페이지네이션
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();

      setPage(page + 1);
    }
  }, [inView, hasNextPage]);

  useEffect(() => {
    if (data) {
      const newPosts = data.pages.flat();
      setPostList(newPosts);
    }
  }, [data]);

  return (
    <Container>
      <MenuNavBar setCate={(cate) => setPostCate(cate)} />
      <ContentContainer>
        <ClubListTopMenu
          setViewType={(type) => setPostView(type)}
          searchType={searchType}
          setSearchType={setSearchType}
          setKeyword={(word) => setKeyword(word)}
          onSearch={handleSearch}
        />
        <div>
          {postList && postList.length !== 0 ? (
            postList.map(
              (v, i) =>
                v &&
                (i === 0 ? (
                  <PreviewPost postItem={v} key={`post-item-${i}`} isFirst={true} />
                ) : (
                  <PreviewPost postItem={v} key={`post-item-${i}`} isFirst={false} />
                )),
            )
          ) : (
            <EmptyText>해당 카테고리에 관한 글이 없습니다.</EmptyText>
          )}
          <div style={{ height: 100, width: '100%' }}></div>
          <div ref={ref}></div>
        </div>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  background-color: var(--background-color);
`;
const ContentContainer = styled.div`
  min-height: 100vh;
  max-width: 800px;
  background-color: white;
  margin: auto;
  padding: 0.625rem 0.94rem;
`;
const EmptyText = styled.div`
  width: 100%;
  margin-top: 5rem;
  text-align: center;
  color: var(--gray01);
`;
