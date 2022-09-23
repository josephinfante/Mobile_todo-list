import { useNavigation } from "@react-navigation/native";
import { Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton, CustomInput } from "../../../components";
import { createUser } from "../../../redux/states/user.state";
import { AppStore } from "../../../redux/store";
import { colors, containerStyles } from "../../../styles";
import { SignInHook } from "./hooks/SignIn.hooks";

export interface SignInInterface {}

const SignIn: React.FC<SignInInterface> = () => {
  const dispatch = useDispatch();
  const [signIn, setSignIn] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const navigation: any = useNavigation();
  const [view, setView] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setView(true);
    }, 200);
  }, []);

  const handleSignIn = async () => {
    let response = await SignInHook(signIn);
    dispatch(createUser(response));
    navigation.goBack();
  };
  return (
    <TouchableOpacity
      onPress={Keyboard.dismiss}
      style={containerStyles.container}
      activeOpacity={1}
    >
      {view ? (
        <>
          <CustomInput
            containerStyles={styles.containerStyles}
            inputStyles={styles.placeholderStyles}
            placeholder="Email"
            delay={220}
            onChangeText={(text: string) => {
              setSignIn({
                ...signIn,
                email: text,
              });
            }}
          />
          <CustomInput
            containerStyles={styles.containerStyles}
            inputStyles={styles.placeholderStyles}
            placeholder="Password"
            delay={270}
            onChangeText={(text: string) => {
              setSignIn({
                ...signIn,
                password: text,
              });
            }}
          />
        </>
      ) : null}
      <CustomButton
        placeholder="Sign In"
        onPress={() => handleSignIn()}
        buttonStyles={styles.buttonContainer}
      />
      <View style={styles.signUpContainer}>
        <Text>You don't have an account yet?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  containerStyles: {
    marginVertical: 10,
    width: "100%",
  },
  placeholderStyles: {
    fontSize: 20,
  },
  buttonContainer: {
    marginVertical: 15,
  },
  signUpContainer: {
    display: "flex",
    flexDirection: "row",
  },
  link: {
    textDecorationLine: "underline",
    textDecorationColor: colors.link,
    color: colors.link,
    marginLeft: 5,
  },
});
