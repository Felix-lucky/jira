import React, { useState } from "react";
import { Row, ScreenContainer } from "components/styled";
import { useProjectInurl } from "pages/kanban/until";
import { useDocumentTitle } from "utils";
import { Button, List, Modal } from "antd";
import { useDeleteEpic, useEpics } from "utils/epic";
import { useEpicQueryKey, useEpicSearchParams } from "./util";
import dayjs from "dayjs";
import { useTasks } from "utils/task";
import { Link } from "react-router-dom";
import CreateEpic from "./createEpic";

export default function Epic() {
  useDocumentTitle("任务组");

  const [visible, setVisible] = useState(false);
  const { data: currentProject } = useProjectInurl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicQueryKey());
  const confirmDeleteEpic = (id: number) => {
    Modal.confirm({
      title: "确认删除项目组吗？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        deleteEpic(id);
      },
    });
  };

  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProject?.name}</h1>
        <Button type="link" onClick={() => setVisible(true)}>
          创建任务组
        </Button>
      </Row>
      <List
        locale={{ emptyText: "暂无数据" }}
        style={{ overflow: "scroll" }}
        dataSource={epics}
        itemLayout="vertical"
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{item?.name}</span>
                  <Button
                    type="link"
                    onClick={() => confirmDeleteEpic(item.id)}
                  >
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间：{dayjs(item.start).format("YYYY-MM-DD")}</div>
                  <div>结束时间：{dayjs(item.end).format("YYYY-MM-DD")}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.id === item.id)
                .map((task) => (
                  <Link
                    key={task.id}
                    to={`/projects/${currentProject?.id}/kanban?editTaskId=${task.id}`}
                  >
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic visible={visible} onClose={() => setVisible(false)} />
    </ScreenContainer>
  );
}
