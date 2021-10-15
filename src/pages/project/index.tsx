import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Epic from "pages/epic";
import KanBan from "pages/kanban";
import { Menu } from "antd";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export default function Project() {
  const routeTypre = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu mode="inline" selectedKeys={[routeTypre]}>
          <Menu.Item key="kanban">
            <Link to="kanban">看板</Link>
          </Menu.Item>
          <Menu.Item key="epic">
            <Link to="epic">任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path="/kanban" element={<KanBan />} />
          <Route path="/epic" element={<Epic />} />
          <Navigate to="kanban" replace={true} />
        </Routes>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
`;

const Aside = styled.div`
  display: flex;
  background-color: rgb(244, 245, 247);
`;

const Main = styled.div`
  display: flex;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;
