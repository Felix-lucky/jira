import { useMemo } from "react";
import { useProject } from "utils/project";
import { useUrlSearchParam, useSetUrlSearchParam } from "utils/url";

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlSearchParam(["name", "personId"]);
  return [
    useMemo(
      () => ({
        ...param,
        personId: Number(param.personId) || undefined,
      }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectsQueryKey = () => {
  const [param] = useProjectsSearchParams();
  return ["projects", param];
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlSearchParam([
    "projectCreate",
  ]);
  const [{ editProjectId }, setEditProjectId] = useUrlSearchParam([
    "editProjectId",
  ]);

  const { data: editProject, isLoading } = useProject(Number(editProjectId));
  const setUrlParams = useSetUrlSearchParam();

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () =>
    setUrlParams({ projectCreate: undefined, editProjectId: undefined });
  const startEdit = (id: number) => setEditProjectId({ editProjectId: id });

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editProjectId),
    open,
    close,
    startEdit,
    editProject,
    isLoading,
  };
};
