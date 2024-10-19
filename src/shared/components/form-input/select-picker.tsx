import React from "react";
import { FlatList, TouchableOpacity, Text, View } from "react-native";
import { GenericPicker } from "./picker";
import Theme from "@/theme";
import Divider from "../divider";

type SelectInputProps = {
  value: string;
  onChange: (value: string) => void;
  options?: Array<{ label: string; value: string }>;
  [key: string]: any;
};

export function SelectInput({
  value,
  onChange,
  options,
  ...props
}: SelectInputProps) {
  const selectedOption = options?.find((option) => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : "";

  return (
    <GenericPicker
      value={value}
      displayValue={displayValue}
      onChange={onChange}
      renderContent={(onSelect) => (
        <FlatList
          data={options}
          keyExtractor={(item) => item.value}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onSelect(item.value)}>
              <Text
                style={{
                  ...Theme.textVariants.input,
                  width: 375,
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
      {...props}
    />
  );
}
