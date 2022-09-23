import "react-native-gesture-handler";
import "react-native-reanimated";
import React from "react";
import { NativeBaseProvider } from "native-base";
import { CustomSwitch } from "./src/components";
import { MainNavigation } from "./src/navigation/MainNavigation";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <MainNavigation />
        <CustomSwitch />
      </Provider>
    </NativeBaseProvider>
  );
}
