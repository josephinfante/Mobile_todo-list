import { useEffect, useState } from "react";
import { CustomButton, CustomContainer } from "../../components";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../styles";
import { CustomList } from "./components/CustomList";
import { FontAwesome5 } from "@expo/vector-icons";
import { getItem } from "../../utils";
import { getUser } from "../../services";
import { createUser } from "../../redux/states/user.state";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../redux/store";

export interface HomeInterface {}

const Home: React.FC<HomeInterface> = () => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const userState = useSelector((store: AppStore) => store.user);
  const userProfile = async () => {
    let token = await getItem("token");
    !token ? navigation.navigate("SignIn") : navigation.navigate("Profile");
  };

  useEffect(() => {
    const userExist = async () => {
      let token = await getItem("token");
      if (token && userState.name === "") {
        let user = await getUser();
        dispatch(createUser(user));
      }
    };
    userExist();
  }, []);
  return (
    <CustomContainer>
      <CustomList />
      <CustomButton
        placeholder="Add a task"
        onPress={() => navigation.navigate("Task")}
        containerStyles={styles.containerStyles}
      />
      <TouchableOpacity style={styles.userProfile} onPress={userProfile}>
        <FontAwesome5
          name={"user"}
          size={20}
          color={colors.light}
          style={{ alignSelf: "center" }}
        />
      </TouchableOpacity>
    </CustomContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  containerStyles: {
    position: "absolute",
    bottom: 100,
    right: 20,
  },
  userProfile: {
    position: "absolute",
    bottom: 50,
    right: 20,
    backgroundColor: colors.purpleLight,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 50,
  },
});
