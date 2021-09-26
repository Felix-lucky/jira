import React from "react";
import { Form, Input, Select } from "antd";
import { User, Project } from "types";
interface Param {
  name: string;
  personId: string;
}
interface SearchProps {
  users: User[];
  param: Param;
  setParam: (param: SearchProps["param"]) => void;
}
export default function SearchPanel({ users, param, setParam }: SearchProps) {
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
        <Select
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user?.id} value={user?.id}>
              {user?.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
}
