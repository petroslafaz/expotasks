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
      <Stack.Screen name="index" options={{ title: "Projects" }} />
      <Stack.Screen
        name="create-project"
        options={{
          presentation: "modal",
          title: "Create project",
        }}
      />
      <Stack.Screen
        name="edit-project"
        options={{
          presentation: "modal",
          title: "Edit project",
        }}
      />
    </Stack>
  );
}
