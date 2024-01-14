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

function App() {
  return (
    <Container className="App">
      <BrowserRouter>
        <Header />
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/clubList" element={<ClubListScreen />} />
          <Route path="/mypage" element={<MyPageScreen />} />
          <Route path="/postClub" element={<ClubPostScreen />} />
          <Route path="/clubDetail" element={<ClubDetailScreen />} />
        </Routes>
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
