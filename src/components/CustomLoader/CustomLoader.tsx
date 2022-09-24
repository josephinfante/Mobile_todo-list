import LottieView from "lottie-react-native";
import { Text, View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import { colors } from "../../styles";

export interface CustomLoaderInterface {}

const CustomLoader: React.FC<CustomLoaderInterface> = () => {
  const loaderState = useSelector((store: AppStore) => store.loader);
  return (
    <>
      {loaderState.loading === true ? (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { justifyContent: "center", alignItems: "center" },
          ]}
          _light={{ bg: colors.light }}
          _dark={{ bg: colors.dark }}
        >
          <LottieView
            source={require("../../../assets/96372-loader-5.json")}
            autoPlay
            loop
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default CustomLoader;
