import { useState } from "react";

import { Box, Text } from "@/theme";
import Card from "../components/card";
import TaskCell from "@/modules/tasks/components/task-cell";
import { useFetchAll } from "../hooks/use-home-api";
import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { DataFetchContainer } from "@/shared/components/data-fetch-container";

export default function HomeContainer() {
  const [refreshing, setRefreshing] = useState(false);

  const { data, refetch, isLoading, error } = useFetchAll({
    onSuccess: () => setRefreshing(false),
    onError: (error) => setRefreshing(false),
  });

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  function handleCellPress(projectId: string) {
    router.push({
      pathname: "./tasks/edit-task",
      params: { id: projectId },
    });
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Box flex={1} padding="m">
        <DataFetchContainer
          isLoading={isLoading && !refreshing}
          isError={!!error}
          error={error}
          data={data}
          onRetry={onRefresh}
          noDataText="No home data available"
        >
          {(homeData) => {
            const tasks =
              homeData && homeData.length > 0 ? homeData[0].tasks : [];
            const tasksToday =
              data && data.length > 0
                ? `${data[0].tasksToday} tasks`
                : "No tasks";
            const tasksInProgress =
              data && data.length > 0
                ? `${data[0].tasksInProgress} tasks`
                : "No tasks";

            return (
              <>
                <Text variant="header">Hello Petros</Text>

                <Box
                  flexDirection="row"
                  justifyContent="space-between"
                  width="100%"
                  marginTop="m"
                >
                  <Card
                    iconName="inbox"
                    title="Tasks today"
                    description={tasksToday}
                  />
                  <Card
                    iconName="hourglass-start"
                    title="In progress"
                    description={tasksInProgress}
                  />
                </Box>

                <Text variant="header" marginTop="m">
                  Your tasks today
                </Text>

                <Box width="100%" marginTop="m">
                  {tasks.map((task) => (
                    <TouchableOpacity
                      key={task.id}
                      onPress={() => handleCellPress(task.id)}
                    >
                      <TaskCell item={task} />
                    </TouchableOpacity>
                  ))}
                </Box>
              </>
            );
          }}
        </DataFetchContainer>
      </Box>
    </ScrollView>
  );
}
