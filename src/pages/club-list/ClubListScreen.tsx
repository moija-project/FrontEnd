import React, { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import MenuNavBar from "./components/MenuNavBar";
import PreviewPost from "../../components/PreviewPost";
import ClubListTopMenu from "./components/ClubListTopMenu";
import { getPostList } from "../../api/service-api/clubPostApi";
import axios from "axios";
import {
  CategoryType,
  SearchType,
  ViewType,
  postListParamsType,
  postListResType,
} from "../../interfaces/post-type";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { fetchPostListAtom, fetchPostListState } from "../../store/postStore";
import { useInView } from "react-intersection-observer";

export default function ClubListScreen() {
  const [postCate, setPostCate] = useState<CategoryType>("all");
  const [postView, setPostView] = useState<ViewType>("latest");
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState();
  const [searchType, setSearchType] = useState<SearchType>("title");
  const [ref, inView] = useInView({ threshold: 1 });
  const [postList, setPostList] = useState<postListResType[]>([]);
  // const postList = useRecoilValue(fetchPostListAtom({}));
  // const [list, setList] = useRecoilState(fetchPostListState);

  const getData = async (params: postListParamsType) => {
    const res = await getPostList(params);
    res && setPostList([...postList, ...res]);
  };

  useEffect(() => {
    if (inView && postList) {
      getData({
        category: postCate,
        view_type: postView,
        keyword,
        page,
        search_type: searchType,
      });
      setPage(page + 1);
    }
  }, [inView]);

  useEffect(() => {
    getData({
      category: postCate,
      view_type: postView,
      keyword,
      page,
      search_type: searchType,
    });
  }, []);

  return (
    <Container>
      <MenuNavBar setCate={(cate) => setPostCate(cate)} />
      <ContentContainer>
        <ClubListTopMenu
          setViewType={(type) => setPostView(type)}
          searchType={searchType}
          setSearchType={setSearchType}
        />
        <div>
          {postList && postList.length ? (
            postList.map((v, i) =>
              i === 0 ? (
                <PreviewPost
                  postItem={v}
                  key={`post-item-${i}`}
                  isFirst={true}
                />
              ) : (
                <PreviewPost
                  postItem={v}
                  key={`post-item-${i}`}
                  isFirst={false}
                />
              )
            )
          ) : (
            <EmptyText>해당 카테고리에 관한 글이 없습니다.</EmptyText>
          )}
          <div style={{ height: 100, width: "100%" }}></div>
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
