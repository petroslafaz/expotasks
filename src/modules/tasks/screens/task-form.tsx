import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, Button } from "@/shared/components";
import {
  CreateTaskSchema,
  CreateTaskType,
  UpdateTaskSchema,
  UpdateTaskType,
  Task,
} from "../schema/task-schema";
import { Text, Box } from "@/theme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

type TaskFormProps = {
  onSubmit: (data: CreateTaskType | UpdateTaskType) => void;
  isPending?: boolean;
  initialData?: Task;
  projectOptions: Array<{ label: string; value: string }>;
};

export default function CreateTaskForm({
  onSubmit,
  isPending,
  initialData,
  projectOptions,
}: TaskFormProps) {
  const isEditMode = !!initialData;

  // Choose the appropriate schema and default values
  const schema = isEditMode ? UpdateTaskSchema : CreateTaskSchema;
  const defaultValues = isEditMode ? initialData : {};

  const { control, handleSubmit } = useForm<CreateTaskType | UpdateTaskType>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <BottomSheetModalProvider>
      <Text variant="header">
        {isEditMode ? "Edit Task" : "Create a New Task"}
      </Text>
      <FormInput
        control={control}
        name="name"
        placeholder="task name"
        returnKeyType="done"
        testID="nameInput"
      />
      <FormInput
        control={control}
        name="description"
        placeholder="task description"
        returnKeyType="done"
        testID="descriptionInput"
      />
      <FormInput
        control={control}
        placeholder="Select a project"
        name="projectId"
        type="select"
        options={projectOptions}
        testID="projectIdInput"
      />
      <FormInput
        control={control}
        placeholder="Select a status"
        name="status"
        type="select"
        options={[
          { label: "Todo", value: "todo" },
          { label: "Doing", value: "doing" },
          { label: "Done", value: "done" },
        ]}
        testID="statusInput"
      />
      <FormInput
        control={control}
        name="dueDate"
        placeholder="due date (dd/mm/yyyy)"
        returnKeyType="done"
        type="date"
        testID="dueDateInput"
      />
      <Box justifyContent="center" alignItems="center" padding="m">
        <Button
          title={isEditMode ? "Update" : "Create"}
          onPress={handleSubmit(onSubmit)}
          testID="submitButton"
          isPending={isPending}
        />
      </Box>
    </BottomSheetModalProvider>
  );
}
