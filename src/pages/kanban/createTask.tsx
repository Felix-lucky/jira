import { Button, Card, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useAddTask } from "utils/task";
import { useProjectIdInUrl, useTaskQueryKey } from "./until";

const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addTask } = useAddTask(useTaskQueryKey());
  const [inputMod, setInputMod] = useState(false);

  const submit = async () => {
    await addTask({ projectId, name, kanbanId });
    setInputMod(false);
    setName("");
  };

  const toggle = () => setInputMod((mod) => !mod);

  useEffect(() => {
    if (!inputMod) {
      setName("");
    }
  }, [inputMod]);

  return inputMod ? (
    <Card>
      <Input
        placeholder="请输入创建任务"
        onBlur={toggle}
        autoFocus={true}
        value={name}
        onPressEnter={submit}
        onChange={(e) => setName(e.target.value)}
      />
    </Card>
  ) : (
    <Button type="link" onClick={toggle}>
      +创建任务
    </Button>
  );
};

export default CreateTask;
