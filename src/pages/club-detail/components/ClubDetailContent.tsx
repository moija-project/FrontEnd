import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Carousel from "./Carousel";
import PreviewProfile from "../../../components/PreviewProfile";
import { getPostDetail } from "../../../api/service-api/clubPostApi";
import { postDetailResType } from "../../../interfaces/post-type";
import { changeDateExprssion } from "../../../utils/datetime";
import { useRecoilValue } from "recoil";
import { postDetailState } from "../../../store/postStore";
import { myProfileInfoState } from "../../../store/userStore";

export default function ClubDetailContent() {
  const postDetail = useRecoilValue(postDetailState);
  const myProfile = useRecoilValue(myProfileInfoState);
  let writer;

  // const [postDetail, setPostDetail] = useState<postDetailResType>();
  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await getPostDetail({ post_id: postId });
  //     setPostDetail(data);
  //   };
  //   getData();
  // }, []);

  // 작성자가 본인이면 PreviewProfile 은 본인
  useEffect(() => {
    if (postDetail.user_id === "testman1") {
      //fix
    }
  }, []);

  return (
    <Container>
      <Carousel />
      {/* <PreviewProfile /> */}
      {/* fix : 본인이면 본인 프로필로 , 아니면 남의 프로필로 */}
      {postDetail.user_id === "testman1" ? (
        <PreviewProfile profileData={myProfile} />
      ) : (
        <PreviewProfile />
      )}
      <Line />
      <PostHeader>
        <LeftWrapper>
          <PostTitle>{postDetail?.title}</PostTitle>
          <DateWrapper>
            <Date style={{ marginBottom: 4 }}>
              작성일자{" "}
              {postDetail && changeDateExprssion(postDetail?.latest_write)}
            </Date>
            {postDetail?.is_changed && (
              <Date>수정일자 2024.01.01 00:00:00 (수정됨)</Date>
            )}
          </DateWrapper>
        </LeftWrapper>
        <RightWrapper>
          <State isRecruiting={postDetail?.state_recruit ?? false}>
            {postDetail?.state_recruit ? "모집중" : "모집종료"}
          </State>
          <CheckText>가입 조건 있음</CheckText>
        </RightWrapper>
      </PostHeader>
      <Content>{postDetail?.contents}</Content>
      <Hits>조회수 {postDetail?.views}</Hits>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 0.625rem;
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  margin: 30px 0;
  background-color: var(--light-gray03);
`;
const PostHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const PostTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
`;
const DateWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
`;
const Date = styled.span`
  font-size: 0.95rem;
  color: var(--gray01);
`;
const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;
const State = styled.div<{ isRecruiting: boolean }>`
  padding: 5px 0.625rem;
  background-color: ${({ isRecruiting }) =>
    isRecruiting ? "var(--purple)" : "var(--gray01)"};
  border-radius: 0.94rem;
  color: white;
  font-size: 0.75rem;
  max-width: fit-content;
  margin-bottom: 8px;
`;
const CheckText = styled.span`
  color: var(--purple);
  font-size: 0.8rem;
`;
const Content = styled.div`
  font-size: 1.125rem;
  margin: 45px 0 25px;
  line-height: 25px;
`;
const Hits = styled.span`
  color: var(--gray01);
  font-size: 1.125rem;
  margin: 0.94rem 0;
`;
