/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useAuth } from "context/authCintext";
import { Dropdown, Menu } from "antd";
import styled from "styled-components";
import { Row } from "components/styled";
import ProjectList from "pages/projectList";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";

export default function Dashboard() {
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width="18rem" color="rgb(38, 132, 255)" />
          <h1>项目</h1>
          <h1>用户</h1>
        </HeaderLeft>
        <HeaderRight>
          <UserInfo />
        </HeaderRight>
      </Header>
      <ProjectList />
      <Main></Main>
    </Container>
  );
}

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
  display: flex;
  overflow: hidden;
`;
