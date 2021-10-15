import { useCallback, useMemo } from "react";
import { useLocation } from "react-router";
import { useProject } from "utils/project";
import { useTask } from "utils/task";
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

export const useTasksModal = () => {
  const [{ editTaskId }, setEditTaskId] = useUrlSearchParam(["editTaskId"]);
  const { data: editTask, isLoading } = useTask(Number(editTaskId));

  const startEdit = useCallback(
    (editTaskId: number) => {
      setEditTaskId({ editTaskId });
    },
    [setEditTaskId]
  );

  const close = useCallback(() => {
    setEditTaskId({ editTaskId: undefined });
  }, [setEditTaskId]);

  return {
    startEdit,
    isLoading,
    editTask,
    close,
    editTaskId,
  };
};

export const useKeyWords = (str: string, keyWords: string) => {
  const reg = new RegExp(`(${keyWords})`, "g");
  return str.replace(reg, `<span style="color: red">$1</span>`);
};
