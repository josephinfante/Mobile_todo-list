import { ScrollView, View } from "native-base";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Task } from "../../../../interfaces";
import { fakedata } from "../../../../utils/fakedata";
import { ListItem } from "../ListItem";

export interface CustomListInterface {}

const CustomList: React.FC<CustomListInterface> = () => {
  const [list, setList] = useState(fakedata);
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView></SafeAreaView>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.taskContainer}>
          {list.map((task: Task) => {
            return <ListItem key={task.id} task={task} />;
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
