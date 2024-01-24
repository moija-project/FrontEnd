import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MenuNavBar from "./components/MenuNavBar";
import PreviewPost from "../../components/PreviewPost";
import ClubListTopMenu from "./components/ClubListTopMenu";
import { getPostList } from "../../api/service-api/clubPostApi";
import axios from "axios";
import { postListResType } from "../../interfaces/post-type";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { fetchPostListAtom } from "../../store/postStore";

export default function ClubListScreen() {
  // const [postList, setPostList] = useState<postListResType[]>([]);
  const postList = useRecoilValue(
    fetchPostListAtom({ category: "all", view_type: "latest" })
  );
  useEffect(() => {
    // console.log("### ::: ", contents);
    // const getData = async () => {
    //   const res = await getPostList({ category: "all", view_type: "latest" });
    //   res && setPostList(res);
    // };
    // getData();
  }, []);
  return (
    <Container>
      <MenuNavBar />
      <ContentContainer>
        <ClubListTopMenu />
        {postList?.map((v, i) =>
          i === 0 ? (
            <PreviewPost postItem={v} key={`post-item-${i}`} isFirst={true} />
          ) : (
            <PreviewPost postItem={v} key={`post-item-${i}`} isFirst={false} />
          )
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
