// project-schema.ts

import { z } from "zod";
import { ERROR_MESSAGES } from "../constants/error-messages";

export const CreateProjectSchema = z.object({
  name: z
    .string({ required_error: ERROR_MESSAGES.REQUIRED_NAME })
    .min(1, ERROR_MESSAGES.REQUIRED_NAME),
  description: z
    .string({ required_error: ERROR_MESSAGES.REQUIRED_DESCRIPTION })
    .min(1, ERROR_MESSAGES.REQUIRED_DESCRIPTION),
});

export const UpdateProjectSchema = CreateProjectSchema.extend({
  id: z.string().min(1, ERROR_MESSAGES.REQUIRED_ID),
});

export type CreateProjectType = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectType = z.infer<typeof UpdateProjectSchema>;

// The full Project type, used elsewhere in the app
export type Project = UpdateProjectType & {
  taskCount?: number;
};
