import dayjs from "dayjs";
import { Home } from "@/modules/home/schema/home-schema";
import { Project } from "@/modules/projects/schema/project-schema";
import { Task } from "@/modules/tasks/schema/task-schema";

// Helper function to add days to current day and return ISO string
const addDayAtISOString = (daysToAdd = 0) =>
  dayjs().startOf("day").add(daysToAdd, "day").toISOString();

class MockDB {
  projects: Project[] = [
    { id: "1", name: "Project 1", description: "Project 1 description" },
    { id: "2", name: "Project 2", description: "Project 2 description" },
    { id: "3", name: "Project 3", description: "Project 3 description" },
    { id: "4", name: "Project 4", description: "Project 4 description" },
    { id: "5", name: "Project 5", description: "Project 5 description" },
    { id: "6", name: "Project 6", description: "Project 6 description" },
    { id: "7", name: "Project 7", description: "Project 7 description" },
    { id: "8", name: "Project 8", description: "Project 8 description" },
  ];

  tasks: Task[] = [
    {
      id: "1",
      name: "Task 1",
      description: "Description for Task 1",
      status: "doing",
      dueDate: addDayAtISOString(0),
      projectId: "1",
    },
    {
      id: "2",
      name: "Task 2",
      description: "Description for Task 2",
      status: "doing",
      dueDate: addDayAtISOString(0),
      projectId: "2",
    },
    {
      id: "3",
      name: "Task 3",
      description: "Description for Task 3",
      status: "done",
      dueDate: addDayAtISOString(2),
      projectId: "1",
    },
    {
      id: "4",
      name: "Task 4",
      description: "Description for Task 4",
      status: "todo",
      dueDate: addDayAtISOString(4),
      projectId: "2",
    },
    {
      id: "5",
      name: "Task 5",
      description: "Description for Task 5",
      status: "doing",
      dueDate: addDayAtISOString(4),
      projectId: "1",
    },
  ];

  getProjects(): Project[] {
    return this.projects.map((project) => ({
      ...project,
      taskCount: this.tasks.filter((task) => task.projectId === project.id)
        .length,
    }));
  }

  getTasks(): Task[] {
    return this.tasks.map((task) => ({
      ...task,
      projectName: this.projects.find((p) => p.id === task.projectId)?.name,
    }));
  }

  getHomeData(): Home[] {
    const today = addDayAtISOString();
    const tasksToday = this.getTasks().filter((task) =>
      dayjs(task.dueDate).isSame(today)
    );
    return [
      {
        tasksToday: tasksToday.length,
        tasksInProgress: this.tasks.filter((task) => task.status === "doing")
          .length,
        tasks: tasksToday.map((task) => ({ ...task })),
      },
    ];
  }

  getData(resource: "projects" | "tasks" | "home"): any[] {
    switch (resource) {
      case "projects":
        return this.getProjects();
      case "tasks":
        return this.getTasks();
      case "home":
        return this.getHomeData();
      default:
        throw new Error(`Unknown resource: ${resource}`);
    }
  }

  addTask(task: Omit<Task, "id">): Task {
    const newTask = {
      ...task,
      id: (this.tasks.length + 1).toString(),
    };
    this.tasks.push(newTask);
    return newTask;
  }
  updateTask(id: string, updates: Partial<Task>): Task | null {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;
    this.tasks[index] = { ...this.tasks[index], ...updates };
    return this.tasks[index];
  }
  addProject(project: Omit<Task, "id">): Project {
    const newProject = {
      ...project,
      id: (this.projects.length + 1).toString(),
    };
    this.projects.push(newProject);
    return newProject;
  }
  updateProject(id: string, updates: Partial<Project>): Project | null {
    const index = this.projects.findIndex((t) => t.id === id);
    if (index === -1) return null;
    this.projects[index] = { ...this.projects[index], ...updates };
    return this.projects[index];
  }
}

export const db = new MockDB();
