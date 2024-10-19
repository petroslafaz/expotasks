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
  useFetchAllEntities: useFetchAllProjects,
  useFetchOneEntity: useFetchOneProject,
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
  useFetchAllProjects,
  useFetchOneProject,
};
