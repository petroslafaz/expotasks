import Theme, { Box } from "@/theme";
export default function Divider() {
  return (
    <Box
      height={Theme.borderSizes.hairline}
      backgroundColor="greyLight"
      marginHorizontal="s"
    />
  );
}
