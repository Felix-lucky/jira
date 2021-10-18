import React, { forwardRef } from "react";
import styled from "styled-components";
import { Kanban, Task } from "types";
import { useTasks } from "utils/task";
import {
  useKanbanQueryKey,
  useKeyWords,
  useTaskSearchParams,
  useTasksModal,
} from "./until";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import { useTaskTypes } from "utils/taskType";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import CreateTask from "./createTask";
import { useDeleteKanban } from "utils/kanban";
import { Row } from "components/styled";
import { Drag, Drop, DropChild } from "components/DragDrop";

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal();
  const { name: keyword } = useTaskSearchParams();
  return (
    <Card
      key={task.id}
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
      onClick={() => startEdit(task.id)}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: useKeyWords(task.name, keyword as string),
        }}
      />
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((item) => item.id === id)?.name;

  if (!name) return null;

  return <img src={name === "task" ? taskIcon : bugIcon} alt="icon" />;
};

const KanbanColumn = forwardRef<HTMLDivElement, { kanban: Kanban }>(
  ({ kanban, ...props }, ref) => {
    const { data: AllTasks } = useTasks(useTaskSearchParams());
    const tasks = AllTasks?.filter((task) => task.kanbanId === kanban.id);

    return (
      <Container {...props} ref={ref}>
        <Row between={true}>
          <h3>{kanban.name}</h3>
          <More kanban={kanban} key={kanban.id} />
        </Row>
        <TaskContainer>
          {/* {tasks?.map((item) => (
          <TaskCard key={item.id} task={item} />
        ))} */}
          <Drop
            type={"ROW"}
            direction={"vertical"}
            droppableId={String(kanban.id)}
          >
            <DropChild style={{ minHeight: "1rem" }}>
              {tasks?.map((task, taskIndex) => (
                <Drag
                  key={task.id}
                  index={taskIndex}
                  draggableId={"task" + task.id}
                >
                  <div>
                    <TaskCard key={task.id} task={task} />
                  </div>
                </Drag>
              ))}
            </DropChild>
          </Drop>
          <CreateTask kanbanId={kanban.id} />
        </TaskContainer>
      </Container>
    );
  }
);

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutate: deleteKanban } = useDeleteKanban(useKanbanQueryKey());

  const confirmDeleteKanban = () => {
    Modal.confirm({
      title: "确认删除看板吗？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        deleteKanban(kanban.id);
      },
    });
  };

  const overlay = (
    <Menu>
      <Menu.Item key="delete">
        <Button type="link" onClick={confirmDeleteKanban}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={overlay}>
      <Button type="link">...</Button>
    </Dropdown>
  );
};

const Container = styled.div`
  min-width: 25rem;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
  background-color: rgba(244, 245, 247);
`;

const TaskContainer = styled.div`
  flex: 1;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default KanbanColumn;
