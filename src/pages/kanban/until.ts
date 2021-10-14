import { useMemo } from "react";
import { useLocation } from "react-router";
import { useProject } from "utils/project";
import { useUrlSearchParam } from "utils/url";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInurl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanbanQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTaskSearchParams = () => {
  const projectId = useProjectIdInUrl();
  const [param] = useUrlSearchParam(["name", "typeId", "processorId", "tagId"]);

  return useMemo(
    () => ({
      projectId,
      name: param.name || undefined,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
    }),
    [projectId, param]
  );
};

export const useTaskQueryKey = () => ["tasks", useTaskSearchParams()];
