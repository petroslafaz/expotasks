import { MockResponse } from "./mock-response";
import { db } from "./db";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
type resourceType = "projects" | "tasks" | "home";
function parseUrl(url: string) {
  const regex = /^http:\/\/localhost:3000\/([^\/]+)(?:\/(\d+))?$/;
  const match = url.match(regex);
  if (match) {
    return {
      resource: match[1] as resourceType,
      id: match[2] || null,
    };
  }
  return null;
}

interface MockFetchOptions extends RequestInit {
  disableDelay?: boolean;
}

export const mockFetch = async (url: string, options?: MockFetchOptions) => {
  const parsedUrl = parseUrl(url);
  let response = new MockResponse("Error", { status: 404 });

  // Simulate server error
  // if (Math.random() > 0.9) {
  //   return new MockResponse("Server error", { status: 500 });
  // }

  if (!options?.disableDelay) {
    await delay(Math.random() * 500 + 500); // Simulate network delay
  }

  if (
    parsedUrl &&
    parsedUrl.resource &&
    ["projects", "tasks", "home"].includes(parsedUrl.resource)
  ) {
    if (options?.method === "GET") {
      if (parsedUrl.id) {
        // Fetch specific resource by ID
        const data = db
          .getData(parsedUrl.resource)
          .find((item) => item.id === parsedUrl.id);
        if (data) {
          response = new MockResponse(JSON.stringify(data), { status: 200 });
        } else {
          response = new MockResponse("Resource not found", { status: 404 });
        }
      } else {
        // Fetch all resources of the given type
        response = new MockResponse(
          JSON.stringify(db.getData(parsedUrl.resource)),
          { status: 200 }
        );
      }
    } else if (options?.method === "POST") {
      const body = JSON.parse(options.body as string);
      if (parsedUrl.resource === "projects") {
        const newProject = db.addProject(body);
        response = new MockResponse(JSON.stringify(newProject), {
          status: 200,
        });
      } else if (parsedUrl.resource === "tasks") {
        const newTask = db.addTask(body);
        response = new MockResponse(JSON.stringify(newTask), { status: 200 });
      }
    } else if (
      options?.method === "PUT" &&
      parsedUrl.resource === "tasks" &&
      parsedUrl.id
    ) {
      const body = JSON.parse(options.body as string);
      const updatedTask = db.updateTask(parsedUrl.id, body);
      if (updatedTask) {
        response = new MockResponse(JSON.stringify(updatedTask), {
          status: 200,
        });
      } else {
        response = new MockResponse("Resource not found", { status: 404 });
      }
    }
  }

  return response;
};
