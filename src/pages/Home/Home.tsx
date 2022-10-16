import { useEffect, useState } from "react";
import { CustomButton, CustomContainer } from "../../components";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { colors } from "../../styles";
import { FontAwesome5 } from "@expo/vector-icons";
import { getItem } from "../../utils";
import { getUser } from "../../services";
import { createUser } from "../../redux/states/user.state";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import { TaskCreated } from "../../interfaces";
import { GetTasksHook } from "./hooks/GetTasks.hook";
import { Text } from "native-base";
import { List } from "./components/List";
import { resetLoading, setLoading } from "../../redux/states/loader.state";
import { toast } from "../../components/CustomToast/event/toast.event";

export interface HomeInterface {}

const Home: React.FC<HomeInterface> = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation: any = useNavigation();
  const userState = useSelector((store: AppStore) => store.user);
  const [tasks, setTasks] = useState<TaskCreated[]>([]);
  const userProfile = async () => {
    let token = await getItem("token");
    !token ? navigation.navigate("SignIn") : navigation.navigate("Profile");
  };

  useEffect(() => {
    const userExist = async () => {
      dispatch(setLoading({ loading: true }));
      let token = await getItem("token");
      if (!token) {
        setTasks([]);
        dispatch(resetLoading());
        return;
      }
      if (userState.name === "") {
        let user = await getUser();
        dispatch(createUser(user));
      }
      toast.success({ message: "Checking for tasks!", duration: 1000 });
      let response = await GetTasksHook();
      setTasks(response);
      dispatch(resetLoading());
    };
    if (isFocused) {
      userExist();
    }
  }, [isFocused]);
  return (
    <CustomContainer>
      {tasks.length === 0 ? (
        <Text style={{ textAlign: "center" }}>You have no tasks</Text>
      ) : (
        <List tasks={tasks} />
      )}
      <View style={styles.containerStyles}>
        <CustomButton
          placeholder="Add a task"
          onPress={() => navigation.navigate("Task")}
        />
        <TouchableOpacity style={styles.userProfile} onPress={userProfile}>
          <FontAwesome5
            name={"user"}
            size={20}
            color={colors.light}
            style={{ alignSelf: "center" }}
          />
        </TouchableOpacity>
      </View>
    </CustomContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  containerStyles: {
    position: "absolute",
    bottom: 30,
    right: 20,
    display: "flex",
    flexDirection: "row",
  },
  userProfile: {
    backgroundColor: colors.purpleLight,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 50,
    marginLeft: 10,
  },
});
