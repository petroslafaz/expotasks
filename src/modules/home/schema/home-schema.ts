import { TaskType } from "@/shared/types/types";
export type Home = {
  tasksToday: number;
  tasksInProgress: number;
  tasks: TaskType[];
};
