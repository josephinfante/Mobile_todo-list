import { View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { colors } from "../../styles";

export interface CustomContainerInterface {
  children: React.ReactNode;
}

const CustomContainer: React.FC<CustomContainerInterface> = (
  props: CustomContainerInterface
) => {
  return (
    <View
      _dark={{ bg: colors.dark }}
      _light={{ bg: colors.light }}
      style={styles.container}
    >
      {props.children}
    </View>
  );
};

export default CustomContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
