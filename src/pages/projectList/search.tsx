import React from "react";
import { Form, Input } from "antd";
import { Project } from "types";
import UsersSelect from "components/Select";

interface SearchProps {
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchProps["param"]) => void;
}
export default function SearchPanel({ param, setParam }: SearchProps) {
  return (
    <Form layout="inline" style={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          allowClear
          placeholder="请输入项目名称"
          value={param.name}
          onChange={(evt) => setParam({ ...param, name: evt.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <UsersSelect
          defaultOptionName={"负责人"}
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        />
      </Form.Item>
    </Form>
  );
}
