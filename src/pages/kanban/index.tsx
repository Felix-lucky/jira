import { ScreenContainer } from "components/styled";
import React, { useCallback } from "react";
import styled from "styled-components";
import { useDocumentTitle } from "utils";
import { useKanbans, useReorderKanban } from "utils/kanban";
import KanbanColumn from "./kanbanColumn";
import {
  useKanbanQueryKey,
  useKanbanSearchParams,
  useProjectInurl,
  useTaskQueryKey,
  useTaskSearchParams,
} from "./until";
import SearchPanel from "./search";
import { useReorderTask, useTasks } from "utils/task";
import { Spin } from "antd";
import CreateKanban from "./createKanban";
import TaskModal from "./taskModal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "components/DragDrop";

export default function Kanban() {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInurl();
  const { data: kanbans, isLoading: kanbanLoading } = useKanbans(
    useKanbanSearchParams()
  );
  const { isLoading: taskLoading } = useTasks(useTaskSearchParams());
  const onDragEnd = useDragEnd();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h1>{currentProject?.name}</h1>
        <SearchPanel />
        {kanbanLoading || taskLoading ? (
          <Spin size="large" />
        ) : (
          <ContainerKanban>
            <Drop
              type={"COLUMN"}
              direction={"horizontal"}
              droppableId={"kanban"}
            >
              <DropChild style={{ display: "flex" }}>
                {kanbans?.map((kanban, index) => (
                  <Drag
                    key={kanban.id}
                    draggableId={"kanban" + kanban.id}
                    index={index}
                  >
                    <KanbanColumn kanban={kanban} key={kanban.id} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateKanban />
          </ContainerKanban>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
}

export const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanbanQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTaskQueryKey());
  const { data: allTasks = [] } = useTasks(useTaskSearchParams());
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      // 看板排序
      if (type === "COLUMN") {
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? "after" : "before";
        reorderKanban({ fromId, referenceId: toId, type });
      }
      if (type === "ROW") {
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;
        const fromTask = allTasks.filter(
          (task) => task.kanbanId === fromKanbanId
        )[source.index];
        const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[
          destination.index
        ];
        if (fromTask?.id === toTask?.id) {
          return;
        }
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type:
            fromKanbanId === toKanbanId && destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [kanbans, reorderKanban, allTasks, reorderTask]
  );
};

const ContainerKanban = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
