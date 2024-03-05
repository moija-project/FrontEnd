import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommonContainer from "../../components/CommonContainer";
import styled from "styled-components";
import PreviewPost from "../../components/PreviewPost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import {
  fetchMyHostListState,
  fetchMyJoinListState,
  fetchMyScrapListState,
} from "../../store/mypageStore";
import { postListResType } from "../../interfaces/post-type";

export default function MorePostListScreen() {
  const { type } = useParams(); // host , join , scrap
  const navigate = useNavigate();
  const myHostList = useRecoilValue(fetchMyHostListState);
  const myJoinList = useRecoilValue(fetchMyJoinListState);
  const myScrapList = useRecoilValue(fetchMyScrapListState);
  const [postList, setPostList] = useState<postListResType[]>();

  useEffect(() => {
    if (type === "host") setPostList(myHostList);
    else if (type === "join") setPostList(myJoinList);
    else setPostList(myScrapList);
  }, [type]);
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
      <ListWrapper>
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
          postList.map((item, idx) =>
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
      </ListWrapper>
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
