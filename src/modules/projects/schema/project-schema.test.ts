import { CreateProjectSchema } from "./project-schema";
import { ERROR_MESSAGES } from "../constants/error-messages";
describe("CreateProjectFormSchema", () => {
  it("should validate a valid project", () => {
    const validProject = {
      name: "Project 1",
      description: "Project 1 description",
      status: "doing",
    };

    const result = CreateProjectSchema.safeParse(validProject);

    expect(result.success).toBe(true);
  });

  it("should invalidate a project with missing description", () => {
    const invalidProject = {
      name: "John",
    };

    const result = CreateProjectSchema.safeParse(invalidProject);

    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe(
      ERROR_MESSAGES.REQUIRED_DESCRIPTION
    );
  });
});
