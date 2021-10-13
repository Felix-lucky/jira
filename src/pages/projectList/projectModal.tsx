import React, { useEffect } from "react";
import { Button, Drawer, Form, Input, Spin } from "antd";
import { useProjectModal, useProjectsQueryKey } from "./util";
import UsersSelect from "components/Select";
import { useAddProject, useEditProject } from "utils/project";
import { ErrorBox } from "components/FullPage";
import styled from "styled-components";

const ProjectModal = () => {
  const [form] = Form.useForm();
  const { projectModalOpen, close, editProject, isLoading } = useProjectModal();
  const useMutateProject = editProject ? useEditProject : useAddProject;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(useProjectsQueryKey());

  const closeModal = () => {
    form.resetFields();
    close();
  };

  const onFinish = (values: any) => {
    mutateAsync({ ...editProject, ...values }).then(() => {
      closeModal();
    });
  };

  useEffect(() => {
    form.setFieldsValue(editProject);
  }, [editProject, form]);

  const title = editProject ? "编辑项目" : "创建项目";
  return (
    <Drawer
      forceRender={true}
      width="100%"
      onClose={closeModal}
      visible={projectModalOpen}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              style={{ width: "40rem" }}
            >
              <Form.Item
                label="项目名称"
                name="name"
                rules={[{ required: true, message: "请输入项目名称" }]}
              >
                <Input placeholder="请输入项目名称" />
              </Form.Item>
              <Form.Item
                label="部门名称"
                name="organization"
                rules={[{ required: true, message: "请输入部门名称" }]}
              >
                <Input placeholder="请输入部门名称" />
              </Form.Item>
              <Form.Item label="负责人" name="personId">
                <UsersSelect defaultOptionName={"负责人"} />
              </Form.Item>
              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType="submit"
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default ProjectModal;
