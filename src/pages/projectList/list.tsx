import React from "react";
import { Table, TableProps } from "antd";
import { User, Project } from "types";

interface ListProps extends TableProps<Project> {
  users: User[];
  list: Project[];
}

export default function List({ users, list }: ListProps) {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          key: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render: (text, record) => (
            <span>
              {users.find((user) => user.id === record.personId)?.name ||
                "未知"}
            </span>
          ),
        },
        {
          title: "住址",
          dataIndex: "address",
          key: "address",
        },
      ]}
      dataSource={list}
    />
  );
}
