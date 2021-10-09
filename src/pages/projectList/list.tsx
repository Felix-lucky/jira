import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { Table, TableProps } from "antd";
import { User, Project } from "types";
import Pin from "components/Rate";
import { useEditProject } from "utils/project";

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}

export default function List({ users, refresh, ...props }: ListProps) {
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(refresh);
  return (
    <Table
      rowKey={(record) => record.id}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render: (text, record) => (
            <Pin checked={record.pin} onCheckedChange={pinProject(record.id)} />
          ),
        },
        {
          title: "名称",
          dataIndex: "name",
          key: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render: (text, record) => (
            <Link to={String(record?.id)}>{record.name}</Link>
          ),
        },
        {
          title: "部门",
          dataIndex: "organization",
          key: "organization",
        },
        {
          title: "负责人",
          dataIndex: "personId",
          key: "personId",
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
