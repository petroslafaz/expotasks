import React from "react";
import { Box } from "@/theme";
import { LoadingSpinner, Button } from "@/shared/components";
import { Text } from "@/theme";

interface Props<T> {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: T[] | undefined;
  onRetry: () => void;
  children: (data: T[]) => React.ReactNode;
  noDataText?: string;
}

export function DataFetchContainer<T>({
  isLoading,
  isError,
  error,
  data,
  onRetry,
  children,
  noDataText = "No data found",
}: Props<T>) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <Message
        text={`Error: ${error?.message || "An error occurred"}`}
        onRetry={onRetry}
      />
    );
  }

  if (!data || data.length === 0) {
    return <Message text={noDataText} onRetry={onRetry} />;
  }

  // Render the children with the data
  return <>{children(data)}</>;
}

function Message({ text, onRetry }: { text: string; onRetry?: () => void }) {
  return (
    <Box flex={1} justifyContent="center" alignItems="center" gap="m">
      <Text variant="message">{text}</Text>
      {onRetry && <Button title="Retry" onPress={onRetry} />}
    </Box>
  );
}
