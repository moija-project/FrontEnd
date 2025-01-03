/* eslint-disable */
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './pages/home/HomeScreen';
import styled from 'styled-components';
import GlobalStyle from './style/GlobalStyles';
import Header from './components/Header';
import ClubListScreen from './pages/club-list/ClubListScreen';
import MyPageScreen from './pages/mypage/MyPageScreen';
import ClubPostScreen from './pages/club-post/ClubPostScreen';
import ClubDetailScreen from './pages/club-detail/ClubDetailScreen';
import ReviewCredScreen from './pages/credibility-review/ReviewCredScreen';
import NotFoundScreen from './pages/NotFoundScreen';
import DefaultScrollTop from './components/DefaultScrollTop';
import LoginScreen from './pages/login/LoginScreen';
import ReadRequestDetailScreen from './pages/read-request-detail/ReadRequestDetailScreen';
import { RecoilRoot } from 'recoil';
import RegulationAgreementScreen from './pages/sign-up/RegulationAgreementScreen';
import SignupScreen from './pages/sign-up/SignupScreen';
import AnswerQuestionsScreen from './pages/answer-questions/AnswerQuestionsScreen';
import ClubReviseScreen from './pages/club-post-revise/ClubReviseScreen';
import CompleteSignupScreen from './pages/sign-up/CompleteSignupScreen';
import MorePostListScreen from './pages/mypage/MorePostListScreen';
import ChatRoomScreen from './pages/chat-room/ChatRoomScreen';
import { PrivateRoute } from './PrivateRoute';
import ChatListScreen from './pages/chat-list/ChatListScreen';

function App() {
  return (
    <Container className="App">
      <BrowserRouter>
        <RecoilRoot>
          <React.Suspense fallback={<div>loading..</div>}>
            {window.location.pathname !== '/chatRoom' && <Header />}
            <DefaultScrollTop />
            <GlobalStyle />
            <Routes>
              {/* ###        비로그인 가능       */}
              <Route path="/" element={<HomeScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              {/* 회원가입 */}
              <Route path="/regulation" element={<RegulationAgreementScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/completeSignup" element={<CompleteSignupScreen />} />
              <Route path="/clubList" element={<ClubListScreen />} />
              <Route path="/clubDetail/:postId" element={<ClubDetailScreen />} />
              {/*  */}
              {/*  */}
              {/* ###        로그인 시에만       */}
              <Route element={<PrivateRoute />}>
                <Route path="/postClub" element={<ClubPostScreen />} />
                <Route path="/reviseClub" element={<ClubReviseScreen />} />
                <Route path="/mypage" element={<MyPageScreen />} />
                <Route path="/mypage-morePost/:type" element={<MorePostListScreen />} />
                <Route path="/answerQuestions/:postId" element={<AnswerQuestionsScreen />} />
                {/**신뢰도 평가 하는 페이지 */}
                <Route path="/credReview" element={<ReviewCredScreen />} />
                <Route path="/readRequestDetail" element={<ReadRequestDetailScreen />} />
                {/* 채팅 */}
                <Route path="/chatList" element={<ChatListScreen />} />
                <Route path="/chatRoom/:chatRoomId" element={<ChatRoomScreen />} />
              </Route>

              <Route path="/*" element={<NotFoundScreen />} />
            </Routes>
          </React.Suspense>
        </RecoilRoot>
      </BrowserRouter>
    </Container>
  );
}

export default App;

const Container = styled.div`
  background-color: #f0f0f0;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
