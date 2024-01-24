import React, { useEffect } from "react";
import styled from "styled-components";
import ClubDetailContent from "./components/ClubDetailContent";
import ButtonsContainer from "./components/ButtonsContainer";
import LikeScrapContainer from "./components/LikeScrapContainer";
import ClubManageContainer from "./components/ClubManageContainer";
import { useParams } from "react-router-dom";

export default function ClubDetailScreen() {
  const { postId } = useParams();
  return (
    <Container>
      <ContentWrapper>
        <MainContainer>
          <ClubDetailContent />
          <ButtonsContainer />
        </MainContainer>
        <RightContainer>
          <LikeScrapContainer />
          <ClubManageContainer />
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
