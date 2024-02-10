import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ClubDetailContent from "./components/ClubDetailContent";
import ButtonsContainer from "./components/ButtonsContainer";
import LikeScrapContainer from "./components/LikeScrapContainer";
import ClubManageContainer from "./components/ClubManageContainer";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { postDetailQuestions, postDetailState } from "../../store/postStore";
import {
  getPostDetail,
  getPostQuestion,
} from "../../api/service-api/clubPostApi";
import { postDetailResType } from "../../interfaces/post-type";

type PostCaseType = "writer" | "member" | "requiring" | "default";

export default function ClubDetailScreen() {
  const { postId } = useParams();
  const [postDetail, setPostDetail] =
    useRecoilState<postDetailResType>(postDetailState);
  const [questions, setQuestions] = useRecoilState(postDetailQuestions);
  const [postCase, setPostCase] = useState<PostCaseType>("default"); // writer, member,requiring,default
  useEffect(() => {
    const getData = async () => {
      const res = await getPostDetail({ post_id: Number(postId) });
      const questionRes = await getPostQuestion({
        user_id: "testman1",
        post_id: Number(postId),
      }); // fix

      res && setPostDetail(res);
      // setPostDetail({
      //   title: res?.title,
      //   contents: res.contents,
      //   penalty: res.penalty,
      //   likes: res.likes,
      //   views: res.views,
      //   is_changed: res.is_changed,
      //   state_recruit: res.state_recruit,
      //   leader_nickname: res.leader_nickname,
      //   latest_write: res.latest_write,
      //   reliability_recruit: res.reliability_recruit,
      //   pictures: res.pictures,
      //   myliked: res.myliked,
      //   mycliped: res.mycliped,
      //   userNickname: res.userNickname,
      //   user_id: res.user_id,
      //   born_in: res.born_in,
      //   reliability_user: res.reliability_user,
      //   profile_photo: res.profile_photo,
      //   num_condition: res.num_condition,
      //   last_write: res.last_write,
      //   first_write: res.first_write,
      //   changed: res.changed,
      //   category: res.category,
      // });
      questionRes && setQuestions(questionRes);
    };
    getData();
  }, [postId]);

  // useEffect(() => {

  // })

  return (
    <Container>
      <ContentWrapper>
        <MainContainer>
          <ClubDetailContent />
          <ButtonsContainer postId={Number(postId)} />
        </MainContainer>
        <RightContainer>
          <LikeScrapContainer postId={Number(postId)} />
          <ClubManageContainer postId={Number(postId)} />
        </RightContainer>
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.div`
  background-color: var(--background-color);
`;

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  /* align-items: center;  */
  max-width: 1400px;
  margin: auto;
  @media (max-width: 1400px) {
    flex-direction: column;
    align-items: center;
  }
`;

const MainContainer = styled.div`
  flex: 0 0 65%;
  max-width: 800px;
  min-width: 600px;
  background-color: white;
  padding: 0.625rem 35px;
  box-sizing: border-box;
  margin: auto;

  @media (max-width: 768px) {
    flex: 0 0 100%;
    margin-bottom: 20px;
    max-width: 100%;
    padding: 0.625rem 20px;
  }
`;

const RightContainer = styled.div`
  position: sticky;
  top: 10%;
  right: 80px;
  flex: 0 0 30%;
  max-width: 450px;
  box-sizing: border-box;
  height: fit-content;

  @media (max-width: 1400px) {
    /* flex: 0 0 100%; */
    /* min-width: 100%; */
    /* position: static; */
    width: 100%;
    margin-top: 40px;
    margin-bottom: 50px;
  }
`;
