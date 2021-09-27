import React, { useState } from "react";
import { Card, Button, Alert } from "antd";
import styled from "styled-components";
import Register from "./register";
import Login from "./login";
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";
import { useDocumentTitle } from "utils";

export default function User() {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  useDocumentTitle("请登录注册继续");
  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        {error ? (
          <Alert message={error.message} type="error" showIcon closable />
        ) : null}
        <Title>{isRegister ? "请注册" : "请登录"}</Title>
        {isRegister ? (
          <Register onError={setError} />
        ) : (
          <Login onError={setError} />
        )}
        <ButtonLink type="link" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "已经有账号直接登录" : "没有账号注册新账号"}
        </ButtonLink>
      </ShadowCard>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  position: relative;
`;

const Header = styled.div`
  width: 100%;
  padding: 5rem 0;
  background: url(${logo}) no-repeat center;
  background-size: 8rem;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
  text-align: center;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 48rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
`;

export const ButtonSubmit = styled(Button)`
  width: 100%;
  margin-top: 2rem;
`;

const ButtonLink = styled(Button)`
  width: 100%;
  text-align: center;
  margin-top: 1rem;
`;
