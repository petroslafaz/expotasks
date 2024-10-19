import React, { useCallback, useRef, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useFetchAllTasks } from "../hooks/use-task-api";
import { Box } from "@/theme";
import { DataFetchContainer } from "@/shared/components/data-fetch-container";
import { FlatList, RefreshControl, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TaskCell from "../components/task-cell";
import { Divider, FloatingButton } from "@/shared/components";

export default function TaskListContainer() {
  const {
    isLoading,
    isError,
    error,
    data: tasks,
    refetch,
  } = useFetchAllTasks({
    onSuccess: () => console.log("Fetch tasks succeeded"),
    onError: (error) => console.log("Fetch tasks failed", error),
  });

  const [refreshing, setRefreshing] = useState(false);
  const [shouldScrollToEnd, setShouldScrollToEnd] = useState(false);
  // When a new task is created, route params is updated with taskCreated=true
  const { taskCreated } = useLocalSearchParams<{ taskCreated: string }>();
  const flatListRef = useRef<FlatList>(null);

  useFocusEffect(
    useCallback(() => {
      refetch().then(() => {
        if (taskCreated === "true") {
          setShouldScrollToEnd(true);
          router.setParams({ taskCreated: undefined });
        }
      });
    }, [refetch, taskCreated])
  );

  function handleButtonPress() {
    router.push("./tasks/create-task");
  }

  async function handleRefresh() {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  function handleCellPress(taskId: string) {
    router.push({
      pathname: "./tasks/edit-task",
      params: { id: taskId },
    });
  }

  function handleContentSizeChange() {
    if (shouldScrollToEnd) {
      flatListRef.current?.scrollToEnd();
      setShouldScrollToEnd(false);
    }
  }

  return (
    <Box flex={1} padding="m">
      <DataFetchContainer
        isLoading={isLoading}
        isError={isError}
        error={error}
        data={tasks}
        onRetry={handleRefresh}
        noDataText="No tasks found"
      >
        {(data) => (
          <>
            <FlatList
              ref={flatListRef}
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
              onContentSizeChange={handleContentSizeChange}
            />
            <FloatingButton onPress={handleButtonPress}>
              <MaterialCommunityIcons name="plus" size={40} color="#337BF6" />
            </FloatingButton>
          </>
        )}
      </DataFetchContainer>
    </Box>
  );
}
