import React from "react";
import { Form, Input } from "antd";
import { ButtonSubmit } from "../index";

export default function Register() {
  const onFinish = (values: {
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    console.log(values);
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
        <ButtonSubmit type="primary" htmlType="submit">
          注册
        </ButtonSubmit>
      </Form.Item>
    </Form>
  );
}
