import { ActivityIndicator } from "react-native";
import { Box } from "@/theme";
export default function LoadingSpinner() {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <ActivityIndicator color="gray" size="large" />
    </Box>
  );
}
