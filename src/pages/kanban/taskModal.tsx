import React, { useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
import UsersSelect, { TaskTypeSelect } from "components/Select";
import { useDeleteTask, useEditTask } from "utils/task";
import { useTaskQueryKey, useTasksModal } from "./until";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const TaskModal = () => {
  const [form] = Form.useForm();
  const { editTaskId, editTask, close } = useTasksModal();
  const { mutateAsync, isLoading } = useEditTask(useTaskQueryKey());
  const { mutate: deleteTask } = useDeleteTask(useTaskQueryKey());
  const onCancel = () => {
    close();
    form.resetFields();
  };
  const onOk = async () => {
    await mutateAsync({ ...editTask, ...form.getFieldsValue() });
    close();
  };

  const confirmDeleteTask = () => {
    close();
    Modal.confirm({
      title: "确认删除任务吗？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        deleteTask(Number(editTaskId));
      },
    });
  };

  useEffect(() => {
    form.setFieldsValue(editTask);
  }, [form, editTask]);

  return (
    <Modal
      title="编辑任务"
      forceRender={true}
      visible={!!editTaskId}
      okText="确认"
      cancelText="取消"
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={isLoading}
    >
      <Form {...layout} initialValues={editTask} form={form}>
        <Form.Item
          label="任务名"
          name="name"
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input placeholder="请输入任务名" />
        </Form.Item>
        <Form.Item label="经办人" name="processorId">
          <UsersSelect defaultOptionName="经办人" />
        </Form.Item>
        <Form.Item label="类型" name="typeId">
          <TaskTypeSelect defaultOptionName="类型" />
        </Form.Item>
      </Form>
      <div style={{ textAlign: "right" }}>
        <Button type="link" onClick={confirmDeleteTask}>
          删除
        </Button>
      </div>
    </Modal>
  );
};

export default TaskModal;
