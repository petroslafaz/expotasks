import { createEntityHooks } from "@/shared/api/query-hooks";
import * as projectApi from "../api/project-api";
import {
  Project,
  CreateProjectType,
  UpdateProjectType,
} from "../schema/project-schema";

const {
  useCreateEntity: useCreateProject,
  useUpdateEntity: useUpdateProject,
  useFetchEntities: useFetchProjects,
  useFetchEntity: useFetchProject,
} = createEntityHooks<
  Project,
  CreateProjectType,
  UpdateProjectType & { id: string }
>("projects", {
  fetchAll: projectApi.fetchProjects,
  fetchOne: projectApi.fetchProject,
  create: projectApi.createProject,
  update: projectApi.updateProject,
});

export {
  useCreateProject,
  useUpdateProject,
  useFetchProjects,
  useFetchProject,
};
