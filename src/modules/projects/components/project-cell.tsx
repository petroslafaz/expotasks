import React from "react";
import { Project } from "../schema/project-schema";
import { Box, Text } from "@/theme"; // Use restyle's Box and Text from your theme

interface ProjectCellProps {
  item: Project;
}

const ProjectCell: React.FC<ProjectCellProps> = ({ item }) => {
  const taskCount = item.taskCount ? `${item.taskCount} tasks` : `No tasks`;
  const taskBackgroundColor = item.taskCount ? "primary" : "grey";

  return (
    <Box borderRadius="m" backgroundColor="white" padding="m" marginBottom="m">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        {/* Project Name */}
        <Text variant="body" fontWeight="bold">
          {item.name}
        </Text>

        {/* Task Count Badge */}
        <Box
          backgroundColor={taskBackgroundColor}
          borderRadius="s"
          paddingHorizontal="s"
          paddingVertical="s"
        >
          <Text variant="pill">{taskCount}</Text>
        </Box>
      </Box>

      {/* Project Description */}
      <Box marginTop="s">
        <Text variant="caption" color="grey">
          {item.description}
        </Text>
      </Box>
    </Box>
  );
};

export default ProjectCell;
