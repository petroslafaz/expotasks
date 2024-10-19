import { CreateTaskSchema } from "./task-schema";
import { ERROR_MESSAGES } from "../constants/error-messages";

describe("CreateTaskFormSchema", () => {
  it("should validate a valid task", () => {
    const validTask = {
      name: "Task 1",
      description: "This is a task description.",
      status: "todo",
      dueDate: "2023-12-31T23:59:59.999Z",
      projectId: "1",
    };

    const result = CreateTaskSchema.safeParse(validTask);

    expect(result.success).toBe(true);
  });

  it("should invalidate a task with missing projectId", () => {
    const invalidTask = {
      name: "Task 1",
      description: "This is a task description.",
      status: "todo",
      dueDate: "2023-12-31T23:59:59.999Z",
    };

    const result = CreateTaskSchema.safeParse(invalidTask);

    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe(
      ERROR_MESSAGES.REQUIRED_PROJECT_ID
    );
  });

  it("should invalidate a task with all fields missing", () => {
    const invalidTask = {};

    const result = CreateTaskSchema.safeParse(invalidTask);

    expect(result.success).toBe(false);

    const errorMessages = result.error?.errors.map((error) => error.message);

    expect(errorMessages).toContain(ERROR_MESSAGES.REQUIRED_NAME);
    expect(errorMessages).toContain(ERROR_MESSAGES.REQUIRED_DESCRIPTION);
    expect(errorMessages).toContain(ERROR_MESSAGES.REQUIRED_PROJECT_ID);
  });

  it("should invalidate a task with invalid dueDate", () => {
    const invalidTask = {
      name: "Task 1",
      description: "This is a task description.",
      status: "todo",
      dueDate: "invalid-date",
      projectId: "1",
    };

    const result = CreateTaskSchema.safeParse(invalidTask);

    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe(
      ERROR_MESSAGES.INVALID_DUE_DATE
    );
  });
});
