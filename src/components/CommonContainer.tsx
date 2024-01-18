import React, { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

type CommonContainerProps = {
  children?: ReactNode;
  containerStyle?: React.CSSProperties;
};

export default function CommonContainer({
  children,
  containerStyle,
}: CommonContainerProps) {
  return (
    <Container>
      <MainContainer style={containerStyle}>{children}</MainContainer>
    </Container>
  );
}

const Container = styled.div`
  background-color: var(--background-color);
`;
const MainContainer = styled.div`
  background-color: white;
  padding: 2.19rem 3.125rem;
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
  margin: auto;
  @media (max-width: 1400px) {
    width: 100%;
    padding: 1.5rem 2.2rem;
  }
`;
