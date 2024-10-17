import React, { useState } from "react";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { GenericPicker } from "./picker";

const DATE_FORMAT = "DD/MM/YYYY";

type DateInputProps = {
  value: string | DateType;
  onChange: (value: string) => void;
  [key: string]: any;
};

export function DateInput({ value, onChange, ...props }: DateInputProps) {
  const [date, setDate] = useState<DateType>(dayjs(value).toDate());
  const displayValue = value ? dayjs(value).format(DATE_FORMAT) : "";

  const handleDatePickerChange = (selectedDate: DateType) => {
    if (!selectedDate) return;

    // Update the internal state and call the onChange callback with ISO format
    setDate(selectedDate);
    onChange(dayjs(selectedDate).toISOString());
  };

  return (
    <GenericPicker
      iconName="calendar"
      value={dayjs(date).toISOString()}
      displayValue={displayValue}
      onChange={handleDatePickerChange}
      renderContent={(onSelect) => (
        <DateTimePicker
          mode="single"
          date={date}
          onChange={({ date }) => {
            handleDatePickerChange(date);
            onSelect(dayjs(date).toISOString());
          }}
        />
      )}
      {...props}
    />
  );
}
