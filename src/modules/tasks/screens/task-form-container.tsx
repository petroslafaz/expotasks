import { router, useLocalSearchParams } from "expo-router";
import TaskForm from "./task-form";
import { CreateTaskType, UpdateTaskType } from "../schema/task-schema";
import {
  useCreateTask,
  useFetchOneTask,
  useUpdateTask,
} from "@/modules/tasks/hooks/use-task-api";
import { useFetchAllProjects } from "@/shared/hooks/use-projects";
import { Box } from "@/theme";
import { LoadingSpinner } from "@/shared/components";

export default function TaskFormContainer() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const isEditMode = !!id;

  const onSuccess = () => {
    router.replace({
      pathname: "/(tabs)/tasks",
      params: { taskCreated: "true" },
    });
  };
  const onError = (error: any) => {
    alert(error.message);
    router.back();
  };
  const createTask = useCreateTask({ onSuccess, onError });
  const updateTask = useUpdateTask({ onSuccess, onError });

  const { data: projects, isLoading: projectsLoading } = useFetchAllProjects();

  const { data: taskData, isLoading: isTaskLoading } = useFetchOneTask(
    id as string,
    {
      enabled: isEditMode,
    }
  );
  const onSubmit = async (data: CreateTaskType | UpdateTaskType) => {
    try {
      if (isEditMode) {
        const updateData = data as UpdateTaskType;
        await updateTask.mutateAsync(updateData);
      } else {
        const createData = data as CreateTaskType;
        await createTask.mutateAsync(createData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (projectsLoading || (isEditMode && isTaskLoading)) {
    return <LoadingSpinner />;
  }

  const projectOptions =
    projects?.map((project) => ({
      label: project.name,
      value: project.id,
    })) || [];

  return (
    <Box flex={1} padding="m" gap="m">
      <TaskForm
        onSubmit={onSubmit}
        isPending={createTask.isPending || updateTask.isPending}
        projectOptions={projectOptions}
        initialData={taskData}
      />
    </Box>
  );
}
