import { router, useLocalSearchParams } from "expo-router";
import ProjectForm from "./project-form";
import { CreateProjectType, UpdateProjectType } from "../schema/project-schema";
import {
  useCreateProject,
  useUpdateProject,
  useFetchOneProject,
} from "../hooks/use-project-api";
import { Box } from "@/theme";
import { LoadingSpinner } from "@/shared/components";

export default function ProjectFormContainer() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const isEditMode = !!id;

  const onSuccess = () => {
    router.replace({
      pathname: "/(tabs)/projects",
      params: { projectCreated: "true" },
    });
  };

  const onError = (error: any) => {
    alert(error.message);
  };

  const createProject = useCreateProject({ onSuccess, onError });
  const updateProject = useUpdateProject({ onSuccess, onError });

  const { data: projectData, isLoading: isProjectLoading } = useFetchOneProject(
    id as string,
    {
      enabled: isEditMode,
    }
  );

  const onSubmit = async (data: CreateProjectType | UpdateProjectType) => {
    try {
      if (isEditMode) {
        const updateData = data as UpdateProjectType;
        await updateProject.mutateAsync(updateData);
      } else {
        const createData = data as CreateProjectType;
        await createProject.mutateAsync(createData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isEditMode && isProjectLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box flex={1} padding="m" gap="m">
      <ProjectForm
        onSubmit={onSubmit}
        isPending={createProject.isPending || updateProject.isPending}
        initialData={projectData}
      />
    </Box>
  );
}
