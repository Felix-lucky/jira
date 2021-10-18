import React from "react";
import styled from "styled-components";
import { Popover, List, Typography, Divider } from "antd";
import { useProjects } from "utils/project";
import { ButtonNoPadding } from "components/styled";
import { useProjectModal } from "pages/projectList/util";
import { Link } from "react-router-dom";

const ProjectPopover = () => {
  const { data: projects, refetch } = useProjects();
  const { open } = useProjectModal();
  const pinProjects = projects?.filter((project) => project?.pin);
  const content = (
    <ContentContent>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinProjects?.map((paroject) => (
          <List.Item key={paroject.id}>
            <Link to={`projects/${paroject?.id}`}>{paroject.name}</Link>
          </List.Item>
        ))}
      </List>
      <Divider dashed />
      <ButtonNoPadding type="link" onClick={open}>
        创建项目
      </ButtonNoPadding>
    </ContentContent>
  );

  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement="bottom"
      content={content}
    >
      <span>项目</span>
    </Popover>
  );
};

const ContentContent = styled.div`
  min-width: 30rem;
`;

export default ProjectPopover;
