import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, Button } from "@/shared/components";
import {
  CreateProjectSchema,
  UpdateProjectSchema,
  CreateProjectType,
  UpdateProjectType,
  Project,
} from "../schema/project-schema";
import { Text, Box } from "@/theme";

type ProjectFormProps = {
  onSubmit: (data: CreateProjectType | UpdateProjectType) => void;
  isPending?: boolean;
  initialData?: Project;
};

export default function ProjectForm({
  onSubmit,
  isPending,
  initialData,
}: ProjectFormProps) {
  const isEditMode = !!initialData;

  // Choose the appropriate schema and default values
  const schema = isEditMode ? UpdateProjectSchema : CreateProjectSchema;
  const defaultValues = isEditMode ? initialData : {};

  const { control, handleSubmit } = useForm<
    CreateProjectType | UpdateProjectType
  >({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <>
      <Text variant="header">
        {isEditMode ? "Edit Project" : "Create a New Project"}
      </Text>

      <FormInput
        control={control}
        name="name"
        placeholder="Project Name"
        returnKeyType="done"
        testID="nameInput"
      />
      <FormInput
        control={control}
        name="description"
        placeholder="Project Description"
        returnKeyType="done"
        testID="descriptionInput"
      />

      <Box justifyContent="center" alignItems="center" padding="m">
        <Button
          title={isEditMode ? "Update" : "Create"}
          onPress={handleSubmit(onSubmit)}
          testID="submitButton"
          isPending={isPending}
        />
      </Box>
    </>
  );
}
