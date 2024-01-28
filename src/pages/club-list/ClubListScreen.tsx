import React, { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import MenuNavBar from "./components/MenuNavBar";
import PreviewPost from "../../components/PreviewPost";
import ClubListTopMenu from "./components/ClubListTopMenu";
import { getPostList } from "../../api/service-api/clubPostApi";
import axios from "axios";
import {
  CategoryType,
  ViewType,
  postListResType,
} from "../../interfaces/post-type";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { fetchPostListAtom } from "../../store/postStore";

export default function ClubListScreen() {
  const [postList, setPostList] = useState<postListResType[]>([]);
  const [postCate, setPostCate] = useState<CategoryType>();
  const [postView, setPostView] = useState<ViewType>();
  // const postList = useRecoilValue(
  //   fetchPostListAtom({
  //     category: postCate ?? "all",
  //     view_type: postView ?? "latest",
  //   })
  // );
  useEffect(() => {
    setPostList([]);
    const getData = async () => {
      const res = await getPostList({
        category: postCate ?? "all",
        view_type: postView ?? "latest",
      });
      res && setPostList(res);
    };
    getData();
  }, [postCate, postView]);
  return (
    <Container>
      <MenuNavBar setCate={(cate) => setPostCate(cate)} />
      <ContentContainer>
        <ClubListTopMenu setViewType={(type) => setPostView(type)} />
        {postList && postList.length ? (
          postList.map((v, i) =>
            i === 0 ? (
              <PreviewPost postItem={v} key={`post-item-${i}`} isFirst={true} />
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
