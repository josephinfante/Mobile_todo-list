import { MotiView } from "moti";
import { Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { colors } from "../../styles";

export interface CustomToastInterface {
  text?: string;
}

const CustomToast: React.FC<CustomToastInterface> = (
  props: CustomToastInterface
) => {
  return (
    <View style={styles.toastContainer}>
      <MotiView
        from={{ opacity: 0, translateY: -50 }}
        animate={{ opacity: 1, translateY: 0 }}
        delay={100}
        transition={{
          type: "spring",
        }}
        exit={{
          translateY: -50,
        }}
      >
        <View
          _light={{ bg: colors.secondaryLight }}
          _dark={{ bg: colors.secondaryDark }}
          style={{
            borderRadius: 20,
          }}
        >
          <SafeAreaView></SafeAreaView>
          <View style={styles.container}>
            <MotiView
              from={{ opacity: 0, translateY: -50 }}
              animate={{ opacity: 1, translateY: 0 }}
              delay={150}
              transition={{
                type: "spring",
              }}
              exit={{
                translateY: -50,
              }}
              style={styles.statusBar}
            ></MotiView>
            <MotiView
              from={{ opacity: 0, translateY: -50 }}
              animate={{ opacity: 1, translateY: 0 }}
              delay={170}
              transition={{
                type: "spring",
              }}
              exit={{
                translateY: -50,
              }}
            >
              <Text>The task was added correctly</Text>
            </MotiView>
          </View>
        </View>
      </MotiView>
    </View>
  );
};

export default CustomToast;

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
    justifyContent: "center",
    width: "90%",
    height: 70,
  },
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  statusBar: {
    width: 4,
    height: 40,
    borderRadius: 50,
    backgroundColor: colors.green,
    marginRight: 5,
  },
});
