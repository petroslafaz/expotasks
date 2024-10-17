import { z } from "zod";
import { ERROR_MESSAGES } from "../constants/error-messages";

const isoDateString = z.string().refine(
  (val) => {
    const date = new Date(val);
    return !isNaN(date.getTime());
  },
  {
    message: ERROR_MESSAGES.INVALID_DUE_DATE,
  }
);

export const CreateTaskSchema = z.object({
  name: z.string({
    required_error: ERROR_MESSAGES.REQUIRED_NAME,
  }),
  description: z.string({
    required_error: ERROR_MESSAGES.REQUIRED_DESCRIPTION,
  }),
  status: z.enum(["todo", "doing", "done"]).default("todo"),
  dueDate: isoDateString.nullable(),
  projectId: z.string({
    required_error: ERROR_MESSAGES.REQUIRED_PROJECT_ID,
  }),
});

export const UpdateTaskSchema = CreateTaskSchema.extend({
  id: z.string({
    required_error: ERROR_MESSAGES.REQUIRED_ID,
  }),
});

export type CreateTaskType = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskType = z.infer<typeof UpdateTaskSchema>;

export type Task = UpdateTaskType & { projectName?: string };
