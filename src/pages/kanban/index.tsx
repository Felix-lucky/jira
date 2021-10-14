import { ScreenContainer } from "components/styled";
import React from "react";
import styled from "styled-components";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import KanbanColumn from "./kanbanColumn";
import {
  useKanbanSearchParams,
  useProjectInurl,
  useTaskSearchParams,
} from "./until";
import SearchPanel from "./search";
import { useTasks } from "utils/task";
import { Spin } from "antd";

export default function KanBan() {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInurl();
  const { data: kanbans, isLoading: kanbanLoading } = useKanbans(
    useKanbanSearchParams()
  );
  const { isLoading: taskLoading } = useTasks(useTaskSearchParams());

  return (
    <ScreenContainer>
      <h1>{currentProject?.name}</h1>
      <SearchPanel />
      {kanbanLoading || taskLoading ? (
        <Spin size="large" />
      ) : (
        <ContainerKanban>
          {kanbans?.map((item) => (
            <KanbanColumn key={item.id} kanban={item} />
          ))}
        </ContainerKanban>
      )}
    </ScreenContainer>
  );
}

const ContainerKanban = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
