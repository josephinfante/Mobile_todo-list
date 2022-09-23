import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, TouchableOpacity } from "react-native";
import {
  CustomButton,
  CustomContainer,
  CustomInput,
} from "../../../components";
import { containerStyles } from "../../../styles";

export interface SignUpInterface {}

const SignUp: React.FC<SignUpInterface> = () => {
  const [view, setView] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setView(true);
    }, 200);
  }, []);
  return (
    <TouchableOpacity
      onPress={Keyboard.dismiss}
      activeOpacity={1}
      style={containerStyles.container}
    >
      {view ? (
        <>
          <CustomInput
            containerStyles={styles.containerStyles}
            inputStyles={styles.placeholderStyles}
            placeholder="Name"
            delay={120}
          />
          <CustomInput
            containerStyles={styles.containerStyles}
            inputStyles={styles.placeholderStyles}
            placeholder="Lastname"
            delay={170}
          />
          <CustomInput
            containerStyles={styles.containerStyles}
            inputStyles={styles.placeholderStyles}
            placeholder="Email"
            delay={220}
          />
          <CustomInput
            containerStyles={styles.containerStyles}
            inputStyles={styles.placeholderStyles}
            placeholder="Password"
            delay={270}
          />
        </>
      ) : null}
      <CustomButton
        placeholder="Sign Up"
        onPress={() => {
          console.log("signing in");
        }}
        buttonStyles={styles.buttonContainer}
      />
    </TouchableOpacity>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  containerStyles: {
    marginVertical: 10,
  },
  placeholderStyles: {
    fontSize: 20,
  },
  buttonContainer: {
    marginVertical: 15,
  },
});
