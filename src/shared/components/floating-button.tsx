import React from "react";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "@/theme";
import Theme from "@/theme";
interface FloatingButtonProps {
  onPress: () => void;
  children: React.ReactNode;
}
export default function FloatingButton({
  onPress,
  children,
}: FloatingButtonProps) {
  const insets = useSafeAreaInsets();

  return (
    <Box
      position="absolute"
      right={Theme.spacing.m}
      bottom={Theme.spacing.m + insets.bottom}
      backgroundColor="whileAlpha"
      borderRadius="xl"
    >
      <Pressable
        onPress={onPress}
        style={{
          width: 64,
          height: 64,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Pressable>
    </Box>
  );
}
