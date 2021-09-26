import React from "react";
import dayjs from "dayjs";
import { Table, TableProps } from "antd";
import { User, Project } from "types";

interface ListProps extends TableProps<Project> {
  users: User[];
}

export default function List({ users, ...props }: ListProps) {
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
          title: "部门",
          dataIndex: "name",
          key: "name",
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
          title: "创建时间",
          dataIndex: "created",
          key: "created",
          render: (text, record) => (
            <span>
              {record?.created
                ? dayjs(record.created).format("YYYY-MM-DD")
                : "无"}
            </span>
          ),
        },
      ]}
      {...props}
    />
  );
}
