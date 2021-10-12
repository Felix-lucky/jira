import React from "react";
import styled from "styled-components";
import Search from "./search";
import List from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import { useProjects } from "utils/project";
import { useUsers } from "utils/users";
import { useProjectsSearchParams } from "./util";
import { ButtonNoPadding, Row } from "components/styled";

export default function ProjectList() {
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, data: list, retry } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  useDocumentTitle("项目列表", false);
  return (
    <Container>
      <Row marginBottom={2} between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type="link">创建项目</ButtonNoPadding>
      </Row>

      <Search param={param} setParam={setParam} />
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  );
}

const Container = styled.div`
  padding: 3.2rem;
`;
