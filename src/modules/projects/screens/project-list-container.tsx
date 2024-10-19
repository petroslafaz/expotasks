import React, { useCallback, useRef, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useFetchAllProjects } from "../hooks/use-project-api";
import { Box } from "@/theme";
import { DataFetchContainer } from "@/shared/components/data-fetch-container";
import { FlatList, RefreshControl, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProjectCell from "../components/project-cell";
import { Divider, FloatingButton } from "@/shared/components";

export default function ProjectListContainer() {
  const {
    isLoading,
    isError,
    error,
    data: projects,
    refetch,
  } = useFetchAllProjects({
    onSuccess: () => console.log("Fetch projects succeeded"),
    onError: (error) => console.log("Fetch projects failed", error),
  });

  const [refreshing, setRefreshing] = useState(false);
  const [shouldScrollToEnd, setShouldScrollToEnd] = useState(false);
  // When a new project is created, route params is updated with projectCreated=true
  const { projectCreated } = useLocalSearchParams<{ projectCreated: string }>();
  const flatListRef = useRef<FlatList>(null);

  useFocusEffect(
    useCallback(() => {
      refetch().then(() => {
        if (projectCreated === "true") {
          setShouldScrollToEnd(true);
          router.setParams({ projectCreated: undefined });
        }
      });
    }, [refetch, projectCreated])
  );

  function handleButtonPress() {
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
        data={projects}
        onRetry={handleRefresh}
        noDataText="No projects found"
      >
        {(data) => (
          <>
            <FlatList
              ref={flatListRef}
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
