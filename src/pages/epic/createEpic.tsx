import React from "react";
import { Button, Drawer, DrawerProps, Form, Input, Spin } from "antd";
import { useAddEpic } from "utils/epic";
import { useEpicQueryKey } from "./util";
import styled from "styled-components";
import { useProjectIdInUrl } from "pages/kanban/until";
import { ErrorBox } from "components/FullPage";

const CreateEpic = (
  props: Pick<DrawerProps, "visible" | "onClose"> & { onClose: () => void }
) => {
  const [form] = Form.useForm();
  const {
    mutateAsync: addEpic,
    isLoading,
    error,
  } = useAddEpic(useEpicQueryKey());
  const projectId = useProjectIdInUrl();

  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId });
    close();
  };

  const close = () => {
    form.resetFields();
    props.onClose();
  };

  return (
    <Drawer
      visible={props.visible}
      onClose={close}
      forceRender={true}
      destroyOnClose={true}
      width="100%"
    >
      <Container>
        <h1>创建任务组</h1>
        <ErrorBox error={error} />
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ width: "40rem" }}
        >
          <Form.Item
            label="任务名"
            name="name"
            rules={[{ required: true, message: "请输入任务名" }]}
          >
            <Input placeholder="请输入任务名" />
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Button loading={isLoading} type={"primary"} htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
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

export default CreateEpic;
