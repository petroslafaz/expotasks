import { createApi } from "@/shared/api/api-client";
import { Task, CreateTaskType, UpdateTaskType } from "../schema/task-schema";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const api = createApi<Task, CreateTaskType, UpdateTaskType>(
  apiUrl as string,
  "tasks"
);

export const {
  fetchAll: fetchTasks,
  fetchOne: fetchTask,
  create: createTask,
  update: updateTask,
} = api;
