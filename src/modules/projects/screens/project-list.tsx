import React, { useCallback } from "react";
import { FlatList, RefreshControl, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useFetchProjects } from "../hooks/use-project-api";
import ProjectCell from "../components/project-cell";
import { Box } from "@/theme";
import { Divider, FloatingButton } from "@/shared/components";
import { DataLoader } from "@/shared/components/data-loader";

export default function Projects() {
  const {
    isLoading,
    isError,
    error,
    data: projects,
    refetch,
  } = useFetchProjects({
    onSuccess: () => console.log("Fetch projects succeeded"),
    onError: (error) => console.log("Fetch projects failed", error),
  });

  const [refreshing, setRefreshing] = React.useState(false);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  function handlePress() {
    router.push("./projects/create-project");
  }

  async function handleRefresh() {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  function handleCellPress(projectId: string) {
    router.push({
      pathname: "./projects/edit-project",
      params: { id: projectId },
    });
  }

  return (
    <Box flex={1} padding="m">
      <DataLoader
        isLoading={isLoading}
        isError={isError}
        error={error}
        data={projects}
        onRetry={handleRefresh}
        noDataText="No projects found"
      >
        {(data) => (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCellPress(item.id)}>
                <ProjectCell item={item} />
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
