import { Text, View } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../styles";

export interface CustomButtonInterface {
  onPress: () => void;
  placeholder: string;
  containerStyles?: {};
  buttonStyles?: {};
  placeholderStyles?: {};
}

const CustomButton: React.FC<CustomButtonInterface> = (
  props: CustomButtonInterface
) => {
  return (
    <View style={props.containerStyles}>
      <TouchableOpacity onPress={props.onPress} style={[styles.buttonStyles, props.buttonStyles]}>
        <Text style={props.placeholderStyles}>{props.placeholder}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonStyles: {
    backgroundColor: colors.purpleLight,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
});
