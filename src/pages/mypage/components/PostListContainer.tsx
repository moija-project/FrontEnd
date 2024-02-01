import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import PreviewPost from "../../../components/PreviewPost";
import { postListResType } from "../../../interfaces/post-type";

type PostListContainerProps = {
  postlistType: "host" | "join" | "scrap";
  data?: postListResType[];
};

export default function PostListContainer({
  postlistType,
  data,
}: PostListContainerProps) {
  let postListTypeName =
    postlistType === "host"
      ? "내가 주최한 모임"
      : postlistType === "join"
      ? "내가 참여한 모임"
      : postlistType === "scrap"
      ? "내가 스크랩한 모임"
      : "";
  return (
    <Container>
      {/* <HeaderWrapper>
        <Title>{postListTypeName}</Title>
        <MoreButton>
          <MoreButtonText>더보기</MoreButtonText>{" "}
          <FontAwesomeIcon icon={faArrowRight} />
        </MoreButton>
      </HeaderWrapper> */}

      <ListWrapper>
        {data
          ?.slice(0, 5)
          .map((item, idx) =>
            idx === 0 ? (
              <PreviewPost postItem={item} isFirst hasSidePadding={false} />
            ) : (
              <PreviewPost postItem={item} hasSidePadding={false} />
            )
          )}
        {(data?.length === 0 || !data) && (
          <NoneText>{postListTypeName}이 없어요</NoneText>
        )}
      </ListWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const ListWrapper = styled.div`
  width: 100%;
`;
const NoneText = styled.div`
  width: 100%;
  text-align: center;
  color: var(--gray01);
`;
