import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#337BF6",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Tasks" }} />
      <Stack.Screen
        name="create-task"
        options={{
          presentation: "modal",
          title: "Create task",
        }}
      />
      <Stack.Screen
        name="edit-task"
        options={{
          presentation: "modal",
          title: "Edit task",
        }}
      />
    </Stack>
  );
}
