import { Text, View } from "native-base";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
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
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { resetLoading, setLoading } from "../../../../redux/states/loader.state";
import { DeleteTaskHook } from "../../../Task/hooks/DeleteTask.hook";
import { toast } from "../../../../components/CustomToast/event/toast.event";
import { useDispatch } from "react-redux";

export interface ItemInterface {
  task: TaskCreated;
}

const LIST_ITEM_HEIGHT = 60;
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Item: React.FC<ItemInterface> = ({ task }) => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch()
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(5);
  const opacity = useSharedValue(1);
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

  const reanimatedIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < (-SCREEN_WIDTH * 0.2) ? 1 : 0);
    return { opacity }
  });

  const reanimatedItemContainerStyle = useAnimatedStyle(() => {
    return { height: itemHeight.value, marginVertical: marginVertical.value, opacity: opacity.value }
  });

  const handleTaskDelete = async () => {
    dispatch(setLoading({loading: true}));
    let response = await DeleteTaskHook(task._id);
    if (!response) { dispatch(resetLoading()); return; }
    if (response) {
      if (response.message === 'Task deleted') {
        toast.success({message: 'Task deleted', duration: 2000});
        setTimeout(() => {
          dispatch(resetLoading());
          itemHeight.value = withTiming(0, {duration: 500});
          marginVertical.value = withTiming(0, {duration: 500});
          opacity.value = withTiming(0, {duration: 500});
        }, 2000);
      }
    }
  }

  return (
    <Animated.View style={[reanimatedItemContainerStyle]}>
      <Animated.View style={[styles.iconContainer, reanimatedIconContainerStyle]}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Task", task)}
        >
          <FontAwesome5 name="edit" size={25} color={colors.warning} />
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <FontAwesome5 name="check-circle" size={25} color={colors.success} />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={handleTaskDelete}
        >
          <Feather name="trash-2" size={25} color={colors.error} />
        </TouchableOpacity>
      </Animated.View>
      <PanGestureHandler 
      onGestureEvent={panGesture}
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
    </Animated.View>
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
  iconContainer: {
    width: 150,
    height: LIST_ITEM_HEIGHT,
    position: 'absolute',
    right: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  }
});

