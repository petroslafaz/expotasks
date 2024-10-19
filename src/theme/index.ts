import { createTheme, createText, createBox } from "@shopify/restyle";
import { StyleSheet } from "react-native";

const palette = {
  bluePrimary: "#337BF6",

  black: "#0B0B0B",
  white: "#FFFFFF",
  red: "#DA3830",
  green: "#00A86B",

  grey: "#808080",
  greyLight: "#ccc",
  greyDark: "#666",
  whiteAlpha: "rgba(255, 255, 255, 0.9)",
};

const theme = createTheme({
  colors: {
    primary: palette.bluePrimary,
    white: palette.white,
    whileAlpha: palette.whiteAlpha,
    text: palette.black,
    alert: palette.red,
    grey: palette.grey,
    greyLight: palette.greyLight,
    green: palette.green,
  },
  borderRadii: {
    s: 4,
    m: 12,
    l: 24,
    xl: 70,
  },
  borderSizes: {
    hairline: StyleSheet.hairlineWidth,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontWeight: "bold",
      color: "text",
      fontSize: 20,
    },
    header2: {
      fontWeight: "bold",
      color: "text",
      fontSize: 18,
    },
    message: {
      fontWeight: "bold",
      color: "text",
      fontSize: 17,
    },
    alert: {
      fontWeight: "bold",
      color: "alert",
      fontSize: 14,
    },
    input: {
      height: 50,
      borderRadius: 10,
      padding: 10,
      fontSize: 17,
      backgroundColor: "white",
    },
    buttonText: {
      color: "white",
      fontSize: 17,
      fontWeight: "600",
    },
    body: {
      fontSize: 17,
      color: "text",
    },
    caption: {
      fontSize: 14,
      color: "grey",
    },
    pill: {
      fontWeight: "bold",
      color: "white",
      fontSize: 14,
    },
  },
});

export type Theme = typeof theme;
export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export default theme;
