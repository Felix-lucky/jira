import React from "react";
import { useAuth } from "context/authCintext";
import { Button } from "antd";
import styled from "styled-components";
import { Row } from "components/styled";
import ProjectList from "pages/projectList";

export default function Dashboard() {
  const { logout } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h1>logo</h1>
          <h1>logo</h1>
          <h1>logo</h1>
        </HeaderLeft>
        <HeaderRight>
          <Button type="primary" onClick={logout}>
            登出
          </Button>
        </HeaderRight>
      </Header>
      <ProjectList />
      <Main></Main>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main`
  display: flex;
  overflow: hidden;
`;
