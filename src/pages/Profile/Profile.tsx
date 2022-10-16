import { useNavigation } from "@react-navigation/native";
import { Text, View } from "native-base";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton, CustomContainer } from "../../components";
import { resetUser } from "../../redux/states/user.state";
import { AppStore } from "../../redux/store";
import { colors, containerStyles } from "../../styles";
import { LogOutHook } from "./hooks/LogOut.hook";

export interface ProfileInterface {}

const Profile: React.FC<ProfileInterface> = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const userState = useSelector((store: AppStore) => store.user);

  const logOut = async () => {
    let result = await LogOutHook();
    if (result) {
      dispatch(resetUser());
      navigation.goBack();
    }
  };
  return (
    <CustomContainer>
      <View style={containerStyles.container}>
        <View style={styles.profilePicture}></View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "70%",
            marginBottom: 35,
          }}
        >
          <View>
            <Text style={styles.label}>Name</Text>
            <Text>{userState.name}</Text>
          </View>
          <View>
            <Text style={styles.label}>Lastname</Text>
            <Text>{userState.lastname}</Text>
          </View>
        </View>
        <View style={{ width: "70%" }}>
          <Text style={styles.label}>Email</Text>
          <Text>{userState.email}</Text>
        </View>
        <CustomButton
          placeholder="Back"
          onPress={() => navigation.goBack()}
          containerStyles={styles.goBack}
        />
        <CustomButton
          placeholder="Logout"
          onPress={() => logOut()}
          containerStyles={styles.button}
        />
      </View>
    </CustomContainer>
  );
};

export default Profile;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 30,
    right: 20,
  },
  goBack: {
    position: "absolute",
    bottom: 80,
    right: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.purpleLight,
    alignSelf: "center",
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
