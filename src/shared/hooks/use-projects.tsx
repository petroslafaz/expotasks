import { useFetchAllProjects as useFetchAllProjectsOriginal } from "@/modules/projects/hooks/use-project-api";

// Re-export the original hooks with type safety
const useFetchAllProjectsSafe = useFetchAllProjectsOriginal;

// Wrapper hook with default error handling
export function useFetchAllProjects() {
  return useFetchAllProjectsSafe({
    onSuccess: () => console.log("Projects fetched successfully"),
    onError: (error) => console.error("Error fetching projects:", error),
  });
}
