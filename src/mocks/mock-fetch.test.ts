import { mockFetch } from "./mock-fetch";

const baseUrl = "http://localhost:3000";

jest.mock("./db", () => ({
  db: {
    projects: [
      { id: "1", name: "Project 1", description: "Project 1 description" },
    ],
    tasks: [
      {
        id: "1",
        name: "Task 1",
        description: "Description for Task 1",
        status: "doing",
        projectId: "1",
      },
    ],
    getData: jest.fn((resource) => {
      if (resource === "projects")
        return [
          {
            id: "1",
            name: "Project 1",
            description: "Project 1 description",
            taskCount: 1,
          },
        ];
      if (resource === "tasks")
        return [
          {
            id: "1",
            name: "Task 1",
            description: "Description for Task 1",
            status: "doing",
            projectId: "1",
            projectName: "Project 1",
          },
        ];
      if (resource === "home")
        return [
          {
            tasksToday: 1,
            tasksInProgress: 1,
            tasks: [
              {
                id: "1",
                name: "Task 1",
                description: "Description for Task 1",
                status: "doing",
                projectId: "1",
                projectName: "Project 1",
              },
            ],
          },
        ];
    }),
    addTask: jest.fn((task) => ({ ...task, id: "2" })),
    updateTask: jest.fn((id, updates) => ({ id, ...updates })),
  },
}));

describe("mockFetch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all projects for GET /projects", async () => {
    const url = `${baseUrl}/projects`;
    const options = { method: "GET", disableDelay: true };
    const response = await mockFetch(url, options);
    const json = await response.json();
    expect(response.status).toBe(200);
    expect(json).toEqual([
      {
        id: "1",
        name: "Project 1",
        description: "Project 1 description",
        taskCount: 1,
      },
    ]);
  });

  it("should return a specific project for GET /projects/1", async () => {
    const url = `${baseUrl}/projects/1`;
    const options = { method: "GET", disableDelay: true };
    const response = await mockFetch(url, options);
    const json = await response.json();
    expect(response.status).toBe(200);
    expect(json).toEqual({
      id: "1",
      name: "Project 1",
      description: "Project 1 description",
      taskCount: 1,
    });
  });

  it("should return all tasks for GET /tasks", async () => {
    const url = `${baseUrl}/tasks`;
    const options = { method: "GET", disableDelay: true };
    const response = await mockFetch(url, options);
    const json = await response.json();
    expect(response.status).toBe(200);
    expect(json).toEqual([
      {
        id: "1",
        name: "Task 1",
        description: "Description for Task 1",
        status: "doing",
        projectId: "1",
        projectName: "Project 1",
      },
    ]);
  });

  it("should return home data for GET /home", async () => {
    const url = `${baseUrl}/home`;
    const options = { method: "GET", disableDelay: true };
    const response = await mockFetch(url, options);
    const json = await response.json();
    expect(response.status).toBe(200);
    expect(json).toEqual([
      {
        tasksToday: 1,
        tasksInProgress: 1,
        tasks: [
          {
            id: "1",
            name: "Task 1",
            description: "Description for Task 1",
            status: "doing",
            projectId: "1",
            projectName: "Project 1",
          },
        ],
      },
    ]);
  });

  it("should create a new task for POST /tasks", async () => {
    const url = `${baseUrl}/tasks`;
    const options = {
      method: "POST",
      disableDelay: true,
      body: JSON.stringify({
        name: "New Task",
        description: "New Task Description",
        status: "todo",
        projectId: "1",
      }),
    };
    const response = await mockFetch(url, options);
    const json = await response.json();
    expect(response.status).toBe(200);
    expect(json).toEqual({
      id: "2",
      name: "New Task",
      description: "New Task Description",
      status: "todo",
      projectId: "1",
    });
  });

  it("should update a task for PUT /tasks/1", async () => {
    const url = `${baseUrl}/tasks/1`;
    const options = {
      method: "PUT",
      disableDelay: true,
      body: JSON.stringify({ name: "Updated Task 1" }),
    };
    const response = await mockFetch(url, options);
    const json = await response.json();
    expect(response.status).toBe(200);
    expect(json).toEqual({ id: "1", name: "Updated Task 1" });
  });

  it("should return 404 for unknown resource", async () => {
    const url = `${baseUrl}/unknown`;
    const options = { method: "GET", disableDelay: true };
    const response = await mockFetch(url, options);
    expect(response.status).toBe(404);
  });
});
