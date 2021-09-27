import React from "react";

type FullbackRender = (props: { error: Error | null }) => React.ReactElement;
export default class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fullbackRender: FullbackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    const { error } = this.state;
    const { fullbackRender, children } = this.props;
    return error ? fullbackRender({ error }) : children;
  }
}
