import { useFetchProjects as useFetchProjectsOriginal } from "@/modules/projects/hooks/use-project-api";

// Re-export the original hooks with type safety
const useFetchProjectsSafe = useFetchProjectsOriginal;

// Wrapper hook with default error handling
export function useFetchProjects() {
  return useFetchProjectsSafe({
    onSuccess: () => console.log("Projects fetched successfully"),
    onError: (error) => console.error("Error fetching projects:", error),
  });
}
