import React from "react";
import { Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";
import styled from "styled-components";
import { ReactComponent as ErrorSvg } from "assets/error.svg";

const FullPage = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export function FullPageLoading() {
  return (
    <FullPage>
      <Spin size="large" />
    </FullPage>
  );
}

export function FullPageError({ error }: { error: Error | null }) {
  return (
    <FullPage>
      <DevTools />
      <ErrorSvg width="40rem" />
      <ErrorBox error={error} />
    </FullPage>
  );
}

const isError = (value: any): value is Error => value?.message;

export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return <Typography.Text type={"danger"}>{error?.message}</Typography.Text>;
  }
  return null;
};
