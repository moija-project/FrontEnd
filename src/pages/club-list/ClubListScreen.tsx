import React from "react";
import styled from "styled-components";
import MenuNavBar from "./components/MenuNavBar";

export default function ClubListScreen() {
  return (
    <Container>
      <MenuNavBar />
    </Container>
  );
}

const Container = styled.div`
  background-color: var(--background-color);
`;
