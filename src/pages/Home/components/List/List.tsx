import { useNavigation } from "@react-navigation/native";
import { View } from "native-base";
import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CustomContainer } from "../../../../components";
import { TaskCreated } from "../../../../interfaces";
import { Item } from "../Item";
import { Platform } from 'react-native';

export interface ListInterface {
  tasks: TaskCreated[];
}

const List: React.FC<ListInterface> = ({ tasks }) => {
  const navigation: any = useNavigation();
  return (
    <CustomContainer>
      <View style={{flex: 1, marginBottom: 100}}>
		    <SafeAreaView></SafeAreaView>
        <ScrollView contentContainerStyle={{paddingVertical: 20}}>
          {
            tasks.map((task: TaskCreated) => {
              return (
                Platform.OS === 'ios'
                ? <Item key={task._id} task={task}/>
                :(
                  <TouchableOpacity 
                    onPress={() => navigation.navigate("Task", task)}
                    key={task._id}>
                    <Item task={task}/>
                  </TouchableOpacity>
                )
              )
            })
          }
        </ScrollView>
      </View>
    </CustomContainer>
  );
};

export default List;
