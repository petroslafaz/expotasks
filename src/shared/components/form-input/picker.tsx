import React, { useCallback, useMemo, useRef } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Theme from "@/theme";
type FontAwesomeIconName = keyof typeof FontAwesome.glyphMap;

type GenericPickerProps = {
  value: string;
  displayValue: string;
  onChange: (value: string) => void;
  renderContent: (onSelect: (value: string) => void) => React.ReactNode;
  placeholder?: string;
  iconName?: FontAwesomeIconName;
  [key: string]: any;
};

export function GenericPicker({
  value,
  displayValue,
  onChange,
  renderContent,
  placeholder = "Select an option",
  iconName = "caret-down",
  ...props
}: GenericPickerProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["50%"], []);

  const handlePress = useCallback(() => {
    Keyboard.dismiss();
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    bottomSheetModalRef.current?.dismiss();
  };

  return (
    <>
      <TouchableOpacity onPress={handlePress} style={styles.container}>
        <View style={{ ...Theme.textVariants.input, ...styles.inputWrapper }}>
          <TextInput
            pointerEvents="none"
            style={{
              flex: 1,
              fontSize: Theme.textVariants.input.fontSize,
            }}
            value={displayValue}
            placeholder={placeholder}
            editable={false}
            {...props}
          />

          <View style={styles.iconContainer}>
            <FontAwesome size={24} name={iconName} />
          </View>
        </View>
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
      >
        <BottomSheetView style={styles.contentContainer}>
          {renderContent(handleSelect)}
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  iconContainer: {
    marginLeft: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: "flex-start",
    minHeight: 200,
  },
});
