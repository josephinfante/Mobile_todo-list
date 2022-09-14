import "react-native-reanimated";
import React from "react";
import { NativeBaseProvider } from "native-base";
import { CustomSwitch, CustomToast } from "./src/components";
import { Home, Task } from "./src/pages";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Task" component={Task} />
        </Stack.Navigator>
      </NavigationContainer>
      <CustomSwitch />
    </NativeBaseProvider>
  );
}
