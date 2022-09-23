import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CustomButton, CustomContainer, CustomInput, CustomToast } from "../../components";

export interface TaskInterface {}

const Task: React.FC<TaskInterface> = () => {
  const navigation: any = useNavigation();
  const [view, setView] = useState(false);
  const [active, setActive] = useState(false);

  const add_task = () => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 2000);
  };

  useEffect(() => {
    setTimeout(() => {
      setView(true);
    }, 200);
  }, []);
  return (
    <TouchableOpacity
      onPress={() => Keyboard.dismiss()}
      style={{ width: "100%", height: "100%" }}
      activeOpacity={1}
    >
      <CustomContainer>
        {view ? (
          <>
            <CustomInput
              containerStyles={styles.containerStyles}
              inputStyles={styles.titleStyles}
              placeholder="Write a title"
              delay={150}
            />
            <CustomInput
              containerStyles={styles.containerStyles}
              inputStyles={styles.descriptionStyles}
              placeholder="Write a description"
              delay={200}
            />
          </>
        ) : null}
        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={() => navigation.goBack()}
            placeholder="Cancel"
            buttonStyles={{ marginRight: 10 }}
          />
          <CustomButton
            onPress={() => add_task()}
            placeholder="Add task"
            buttonStyles={{ marginLeft: 10 }}
          />
        </View>
        {active ? <CustomToast /> : null}
      </CustomContainer>
    </TouchableOpacity>
  );
};

export default Task;

const styles = StyleSheet.create({
  containerStyles: {
    marginVertical: 10,
  },
  titleStyles: {
    fontSize: 20,
    fontWeight: "bold",
  },
  descriptionStyles: {
    fontSize: 15,
    fontWeight: "400",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    right: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }
});
