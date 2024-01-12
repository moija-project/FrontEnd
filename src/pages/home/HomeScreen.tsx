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
        <div style={{ marginTop: 25 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((v, i) =>
            i === 0 ? <PreviewPost isFirst={true} /> : <PreviewPost />
          )}
        </div>
      </MiddleContainer>
      <RightContainer>
        <RightTitle>알림</RightTitle>
        {/* <NoNotificationMsg>알림이 없어요</NoNotificationMsg> */}
        <div style={{ marginTop: 25 }}>
          {[1, 2, 3, 4].map((v, i) =>
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
`;
const LeftContainer = styled.div`
  /* padding: 0 15px; */
  flex: 1;
`;
const MiddleContainer = styled.div`
  flex: 1;
  /* padding: 0 15px; */
  max-width: 800px;
`;
const RightContainer = styled.div`
  height: fit-content;
  position: sticky;
  right: 0;
  top: 40px;
  background-color: white;
  padding: 18px;
  flex: 1;
`;
const MiddleTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
`;
const MiddleInstruction = styled.h4`
  font-size: 12px;
  color: var(--gray01);
  margin-top: 4px;
`;
const RightTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 40px;
`;
const NoNotificationMsg = styled.span`
  text-align: center;
  font-size: 14px;
  color: var(--gray01);
`;
