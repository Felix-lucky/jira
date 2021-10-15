import React, { useState } from "react";
import { Input } from "antd";
import { useAddKanban } from "utils/kanban";
import { useKanbanQueryKey, useProjectIdInUrl } from "./until";
import styled from "styled-components";

const CreateKanban = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addKanban } = useAddKanban(useKanbanQueryKey());
  const submit = async () => {
    await addKanban({ name, projectId });
    setName("");
  };

  return (
    <Container>
      <Input
        placeholder="请输入看板名"
        size="large"
        value={name}
        onPressEnter={submit}
        onChange={(e) => setName(e.target.value)}
      />
    </Container>
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

export default CreateKanban;
