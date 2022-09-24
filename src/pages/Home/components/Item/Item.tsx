import { Text, View } from "native-base";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import {
	HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { TaskCreated } from "../../../../interfaces";
import { colors } from "../../../../styles";

export interface ItemInterface {
  task: TaskCreated;
}

const LIST_ITEM_HEIGHT = 60;
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Item: React.FC<ItemInterface> = ({ task }) => {
  const translateX = useSharedValue(0);
  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: async () => {
		if (translateX.value < (-SCREEN_WIDTH * 0.4)) {
			translateX.value = withTiming(-SCREEN_WIDTH * 0.4, {duration: 500});
		} else {
			translateX.value = withTiming(0, {duration: 500});
		}
	},
  });

  const reanimatedItemStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  return (
    <PanGestureHandler onGestureEvent={panGesture}
	activeOffsetX={[-10, 10]} >
      <Animated.View
        style={[
          {
            flex: 1,
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
          },
          reanimatedItemStyle,
        ]}
      >
        <View
          style={styles.container}
          _light={{ bg: colors.secondaryLight }}
          _dark={{ bg: colors.secondaryDark }}
        >
          <Text>{task.name}</Text>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: LIST_ITEM_HEIGHT,
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 10,
	marginVertical: 5,
    maxWidth: "90%",

    //Shadow for iOS
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowRadius: 10,

    //Shadow for Android
    elevation: 5,
  },
});

