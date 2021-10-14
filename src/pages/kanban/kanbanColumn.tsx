import React from "react";
import styled from "styled-components";
import { Kanban } from "types";
import { useTasks } from "utils/task";
import { useTaskSearchParams } from "./until";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import { useTaskTypes } from "utils/taskType";
import { Card } from "antd";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((item) => item.id === id)?.name;

  if (!name) return null;

  return <img src={name === "task" ? taskIcon : bugIcon} alt="icon" />;
};

const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: AllTasks } = useTasks(useTaskSearchParams());
  const tasks = AllTasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <Container>
      <h3>{kanban.name}</h3>
      <TaskContainer>
        {tasks?.map((item) => (
          <Card
            style={{ marginBottom: "0.5rem", cursor: "pointer" }}
            key={item.id}
          >
            <div>{item.name}</div>
            <TaskTypeIcon id={item.typeId} />
          </Card>
        ))}
      </TaskContainer>
    </Container>
  );
};

const Container = styled.div`
  min-width: 27rem;
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
