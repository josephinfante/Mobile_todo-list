import { MotiView } from "moti";
import { Text, View } from "native-base";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  DeviceEventEmitter,
  Platform,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { colors } from "../../styles";
import { SHOW_TOAST_MESSAGE } from "./event/toast.event";

export interface CustomToastInterface {}

interface Data {
  message: string;
  type: "success" | "error" | "warning";
  duration: number;
  useNativeToast: boolean;
}

const CustomToast: React.FC<CustomToastInterface> = () => {
  const [messageType, setMessageType] = useState<
    "success" | "warning" | "error"
  >("success");
  const timeOutRef = useRef<any>();
  const animatedOpacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
    };
  }, []);
  const [timeOutDuration, setTimeOutDuration] = useState(5000);
  const [message, setMessage] = useState("");
  const onNewToast = (data: Data) => {
    if (Platform.OS === "android" && data.useNativeToast) {
      return ToastAndroid.show(data.message, ToastAndroid.LONG);
    }
    if (data.duration) {
      setTimeOutDuration(data.duration);
    }
    setMessage(data.message);
    setMessageType(data.type);
  };
  const closeToast = useCallback(() => {
    setMessage("");
    setTimeOutDuration(1000);
    animatedOpacity.value = withTiming(0);
    clearInterval(timeOutRef.current);
  }, [animatedOpacity]);
  useEffect(() => {
    if (message) {
      timeOutRef.current = setInterval(() => {
        if (timeOutDuration === 0) {
          closeToast();
        } else {
          setTimeOutDuration((prev) => prev - 500);
        }
      }, 500);
    }
    return () => {
      clearInterval(timeOutRef.current);
    };
  }, [closeToast, message, timeOutDuration]);
  useEffect(() => {
    if (message) {
      animatedOpacity.value = withTiming(1, { duration: 1000 });
    }
  }, [message, animatedOpacity]);

  useEffect(() => {
    DeviceEventEmitter.addListener(SHOW_TOAST_MESSAGE, onNewToast);
    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  }, []);
  if (!message) {
    return null;
  }
  return (
    <Animated.View style={[styles.toastContainer, animatedStyle]}>
      <TouchableOpacity activeOpacity={1} onPress={closeToast}>
        <View>
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
                  style={[
                    styles.statusBar,
                    { backgroundColor: colors[messageType] },
                  ]}
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
                  <Text>{message}</Text>
                </MotiView>
              </View>
            </View>
          </MotiView>
        </View>
      </TouchableOpacity>
    </Animated.View>
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
    zIndex: 1
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
    marginRight: 5,
  },
});
