import React from "react";
import { useSetUrlSearchParam } from "utils/url";
import { useTaskSearchParams } from "./until";
import { Row } from "components/styled";
import { Button, Input } from "antd";
import UsersSelect, { TaskTypeSelect } from "components/Select";

const SearchPanel = () => {
  const searchParams = useTaskSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const reset = () => {
    setSearchParams({
      name: undefined,
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
    });
  };
  return (
    <Row gap={true} marginBottom={4}>
      <Input
        style={{ width: "20rem" }}
        placeholder="请输入任务名"
        value={searchParams.name}
        onChange={(e) => setSearchParams({ name: e.target.value })}
      />
      <UsersSelect
        defaultOptionName="经办人"
        value={searchParams.processorId}
        onChange={(processorId) => setSearchParams({ processorId })}
      />
      <TaskTypeSelect
        defaultOptionName="类型"
        value={searchParams.typeId}
        onChange={(typeId) => setSearchParams({ typeId })}
      />
      <Button onClick={reset}>重置</Button>
    </Row>
  );
};

export default SearchPanel;
