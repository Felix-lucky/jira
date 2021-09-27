import React from "react";
import { Form, Input } from "antd";
import { ButtonSubmit } from "../index";
import { UserParams } from "types";
import { useAuth } from "context/authCintext";
import { useAsync } from "utils/useAsync";

export default function Login({
  onError,
}: {
  onError: (error: Error) => void;
}) {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const onFinish = async (values: UserParams) => {
    try {
      await run(login(values));
    } catch (e: any) {
      onError(e);
    }
  };
  return (
    <Form onFinish={onFinish}>
      <Form.Item
        hasFeedback
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item
        hasFeedback
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password placeholder="请输入密码" />
      </Form.Item>
      <Form.Item>
        <ButtonSubmit loading={isLoading} type="primary" htmlType="submit">
          登录
        </ButtonSubmit>
      </Form.Item>
    </Form>
  );
}
