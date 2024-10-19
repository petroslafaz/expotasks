import React from "react";
import { ActivityIndicator, Pressable } from "react-native";
import Theme, { Text } from "@/theme";
interface Props {
  title: string;
  onPress: () => void;
  isPending?: boolean;
  [key: string]: any;
}
export default function Button({ title, onPress, ...props }: Props) {
  return (
    <Pressable
      {...props}
      disabled={props.isPending}
      onPress={onPress}
      style={({ pressed }) => [
        {
          transform: [
            {
              scale: pressed ? 0.93 : 1,
            },
          ],
        },
        {
          backgroundColor: Theme.colors.primary,
          width: "80%",
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: Theme.borderRadii.m,
        },
      ]}
    >
      {props.isPending ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text variant="buttonText">{title}</Text>
      )}
    </Pressable>
  );
}
