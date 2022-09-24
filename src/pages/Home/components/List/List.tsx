import { View } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CustomContainer } from "../../../../components";
import { TaskCreated } from "../../../../interfaces";
import { Item } from "../Item";

export interface ListInterface {
  tasks: TaskCreated[];
}

const List: React.FC<ListInterface> = ({ tasks }) => {
  return (
    <CustomContainer>
      <View style={{flex: 1}}>
		<SafeAreaView></SafeAreaView>
        <ScrollView>
          {tasks.map((task: TaskCreated) => {
			return <Item key={task._id} task={task}/>;
          })}
        </ScrollView>
      </View>
    </CustomContainer>
  );
};

export default List;
