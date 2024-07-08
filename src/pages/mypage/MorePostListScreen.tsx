import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommonContainer from "../../components/CommonContainer";
import styled from "styled-components";
import PreviewPost from "../../components/PreviewPost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { fetchMyScrapListState } from "../../store/mypageStore";
import { postListResType } from "../../interfaces/post-type";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  postListIWrote,
  postMyJoinedClub,
} from "../../api/service-api/mypageApi";

export default function MorePostListScreen() {
  const { type } = useParams(); // host , join , scrap
  const navigate = useNavigate();
  const [pageNum, setPageNum] = useState(0);
  const myScrapList = useRecoilValue(fetchMyScrapListState);
  const [postList, setPostList] = useState<postListResType[]>();

  const fetchHostData = async () => {
    const res = await postListIWrote(pageNum);
    res && setPostList((prev) => (prev ? [...prev, ...res] : res));
  };
  const fetchJoinData = async () => {
    const res = await postMyJoinedClub(pageNum);
    res && setPostList((prev) => (prev ? [...prev, ...res] : res));
  };

  useEffect(() => {
    // if (type === "host") setPostList(myHostList);
    // else if (type === "join") setPostList(myJoinList);
    if (type === "host") fetchHostData();
    else if (type === "join") fetchJoinData();
    else setPostList(myScrapList);
  }, [type]);

  useEffect(() => {
    if (pageNum === 0) return;
    if (type === "host") fetchHostData();
    else if (type === "join") fetchJoinData();
  }, [pageNum]);
  return (
    <CommonContainer>
      <TitleWrapper>
        <BackButton onClick={() => navigate("/mypage")}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </BackButton>
        <Title>
          {type === "host"
            ? "내가 주최한 모임"
            : type === "join"
            ? "내가 참여한 모임"
            : type === "scrap"
            ? "내가 스크랩한 모임"
            : ""}
        </Title>
      </TitleWrapper>
      {/* <ListWrapper> */}
      <InfiniteScroll
        dataLength={postList?.length ?? 0}
        next={() => setPageNum(pageNum + 1)}
        hasMore={true}
        loader={<></>}
      >
        {postList?.length === 0 || !postList ? (
          <NoneText>
            {type === "host"
              ? "내가 주최한 모임"
              : type === "join"
              ? "내가 참여한 모임"
              : type === "scrap"
              ? "내가 스크랩한 모임"
              : ""}
            이 없어요
          </NoneText>
        ) : (
          postList?.map((item, idx) =>
            idx === 0 ? (
              <PreviewPost
                key={`preview-post-${idx}`}
                postItem={item}
                isFirst
                hasSidePadding={false}
              />
            ) : (
              <PreviewPost
                key={`preview-post-${idx}`}
                postItem={item}
                hasSidePadding={false}
              />
            )
          )
        )}
      </InfiniteScroll>
      {/* </ListWrapper> */}
    </CommonContainer>
  );
}
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;
const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
`;
const BackButton = styled.button``;
const ListWrapper = styled.div`
  width: 100%;
  margin: 3rem 0;
`;
const NoneText = styled.div`
  width: 100%;
  text-align: center;
  color: var(--gray01);
`;
