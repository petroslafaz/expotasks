import React, { useCallback } from "react";
import { FlatList, RefreshControl, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useFetchTasks } from "../hooks/use-task-api";
import TaskCell from "../components/task-cell";
import { Box } from "@/theme";
import { Divider, FloatingButton } from "@/shared/components";
import { DataLoader } from "@/shared/components/data-loader";

export default function Tasks() {
  const {
    isLoading,
    isError,
    error,
    data: tasks,
    refetch,
  } = useFetchTasks({
    onSuccess: () => console.log("Fetch tasks succeeded"),
    onError: (error) => console.log("Fetch tasks failed", error),
  });

  const [refreshing, setRefreshing] = React.useState(false);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  function handlePress() {
    router.push("./tasks/create-task");
  }

  function handleCellPress(projectId: string) {
    router.push({
      pathname: "./tasks/edit-task",
      params: { id: projectId },
    });
  }

  async function handleRefresh() {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  return (
    <Box flex={1} padding="m">
      <DataLoader
        isLoading={isLoading}
        isError={isError}
        error={error}
        data={tasks}
        onRetry={handleRefresh}
        noDataText="No tasks found"
      >
        {(data) => (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCellPress(item.id)}>
                <TaskCell item={item} />
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <Divider />}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
          />
        )}
      </DataLoader>
      <FloatingButton onPress={handlePress}>
        <MaterialCommunityIcons name="plus" size={40} color="#337BF6" />
      </FloatingButton>
    </Box>
  );
}
