import React from "react";
import styled from "styled-components";
import MenuNavBar from "./components/MenuNavBar";
import PreviewPost from "../../components/PreviewPost";
import ClubListTopMenu from "./components/ClubListTopMenu";

export default function ClubListScreen() {
  return (
    <Container>
      <MenuNavBar />
      <ContentContainer>
        <ClubListTopMenu />
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((v, i) =>
          i === 0 ? <PreviewPost isFirst={true} /> : <PreviewPost />
        )}
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  background-color: var(--background-color);
`;
const ContentContainer = styled.div`
  max-width: 800px;
  background-color: white;
  margin: auto;
  padding: 10px 15px;
`;
