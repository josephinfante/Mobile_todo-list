import { useNavigation } from "@react-navigation/native";
import { Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import {
  CustomButton,
  CustomContainer,
  CustomInput,
} from "../../../components";
import { toast } from "../../../components/CustomToast/event/toast.event";
import { resetLoading, setLoading } from "../../../redux/states/loader.state";
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
    Keyboard.dismiss();
    dispatch(setLoading({loading: true}));
    let response = await SignInHook(signIn);
    if (!response) { dispatch(resetLoading()); return; }
    if (response) {
      toast.success({message: `Welcome back, ${response.name}!`, duration: 2000})
      setTimeout(() => {
        navigation.goBack();
        dispatch(resetLoading());
      }, 2500);
    }
    
  };
  return (
      <TouchableOpacity
        onPress={Keyboard.dismiss}
        style={{ width: "100%", height: "100%" }}
        activeOpacity={1}
      >
        <CustomContainer>
          <View style={containerStyles.container}>
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
          </View>
          <CustomButton
            placeholder="Back"
            onPress={() => navigation.goBack()}
            buttonStyles={{ position: "absolute", bottom: 30, right: 20 }}
          />
        </CustomContainer>
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
