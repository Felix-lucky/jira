import React from "react";
import { Form, Input } from "antd";
import { ButtonSubmit } from "../index";
import { queryLogin, UserParams } from "services/user";

export default function Login() {
  const onFinish = (values: UserParams) => {
    console.log(values);
    queryLogin(values).then((res) => {
      console.log(res);
    });
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
        <ButtonSubmit type="primary" htmlType="submit">
          登录
        </ButtonSubmit>
      </Form.Item>
    </Form>
  );
}
