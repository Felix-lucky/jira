/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "context/authContext";
import { Dropdown, Menu } from "antd";
import styled from "styled-components";
import { Row } from "components/styled";
import ProjectList from "pages/projectList";
import ProjectDetail from "pages/project";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { resetRoute } from "utils";
import ProjectPopover from "components/ProjectPopover";
import { ButtonNoPadding } from "components/styled";
import ProjectModal from "pages/projectList/projectModal";

export default function Dashboard() {
  return (
    <Container>
      <Router>
        <PageHeader />
        <Main>
          <Routes>
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/:projectId/*" element={<ProjectDetail />} />
            <Navigate to="/projects" />
          </Routes>
        </Main>
        <ProjectModal />
      </Router>
    </Container>
  );
}

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type="link" onClick={resetRoute}>
          <SoftwareLogo width="18rem" color="rgb(38, 132, 255)" />
        </ButtonNoPadding>
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <UserInfo />
      </HeaderRight>
    </Header>
  );
};

const UserInfo = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="logout">
            <a onClick={logout} style={{ color: "#1890ff" }}>
              登出
            </a>
          </Menu.Item>
        </Menu>
      }
    >
      <a onClick={(e) => e.preventDefault()}> Hi, {user?.name}</a>
    </Dropdown>
  );
};

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
  /* display: flex;
  overflow: hidden; */
`;
