import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./pages/home/HomeScreen";
import styled from "styled-components";
import GlobalStyle from "./style/GlobalStyles";
import Header from "./components/Header";
import ClubListScreen from "./pages/club-list/ClubListScreen";
import MyPageScreen from "./pages/mypage/MyPageScreen";

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
