import React from "react";
import { Form, Input } from "antd";
import { ButtonSubmit } from "../index";
import { UserParams } from "types";
import { useAuth } from "context/authCintext";
import { useAsync } from "utils/useAsync";

export default function Register({
  onError,
}: {
  onError: (error: Error) => void;
}) {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const onFinish = async (values: UserParams) => {
    const { username, password } = values;
    try {
      await run(register({ username, password }));
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
      <Form.Item
        name="confirmPassword"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "请确认密码",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("您输入的两个密码不一样！"));
            },
          }),
        ]}
      >
        <Input.Password placeholder="请确认密码" />
      </Form.Item>
      <Form.Item>
        <ButtonSubmit loading={isLoading} type="primary" htmlType="submit">
          注册
        </ButtonSubmit>
      </Form.Item>
    </Form>
  );
}
