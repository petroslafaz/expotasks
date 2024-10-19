import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Box, Text } from "@/theme";

type FontAwesomeIconName = keyof typeof FontAwesome.glyphMap;

type CardProps = {
  iconName: FontAwesomeIconName;
  title: string;
  description: string;
};

const Card: React.FC<CardProps> = ({ iconName, title, description }) => {
  return (
    <Box borderRadius="m" padding="m" backgroundColor="white" width={160}>
      <Box marginBottom="s" flexDirection="row">
        <FontAwesome name={iconName} size={24} color="black" />
      </Box>
      <Box marginBottom="s" flexDirection="row">
        <Text variant="header2">{title}</Text>
      </Box>
      <Box flexDirection="row">
        <Text variant="body">{description}</Text>
      </Box>
    </Box>
  );
};

export default Card;
