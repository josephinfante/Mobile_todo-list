import {  View } from "native-base";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

export interface CustomButtonInterface {
	onPress: () => void
	placeholder: string
	containerStyles?: {}
	buttonStyles?: {}
	placeholderStyles?: {}
}

const CustomButton: React.FC<CustomButtonInterface> = (props : CustomButtonInterface) => {
  return (
    <View style={props.containerStyles}>
      <TouchableOpacity onPress={props.onPress} style={props.buttonStyles}>
        <Text style={props.placeholderStyles}>{props.placeholder}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

