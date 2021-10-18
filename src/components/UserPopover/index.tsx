import React from "react";
import styled from "styled-components";
import { Popover, List, Typography } from "antd";
import { useUsers } from "utils/users";

const UserPopover = () => {
  const { data: users, refetch } = useUsers();
  const content = (
    <ContentContent>
      <Typography.Text type="secondary">组员</Typography.Text>
      <List>
        {users?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name} />
          </List.Item>
        ))}
      </List>
    </ContentContent>
  );

  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement="bottom"
      content={content}
    >
      <span>组员</span>
    </Popover>
  );
};

const ContentContent = styled.div`
  min-width: 30rem;
`;

export default UserPopover;
