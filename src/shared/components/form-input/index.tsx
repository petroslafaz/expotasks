import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInput } from "react-native";
import Theme, { Text } from "@/theme";
import { DateInput } from "./date-picker";
import { SelectInput } from "./select-picker";

type FormInputProps = {
  control: Control<any>;
  name: string;
  type?: "text" | "date" | "select";
  [key: string]: any; // Allows passing any extra props like `placeholder`
};

export function FormInput({
  control,
  name,
  type = "text",
  ...props
}: FormInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          {/* Conditional Rendering Based on Type */}
          {type === "text" && (
            <TextInput
              style={{ ...Theme.textVariants.input }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              {...props}
            />
          )}

          {type === "date" && (
            <DateInput value={value} onChange={onChange} {...props} />
          )}

          {type === "select" && (
            <SelectInput value={value} onChange={onChange} {...props} />
          )}

          {error && <Text variant="alert">{error.message}</Text>}
        </>
      )}
    />
  );
}

export default FormInput;
