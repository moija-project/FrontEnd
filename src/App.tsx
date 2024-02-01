import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./pages/home/HomeScreen";
import styled from "styled-components";
import GlobalStyle from "./style/GlobalStyles";
import Header from "./components/Header";
import ClubListScreen from "./pages/club-list/ClubListScreen";
import MyPageScreen from "./pages/mypage/MyPageScreen";
import ClubPostScreen from "./pages/club-post/ClubPostScreen";
import ClubDetailScreen from "./pages/club-detail/ClubDetailScreen";
import ReviewCredScreen from "./pages/credibility-review/ReviewCredScreen";
import NotFoundScreen from "./pages/NotFoundScreen";
import DefaultScrollTop from "./components/DefaultScrollTop";
import LoginScreen from "./pages/login/LoginScreen";
import ReadRequestDetailScreen from "./pages/read-request-detail/ReadRequestDetailScreen";
import { RecoilRoot } from "recoil";
import RegulationAgreementScreen from "./pages/sign-up/RegulationAgreementScreen";
import SignupScreen from "./pages/sign-up/SignupScreen";
import AnswerQuestions from "./pages/answer-questions/AnswerQuestionsScreen";
import AnswerQuestionsScreen from "./pages/answer-questions/AnswerQuestionsScreen";
import ClubReviseScreen from "./pages/club-post-revise/ClubReviseScreen";

function App() {
  return (
    <Container className="App">
      <BrowserRouter>
        <RecoilRoot>
          <React.Suspense fallback={<div>loading..</div>}>
            <Header />
            <DefaultScrollTop />
            <GlobalStyle />
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route
                path="/regulation"
                element={<RegulationAgreementScreen />}
              />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/clubList" element={<ClubListScreen />} />
              <Route path="/mypage" element={<MyPageScreen />} />

              <Route path="/postClub" element={<ClubPostScreen />} />
              <Route path="/reviseClub" element={<ClubReviseScreen />} />

              <Route
                path="/clubDetail/:postId"
                element={<ClubDetailScreen />}
              />
              <Route
                path="/answerQuestions/:postId"
                element={<AnswerQuestionsScreen />}
              />

              {/**신뢰도 평가 하는 페이지 */}
              <Route path="/credReview" element={<ReviewCredScreen />} />

              <Route
                path="/readRequestDetail"
                element={<ReadRequestDetailScreen />}
              />
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
  height: 100vh;
`;
