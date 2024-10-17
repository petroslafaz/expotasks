import { Dimensions } from "react-native";
import { ActivityIndicator } from "react-native";
import { Box } from "@/theme";
export default function LoadingSpinner() {
  return (
    <Box
      position="absolute"
      flex={1}
      justifyContent="center"
      alignItems="center"
      width={Dimensions.get("window").width}
      height={Dimensions.get("window").height}
    >
      <ActivityIndicator color="gray" size="large" />
    </Box>
  );
}
