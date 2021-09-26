import React, { useState } from "react";
import styled from "styled-components";
import Search from "./search";
import List from "./list";
import { useDebounce } from "utils";
import { useProjects } from "utils/project";
import { useUsers } from "utils/users";

export default function ProjectList() {
  const [param, setParam] = useState({ name: "", personId: "" });
  const debounceParam = useDebounce(param);
  const { isLoading, data: list } = useProjects(debounceParam);
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <Search users={users || []} param={param} setParam={setParam} />
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
}

const Container = styled.div`
  padding: 3.2rem;
`;
