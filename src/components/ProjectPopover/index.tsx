import React from "react";
import styled from "styled-components";
import { Popover, List, Typography } from "antd";
import { useProjects } from "utils/project";
import { ButtonNoPadding } from "components/styled";

const ProjectPopover = () => {
  const { data: projects } = useProjects();
  const pinProjects = projects?.filter((project) => project?.pin);
  const content = (
    <ContentContent>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinProjects?.map((paroject) => (
          <List.Item key={paroject.id}>
            <List.Item.Meta title={paroject.name} />
          </List.Item>
        ))}
      </List>
      <ButtonNoPadding type="link">创建项目</ButtonNoPadding>
    </ContentContent>
  );

  return (
    <Popover placement="bottom" content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContent = styled.div`
  min-width: 30rem;
`;

export default ProjectPopover;
