import React from "react";
import { Form, Input, Select } from "antd";

export default function SearchPanel() {
  return (
    <Form layout="inline" style={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input placeholder="项目名称" />
      </Form.Item>
      <Form.Item>
        <Select>
          <Select.Option value="">负责人</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
}
