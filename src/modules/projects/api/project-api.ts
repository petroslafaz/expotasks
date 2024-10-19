import { createApi } from "@/shared/api/api-client";
import {
  Project,
  CreateProjectType,
  UpdateProjectType,
} from "../schema/project-schema";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const api = createApi<Project, CreateProjectType, UpdateProjectType>(
  apiUrl as string,
  "projects"
);

export const {
  fetchAll: fetchProjects,
  fetchOne: fetchProject,
  create: createProject,
  update: updateProject,
} = api;
