import { Text, View } from "native-base";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { colors } from "../../../../styles";
import { FontAwesome5 } from "@expo/vector-icons";
import { TaskCreated } from "../../../../interfaces";
import { DeleteTaskHook } from "./hooks/DeleteTask.hook";

export interface ListItemInterface
  extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  task: TaskCreated;
  onDismiss?: (task: TaskCreated) => void;
}

const LIST_ITEM_HEIGHT = 70;

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

const ListItem: React.FC<ListItemInterface> = ({
  task,
  onDismiss,
  simultaneousHandlers,
}) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: async () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(task);
          }
        });
        console.log('ga')
        let response = await DeleteTaskHook(task._id);
        console.log(response);
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0
    );
    return { opacity };
  });

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[
        { width: "100%", alignItems: "center", justifyContent: 'center'},
        rTaskContainerStyle,
      ]}
    >
      <View style={{ width: "100%", alignItems: "center", justifyContent: 'center' }}>
        <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
          <View>
            <FontAwesome5
              name={"trash-alt"}
              size={LIST_ITEM_HEIGHT * 0.4}
              color={colors.red}
            />
          </View>
        </Animated.View>
        <PanGestureHandler onGestureEvent={panGesture}>
          <Animated.View
            style={[
              {
                flex: 1,
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
              },
              rStyle,
            ]}
          >
            <View
              style={styles.task}
              _dark={{ bg: colors.secondaryDark }}
              _light={{ bg: colors.secondaryLight }}
            >
              <Text>{task.name}</Text>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </Animated.View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  task: {
    width: "90%",
    height: LIST_ITEM_HEIGHT,
    justifyContent: "center",
    paddingLeft: 20,

    //Shadow for iOS
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowRadius: 10,

    //Shadow for Android
    elevation: 5,
    borderRadius: 10,
  },
  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    position: "absolute",
    right: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
});
