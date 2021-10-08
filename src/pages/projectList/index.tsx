import React from "react";
import styled from "styled-components";
import Search from "./search";
import List from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import { useProjects } from "utils/project";
import { useUsers } from "utils/users";
import { useProjectsSearchParams } from "./util";

export default function ProjectList() {
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  useDocumentTitle("项目列表", false);
  return (
    <Container>
      <h1>项目列表</h1>
      <Search param={param} setParam={setParam} />
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
}

const Container = styled.div`
  padding: 3.2rem;
`;
