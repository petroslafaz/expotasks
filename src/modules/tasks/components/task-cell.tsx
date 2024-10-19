import { Box, Text } from "@/theme"; // Use restyle's Box and Text from your theme
import { Task } from "../schema/task-schema";
import dayjs from "dayjs";
interface CellProps {
  item: Task;
}

export default function Cell({ item }: CellProps) {
  const backgroundColor =
    item.status === "todo"
      ? "grey"
      : item.status === "done"
      ? "green"
      : "primary";

  return (
    <Box borderRadius="m" backgroundColor="white" padding="m" marginBottom="m">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Text variant="body" fontWeight="bold">
          {item.name}
        </Text>
        <Box
          borderRadius="s"
          paddingHorizontal="s"
          paddingVertical="s"
          backgroundColor={backgroundColor}
        >
          <Text variant="pill">{item.status}</Text>
        </Box>
      </Box>
      <Box marginTop="s" flexDirection="row" justifyContent="space-between">
        <Text variant="caption" color="grey">
          {item.description}
        </Text>
        <Text variant="alert" color="grey">
          {dayjs(item.dueDate).isSame(dayjs(), "day")
            ? "Today"
            : dayjs(item.dueDate).isSame(dayjs().add(1, "day"), "day")
            ? "Tomorrow"
            : dayjs(item.dueDate).isBefore(dayjs(), "day")
            ? "Overdue"
            : dayjs(item.dueDate).format("MMM DD")}
        </Text>
      </Box>
      <Box marginTop="s">
        <Text variant="caption" fontWeight="bold">
          Project: {item.projectName}
        </Text>
      </Box>
    </Box>
  );
}
