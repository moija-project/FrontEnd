import React from "react";
import styled from "styled-components";
import LoginBox from "./components/LoginBox";
import ProfileBox from "./components/ProfileBox";
import PreviewPost from "../../components/PreviewPost";
import NotificationBox from "./components/NotificationBox";

export default function HomeScreen() {
  return (
    <Container>
      <LeftContainer>
        {/* <LoginBox /> */}
        <ProfileBox />
      </LeftContainer>
      <MiddleContainer>
        <MiddleTitle>모임 모집</MiddleTitle>
        <MiddleInstruction>관심있는 모임에 참여해보세요</MiddleInstruction>
        <ClubListWrapper>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((v, i) =>
            i === 0 ? <PreviewPost isFirst={true} /> : <PreviewPost />
          )}
        </ClubListWrapper>
      </MiddleContainer>
      <RightContainer>
        <RightTitle>알림</RightTitle>
        {/* <NoNotificationMsg>알림이 없어요</NoNotificationMsg> */}
        <div style={{ marginTop: 25 }}>
          {[1, 2, 3, 4, 1, 1, 1].map((v, i) =>
            i === 0 ? <NotificationBox isFirst={true} /> : <NotificationBox />
          )}
        </div>
      </RightContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 20px;
  padding: 40px;
  background-color: var(--background-color);
  @media screen and (max-width: 1500px) {
    flex-direction: column;
    align-items: center;
    margin: auto;
  }
`;
const LeftContainer = styled.div`
  /* padding: 0 0.94rem; */

  @media screen and (max-width: 1500px) {
    display: none;
  }
`;
const MiddleContainer = styled.div`
  /* padding: 0 0.94rem; */
  max-width: 800px;
  margin: auto;
  @media screen and (max-width: 1000px) {
    max-width: 100%;
  }
`;
const ClubListWrapper = styled.div`
  margin: 25px auto 0;
  max-width: 100%;
`;
const RightContainer = styled.div`
  min-width: 300px;
  max-height: 535px;
  overflow-y: scroll;
  height: fit-content;
  position: sticky;
  right: 0;
  top: 40px;
  background-color: white;
  padding: 18px;
  @media screen and (max-width: 1500px) {
    display: none;
  }
`;
const MiddleTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
`;
const MiddleInstruction = styled.h4`
  font-size: 0.75rem;
  color: var(--gray01);
  margin-top: 4px;
`;
const RightTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 40px;
`;
const NoNotificationMsg = styled.span`
  text-align: center;
  font-size: 0.875rem;
  color: var(--gray01);
`;
