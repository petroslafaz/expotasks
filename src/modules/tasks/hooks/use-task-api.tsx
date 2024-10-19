import { createEntityHooks } from "@/shared/api/query-hooks";
import * as taskApi from "../api/task-api";
import { Task, CreateTaskType, UpdateTaskType } from "../schema/task-schema";

const {
  useCreateEntity: useCreateTask,
  useUpdateEntity: useUpdateTask,
  useFetchAllEntities: useFetchAllTasks,
  useFetchOneEntity: useFetchOneTask,
} = createEntityHooks<Task, CreateTaskType, UpdateTaskType & { id: string }>(
  "tasks",
  {
    fetchAll: taskApi.fetchTasks,
    fetchOne: taskApi.fetchTask,
    create: taskApi.createTask,
    update: taskApi.updateTask,
  }
);

export { useCreateTask, useUpdateTask, useFetchAllTasks, useFetchOneTask };
