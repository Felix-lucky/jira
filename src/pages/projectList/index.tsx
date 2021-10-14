import React from "react";
import styled from "styled-components";
import Search from "./search";
import List from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import { useProjects } from "utils/project";
import { useUsers } from "utils/users";
import { useProjectsSearchParams, useProjectModal } from "./util";
import { ButtonNoPadding, Row, ScreenContainer } from "components/styled";

export default function ProjectList() {
  const [param, setParam] = useProjectsSearchParams();
  const { open } = useProjectModal();
  const { isLoading, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  useDocumentTitle("项目列表", false);
  return (
    <ScreenContainer>
      <Row marginBottom={2} between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type="link" onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>

      <Search param={param} setParam={setParam} />
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </ScreenContainer>
  );
}
