import { ScrollView, View } from "native-base";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { TaskCreated } from "../../../../interfaces";
import { fakedata } from "../../../../utils/fakedata";
import { ListItem } from "../ListItem";

export interface CustomListInterface {
  tasks: TaskCreated[];
}

const CustomList: React.FC<CustomListInterface> = ({ tasks }) => {
  const [list, setList] = useState(fakedata);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView></SafeAreaView>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.taskContainer}>
          {tasks.map((taskCreated: TaskCreated, index: number) => {
            return <ListItem key={taskCreated._id} task={taskCreated} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default CustomList;

const styles = StyleSheet.create({
  taskContainer: {
    width: "100%",
    alignItems: "center",
  },
});
