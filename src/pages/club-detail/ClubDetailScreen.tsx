import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ClubDetailContent from "./components/ClubDetailContent";
import ButtonsContainer from "./components/ButtonsContainer";
import LikeScrapContainer from "./components/LikeScrapContainer";
import ClubManageContainer from "./components/ClubManageContainer";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { postDetailQuestions, postDetailState } from "../../store/postStore";
import {
  getPostDetail,
  getPostQuestion,
} from "../../api/service-api/clubPostApi";
import { postDetailResType } from "../../interfaces/post-type";
import { myUserIdState } from "../../store/userStore";

export default function ClubDetailScreen() {
  const { postId } = useParams();
  const [postDetail, setPostDetail] =
    useRecoilState<postDetailResType>(postDetailState);
  const [questions, setQuestions] = useRecoilState(postDetailQuestions);
  useEffect(() => {
    const getData = async () => {
      const res = await getPostDetail({ post_id: Number(postId) });
      const questionRes = await getPostQuestion({
        post_id: Number(postId),
      });
      console.log(res);
      res && setPostDetail(res);
      questionRes && setQuestions(questionRes);
    };
    getData();
  }, [postId]);
  useEffect(() => {
    console.log("%%% ", postDetail);
  }, [postDetail]);

  return (
    <Container>
      <ContentWrapper>
        <MainContainer>
          <ClubDetailContent postId={Number(postId)} />
          <ButtonsContainer postId={Number(postId)} />
        </MainContainer>
        <RightContainer>
          {/* <LikeScrapContainer postId={Number(postId)} /> */}
          {/* <ClubManageContainer postId={Number(postId)} /> */}
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
